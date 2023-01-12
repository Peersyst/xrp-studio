import { MigrationInterface, QueryRunner } from "typeorm";

export class collectionPath1673437882038 implements MigrationInterface {
    name = "collectionPath1673437882038";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" ADD "path" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "collection" ADD CONSTRAINT "UQ_f265516a9a97c3e7faef3c91499" UNIQUE ("path")`);
        await queryRunner.query(`ALTER TABLE "nft_in_drop" DROP CONSTRAINT "FK_61a54557c0f248eece974eeb2eb"`);
        await queryRunner.query(`ALTER TABLE "nft_in_drop" ADD CONSTRAINT "UQ_61a54557c0f248eece974eeb2eb" UNIQUE ("nft_id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying(64)`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "twitter"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "twitter" character varying(15)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "discord"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "discord" character varying(32)`);
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "collection" ADD "name" character varying(64)`);
        await queryRunner.query(
            `ALTER TABLE "nft_in_drop" ADD CONSTRAINT "FK_61a54557c0f248eece974eeb2eb" FOREIGN KEY ("nft_id") REFERENCES "nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft_in_drop" DROP CONSTRAINT "FK_61a54557c0f248eece974eeb2eb"`);
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "collection" ADD "name" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "discord"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "discord" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "twitter"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "twitter" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "nft_in_drop" DROP CONSTRAINT "UQ_61a54557c0f248eece974eeb2eb"`);
        await queryRunner.query(
            `ALTER TABLE "nft_in_drop" ADD CONSTRAINT "FK_61a54557c0f248eece974eeb2eb" FOREIGN KEY ("nft_id") REFERENCES "nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "UQ_f265516a9a97c3e7faef3c91499"`);
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "path"`);
    }
}
