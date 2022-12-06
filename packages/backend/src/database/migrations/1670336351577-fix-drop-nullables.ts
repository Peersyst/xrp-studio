import { MigrationInterface, QueryRunner } from "typeorm";

export class fixDropNullables1670336351577 implements MigrationInterface {
    name = "fixDropNullables1670336351577";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drop" ALTER COLUMN "videoUrl" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drop" ALTER COLUMN "instagram" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drop" ALTER COLUMN "twitter" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drop" DROP COLUMN "discord"`);
        await queryRunner.query(`ALTER TABLE "drop" ADD "discord" character varying(1023)`);
        await queryRunner.query(`ALTER TABLE "nft-in-drop" ALTER COLUMN "status" SET DEFAULT 'pending-authorization'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft-in-drop" ALTER COLUMN "status" SET DEFAULT 'pending-authorization'-in-drop_status_enum"`);
        await queryRunner.query(`ALTER TABLE "drop" DROP COLUMN "discord"`);
        await queryRunner.query(`ALTER TABLE "drop" ADD "discord" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drop" ALTER COLUMN "twitter" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drop" ALTER COLUMN "instagram" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drop" ALTER COLUMN "videoUrl" SET NOT NULL`);
    }
}
