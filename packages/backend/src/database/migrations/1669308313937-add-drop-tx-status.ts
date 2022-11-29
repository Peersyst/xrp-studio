import { MigrationInterface, QueryRunner } from "typeorm";

export class addDropTxStatus1669308313937 implements MigrationInterface {
    name = "addDropTxStatus1669308313937";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft-in-drop" DROP CONSTRAINT "FK_e6265fee3b9b550c63ef3e406db"`);
        await queryRunner.query(`ALTER TABLE "nft-in-drop" DROP COLUMN "dropId"`);
        await queryRunner.query(`ALTER TABLE "nft-in-drop" ADD "acceptOfferTransactionHash" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "nft-in-drop" ADD "fundingTransactionHash" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "nft-in-drop" DROP CONSTRAINT "FK_a8da0c13c31b053d896b51a2ff2"`);
        await queryRunner.query(`ALTER TABLE "nft-in-drop" ADD CONSTRAINT "UQ_a8da0c13c31b053d896b51a2ff2" UNIQUE ("nft_id")`);
        await queryRunner.query(`ALTER TYPE "public"."nft-in-drop_status_enum" RENAME TO "nft-in-drop_status_enum_old"`);
        await queryRunner.query(
            `CREATE TYPE "public"."nft-in-drop_status_enum" AS ENUM('pending-authorization', 'authorized', 'minting', 'minted', 'creating-offer', 'offer-created', 'sold', 'funding', 'funded')`,
        );
        await queryRunner.query(`ALTER TABLE "nft-in-drop" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(
            `ALTER TABLE "nft-in-drop" ALTER COLUMN "status" TYPE "public"."nft-in-drop_status_enum" USING "status"::"text"::"public"."nft-in-drop_status_enum"`,
        );
        await queryRunner.query(`ALTER TABLE "nft-in-drop" ALTER COLUMN "status" SET DEFAULT 'pending-authorization'`);
        await queryRunner.query(`DROP TYPE "public"."nft-in-drop_status_enum_old"`);
        await queryRunner.query(
            `ALTER TABLE "nft-in-drop" ADD CONSTRAINT "FK_a8da0c13c31b053d896b51a2ff2" FOREIGN KEY ("nft_id") REFERENCES "nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "nft-in-drop" ADD CONSTRAINT "FK_9ff31051f181a5d59ebdb7e2cec" FOREIGN KEY ("drop_id") REFERENCES "drop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft-in-drop" DROP CONSTRAINT "FK_9ff31051f181a5d59ebdb7e2cec"`);
        await queryRunner.query(`ALTER TABLE "nft-in-drop" DROP CONSTRAINT "FK_a8da0c13c31b053d896b51a2ff2"`);
        await queryRunner.query(
            `CREATE TYPE "public"."nft-in-drop_status_enum_old" AS ENUM('pending-authorization', 'authorized', 'minting', 'minted', 'creating-offer', 'offer-created', 'sold')`,
        );
        await queryRunner.query(`ALTER TABLE "nft-in-drop" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(
            `ALTER TABLE "nft-in-drop" ALTER COLUMN "status" TYPE "public"."nft-in-drop_status_enum_old" USING "status"::"text"::"public"."nft-in-drop_status_enum_old"`,
        );
        await queryRunner.query(`ALTER TABLE "nft-in-drop" ALTER COLUMN "status" SET DEFAULT 'pending-authorization'-in-drop_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."nft-in-drop_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."nft-in-drop_status_enum_old" RENAME TO "nft-in-drop_status_enum"`);
        await queryRunner.query(`ALTER TABLE "nft-in-drop" DROP CONSTRAINT "UQ_a8da0c13c31b053d896b51a2ff2"`);
        await queryRunner.query(
            `ALTER TABLE "nft-in-drop" ADD CONSTRAINT "FK_a8da0c13c31b053d896b51a2ff2" FOREIGN KEY ("nft_id") REFERENCES "nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(`ALTER TABLE "nft-in-drop" DROP COLUMN "fundingTransactionHash"`);
        await queryRunner.query(`ALTER TABLE "nft-in-drop" DROP COLUMN "acceptOfferTransactionHash"`);
        await queryRunner.query(`ALTER TABLE "nft-in-drop" ADD "dropId" integer`);
        await queryRunner.query(
            `ALTER TABLE "nft-in-drop" ADD CONSTRAINT "FK_e6265fee3b9b550c63ef3e406db" FOREIGN KEY ("dropId") REFERENCES "drop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
