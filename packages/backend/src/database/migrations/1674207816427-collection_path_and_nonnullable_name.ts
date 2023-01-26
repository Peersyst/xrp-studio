import { MigrationInterface, QueryRunner } from "typeorm";

export class collectionPathAndNonnullableName1674207816427 implements MigrationInterface {
    name = "collectionPathAndNonnullableName1674207816427";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" ADD "path" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "collection" ADD CONSTRAINT "UQ_f265516a9a97c3e7faef3c91499" UNIQUE ("path")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "twitter"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "twitter" character varying(15)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "discord"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "discord" character varying(32)`);
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "collection" ADD "name" character varying(64)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "collection" ADD "name" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "discord"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "discord" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "twitter"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "twitter" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "UQ_f265516a9a97c3e7faef3c91499"`);
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "path"`);
    }
}
