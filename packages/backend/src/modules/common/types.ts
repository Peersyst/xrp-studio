import { SelectQueryBuilder } from "typeorm";

export type EntityParams<E> = Omit<E, "createdAt" | "updatedAt">;

export enum Order {
    ASC = "ASC",
    DESC = "DESC",
}

export type WhereConditions<T = any> = Parameters<SelectQueryBuilder<T>["where"]>[0];
export type WhereParameters<T = any> = Parameters<SelectQueryBuilder<T>["where"]>[1];
export type Where<T = any> = [WhereConditions<T>] | [WhereConditions<T>, WhereParameters<T>];
