import { Logger } from "@nestjs/common";
import { createConnection, Connection, EntityTarget } from "typeorm";
import { TypeORMSeederAdapter } from "./adapter";
import { getTypeORMConfig } from "../../config/typeormConfig";
import { User } from "../entities/User";

import { users } from "./seeders-data";

export interface SeederAdapterI {
    insert<T>(entityTarget: EntityTarget<T>, data: T[]): Promise<void>;
    delete<T>(entityTarget: EntityTarget<T>): Promise<void>;
}

export class Seeder {
    private logger: Logger;
    private environment: string;
    private adapter: SeederAdapterI;
    private connection: Connection;

    constructor() {
        this.logger = new Logger(Seeder.name);
        this.environment = process.env.NODE_ENV || "development";
    }

    logError(error: Error): void {
        this.logger.error(error);
    }

    async connect(): Promise<void> {
        this.connection = await createConnection(getTypeORMConfig());
        this.adapter = new TypeORMSeederAdapter(this.connection);
        this.logger.log("Connected to database successfully!");
    }

    async disconnect(): Promise<void> {
        await this.connection.close();
        this.connection = null;
        this.adapter = null;
    }

    async seed(): Promise<void> {
        if (!this.connection || !this.adapter) {
            this.logger.error("Connection not acquired");
        }

        this.logger.log("Deleting current data...");
        await this.deleteAll();
        this.logger.log("Inserting seeders data ...");
        await this.insertAll();

        this.logger.log("Seeding finished.");
    }

    async deleteAll(): Promise<void> {
        await this.adapter.delete(User);
    }

    async insertAll(): Promise<void> {
        await this.adapter.insert(User, users(this.environment));
    }
}

export async function runSeeders(): Promise<void> {
    const seeder = new Seeder();

    try {
        await seeder.connect();
        await seeder.seed();
    } catch (error) {
        seeder.logError(error);
    } finally {
        await seeder.disconnect();
    }
}
