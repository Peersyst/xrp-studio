import { Connection, EntityTarget } from "typeorm";
import { SeederAdapterI } from "./seed";

export class TypeORMSeederAdapter implements SeederAdapterI {
    constructor(private connection: Connection) {}

    async insert<T>(entityTarget: EntityTarget<T>, data: T[]): Promise<void> {
        if (data.length > 0) {
            await this.connection.createQueryBuilder().insert().into(entityTarget).values(data).execute();
        }
    }

    async delete<T>(entityTarget: EntityTarget<T>): Promise<void> {
        await this.connection.getRepository(entityTarget).delete({});
    }
}
