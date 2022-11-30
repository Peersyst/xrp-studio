import { MigrationInterface, QueryRunner } from "typeorm";

export class addPriorities1669742198368 implements MigrationInterface {
    name = "addPriorities1669742198368";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft" ADD "priority" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "priority" integer`);
        await queryRunner.query(`ALTER TABLE "collection" ADD "priority" integer`);
        await queryRunner.query(`ALTER TABLE "nft-in-drop" ALTER COLUMN "status" SET DEFAULT 'pending-authorization'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft-in-drop" ALTER COLUMN "status" SET DEFAULT 'pending-authorization'-in-drop_status_enum"`);
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "priority"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "priority"`);
        await queryRunner.query(`ALTER TABLE "nft" DROP COLUMN "priority"`);
    }
}
