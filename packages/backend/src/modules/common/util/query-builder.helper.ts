import { DeleteQueryBuilder, EntityManager, EntityTarget, ObjectLiteral, Repository, SelectQueryBuilder } from "typeorm";

export enum OrderType {
    ASC = "ASC",
    DESC = "DESC",
}

export enum NullsPosition {
    NULLS_FIRST = "NULLS FIRST",
    NULLS_LAST = "NULLS LAST",
}

export interface QBOrder<T = string> {
    field: T;
    type?: OrderType;
    nullsPosition?: NullsPosition;
}

export interface QBFilter<Order = unknown> {
    relations: (string | Relation)[];
    qbWheres: QBWhere[];
    qbOrders?: QBOrder<Order>[];
}

export type ValueType = string | number | boolean | string[] | number[];

export enum FilterType {
    EQUAL = "=",
    NOT_EQUAL = "!=",
    MORE_THAN = ">",
    MORE_THAN_EQUAL = ">=",
    LESS_THAN = "<",
    LESS_THAN_EQUAL = "<=",
    IN = "IN",
    LIKE = "LIKE",
    NULL = "IS NULL",
    NOT_NULL = "IS NOT NULL",
}

export interface QBWhere {
    field: string;
    operator: FilterType;
    value?: ValueType;
}

export enum RelationType {
    INNER = "INNER_JOIN",
    LEFT = "LEFT_JOIN",
}

export interface Relation {
    value: string;
    type: RelationType;
    select: boolean;
}

export interface QBFrom<T> {
    entityTarget: EntityTarget<T>;
    alias: string;
}

export class QueryBuilderHelper {
    private static addRelations<T>(qb: SelectQueryBuilder<T>, alias: string, relations: (string | Relation)[] = []): SelectQueryBuilder<T> {
        for (const relation of relations) {
            const aliases = (typeof relation === "string" ? relation : relation.value).split(".");
            const finalAlias = aliases.length > 1 ? aliases[aliases.length - 2] : alias;
            const finalRelation = aliases[aliases.length - 1];

            if (typeof relation === "string") {
                qb = qb.leftJoinAndSelect(`${finalAlias}.${finalRelation}`, relation);
            } else if (relation.select && relation.type === RelationType.INNER) {
                qb = qb.innerJoinAndSelect(`${finalAlias}.${finalRelation}`, relation.value);
            } else if (!relation.select && relation.type === RelationType.INNER) {
                qb = qb.innerJoin(`${finalAlias}.${finalRelation}`, relation.value);
            } else if (relation.select && relation.type === RelationType.LEFT) {
                qb = qb.leftJoinAndSelect(`${finalAlias}.${finalRelation}`, relation.value);
            } else if (!relation.select && relation.type === RelationType.LEFT) {
                qb = qb.leftJoin(`${finalAlias}.${finalRelation}`, relation.value);
            }
        }
        return qb;
    }

    private static addWheres<T>(
        qb: SelectQueryBuilder<T> | DeleteQueryBuilder<T>,
        wheres: QBWhere[] = [],
        alias: string,
    ): SelectQueryBuilder<T> | DeleteQueryBuilder<T> {
        let varIdx = 0;

        for (const qbWhere of wheres) {
            const key = `${alias}${varIdx}`;
            if ([FilterType.NULL, FilterType.NOT_NULL].includes(qbWhere.operator)) {
                qb = qb.andWhere(`${qbWhere.field} ${qbWhere.operator}`);
            } else if (qbWhere.operator === FilterType.IN) {
                qb = qb.andWhere(`${qbWhere.field} IN (:...${key})`, { [key]: qbWhere.value });
                varIdx += 1;
            } else if (qbWhere.operator === FilterType.LIKE) {
                qb = qb.andWhere(`${qbWhere.field} LIKE :${key}`, { [key]: `%${qbWhere.value}%` });
                varIdx += 1;
            } else {
                qb = qb.andWhere(`${qbWhere.field} ${qbWhere.operator} :${key}`, { [key]: qbWhere.value });
                varIdx += 1;
            }
        }

        return qb;
    }

    private static addOrders<T>(qb: SelectQueryBuilder<T>, orders: QBOrder[] = []): SelectQueryBuilder<T> {
        for (const order of orders) {
            if (order.type && order.nullsPosition) {
                qb = qb.addOrderBy(order.field, order.type, order.nullsPosition);
            } else if (order.type) {
                qb = qb.addOrderBy(order.field, order.type);
            } else {
                qb = qb.addOrderBy(order.field);
            }
        }
        return qb;
    }

