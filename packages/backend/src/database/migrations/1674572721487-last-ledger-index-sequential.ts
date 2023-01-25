import { MigrationInterface, QueryRunner } from "typeorm";

export class lastLedgerIndexSequential1674572721487 implements MigrationInterface {
    name = "lastLedgerIndexSequential1674572721487";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "last_indexed_ledger" DROP CONSTRAINT "CHK_e3236bd8ac28b934604ba95490"`);
        await queryRunner.query(`ALTER TABLE "last_indexed_ledger" DROP CONSTRAINT "PK_b3b4f91ce6242a2026fe8d5997e"`);
        await queryRunner.query(`ALTER TABLE "last_indexed_ledger" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "last_indexed_ledger" DROP COLUMN "index"`);
        await queryRunner.query(`ALTER TABLE "last_indexed_ledger" ADD "ledger" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "last_indexed_ledger" ADD CONSTRAINT "PK_0cafd9d353c4ff53f798aa23ba0" PRIMARY KEY ("ledger")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "last_indexed_ledger" DROP CONSTRAINT "PK_0cafd9d353c4ff53f798aa23ba0"`);
        await queryRunner.query(`ALTER TABLE "last_indexed_ledger" DROP COLUMN "ledger"`);
        await queryRunner.query(`ALTER TABLE "last_indexed_ledger" ADD "index" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "last_indexed_ledger" ADD "id" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "last_indexed_ledger" ADD CONSTRAINT "PK_b3b4f91ce6242a2026fe8d5997e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "last_indexed_ledger" ADD CONSTRAINT "CHK_e3236bd8ac28b934604ba95490" CHECK ((id = 1))`);
    }
}