    private static addOffset<T>(qb: SelectQueryBuilder<T>, offset?: number): SelectQueryBuilder<T> {
        if (typeof offset === "number" && offset > 0 && Number.isInteger(offset)) {
            qb = qb.offset(offset);
        }
        return qb;
    }

    private static addLimit<T>(qb: SelectQueryBuilder<T>, limit?: number): SelectQueryBuilder<T> {
        if (typeof limit === "number" && limit > 0 && Number.isInteger(limit)) {
            qb = qb.limit(limit);
        }
        return qb;
    }

    private static addSelect<T>(qb: SelectQueryBuilder<T>, select: string | string[] = []): SelectQueryBuilder<T> {
        if (typeof select === "string") {
            qb = qb.select(select);
        } else if (select.length > 0) {
            qb = qb.select(select);
        }
        return qb;
    }

    private static addFroms<T>(qb: SelectQueryBuilder<T>, froms: QBFrom<T>[] = []): SelectQueryBuilder<T> {
        if (froms.length === 1) {
            qb = qb.from(froms[0].entityTarget, froms[0].alias);
        } else if (froms.length > 1) {
            for (const from of froms) {
                qb = qb.addFrom(from.entityTarget, from.alias);
            }
        }
        return qb;
    }

    private static addGroupBys<T>(qb: SelectQueryBuilder<T>, groupBys: string[] = []): SelectQueryBuilder<T> {
        for (const groupBy of groupBys) {
            qb = qb.addGroupBy(groupBy);
        }
        return qb;
    }

    private static addParameters<T>(qb: SelectQueryBuilder<T>, parameters?: ObjectLiteral): SelectQueryBuilder<T> {
        if (parameters) {
            qb = qb.setParameters(parameters);
        }
        return qb;
    }

    public static async buildDelete<T>(
        repository: Repository<T>,
        entity: EntityTarget<T>,
        from: string,
        wheres: QBWhere[] = [],
    ): Promise<void> {
        let qb = repository.createQueryBuilder().delete().from(entity, from);
        qb = QueryBuilderHelper.addWheres<T>(qb, wheres, "delete") as DeleteQueryBuilder<T>;
        await qb.execute();
    }

    public static buildQuery<T>(
        repository: Repository<T> | EntityManager,
        alias = "table",
        select: string[] | string = [],
        from: QBFrom<T>[] = [],
        relations: (string | Relation)[] = [],
        wheres: QBWhere[] = [],
        orders: QBOrder[] = [],
        groupBys: string[] = [],
        parameters?: ObjectLiteral,
        offset?: number,
        limit?: number,
    ): SelectQueryBuilder<T> {
        let qb: SelectQueryBuilder<any>;
        if (repository instanceof EntityManager) {
            qb = repository.createQueryBuilder();
        } else {
            qb = repository.createQueryBuilder(alias);
        }
        qb = QueryBuilderHelper.addSelect<T>(qb, select);
        qb = QueryBuilderHelper.addFroms<T>(qb, from);
        qb = QueryBuilderHelper.addRelations<T>(qb, alias, relations);
        qb = QueryBuilderHelper.addWheres<T>(qb, wheres, alias) as SelectQueryBuilder<T>;
        qb = QueryBuilderHelper.addOrders<T>(qb, orders);
        qb = QueryBuilderHelper.addGroupBys<T>(qb, groupBys);
        qb = QueryBuilderHelper.addOffset<T>(qb, offset);
        qb = QueryBuilderHelper.addLimit<T>(qb, limit);
        qb = QueryBuilderHelper.addParameters<T>(qb, parameters);

        return qb;
    }

    public static async buildFindRawMany<T, S>(
        repository: Repository<T> | EntityManager,
        alias = "table",
        select: string[] | string = [],
        from: QBFrom<T>[] = [],
        relations: (string | Relation)[] = [],
        wheres: QBWhere[] = [],
        orders: QBOrder[] = [],
        groupBys: string[] = [],
        parameters?: ObjectLiteral,
    ): Promise<S[]> {
        const qb = QueryBuilderHelper.buildQuery(repository, alias, select, from, relations, wheres, orders, groupBys, parameters);
        return qb.getRawMany<S>();
    }

    public static async buildFindManyAndCount<T>(
        repository: Repository<T> | EntityManager,
        alias = "table",
        offset?: number,
        limit?: number,
        relations: (string | Relation)[] = [],
        wheres: QBWhere[] = [],
        orders: QBOrder[] = [],
    ): Promise<[T[], number]> {
        const qb = QueryBuilderHelper.buildQuery(repository, alias, [], [], relations, wheres, orders, [], undefined, offset, limit);
        qb
        return qb.getManyAndCount();
    }
}
