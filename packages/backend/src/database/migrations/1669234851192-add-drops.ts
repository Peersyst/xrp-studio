import { MigrationInterface, QueryRunner } from "typeorm";

export class addDrops1669234851192 implements MigrationInterface {
    name = "addDrops1669234851192";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "faq" ("id" SERIAL NOT NULL, "drop_id" integer NOT NULL, "question" text NOT NULL, "answer" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "drop" ("id" SERIAL NOT NULL, "collection_id" integer NOT NULL, "price" character varying(255) NOT NULL, "items" integer NOT NULL, "soldItems" integer NOT NULL DEFAULT '0', "backgroundColor" character varying(7) NOT NULL, "fontColor" character varying(7) NOT NULL, "videoUrl" character varying(1023) NOT NULL, "instagram" character varying(255) NOT NULL, "twitter" character varying(255) NOT NULL, "discord" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_7f53cbabe6f1864d7d2511cb36" UNIQUE ("collection_id"), CONSTRAINT "PK_abaebd56a1515ba3b3f47c602fe" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."nft-in-drop_status_enum" AS ENUM('pending-authorization', 'authorized', 'minting', 'minted', 'creating-offer', 'offer-created', 'sold')`,
        );
        await queryRunner.query(
            `CREATE TABLE "nft-in-drop" ("nft_id" integer NOT NULL, "drop_id" integer NOT NULL, "price" character varying(255) NOT NULL, "mintingTransactionHash" character varying(255), "offerTransactionHash" character varying(255), "offerId" character varying(255), "status" "public"."nft-in-drop_status_enum" NOT NULL DEFAULT 'pending-authorization', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "dropId" integer, CONSTRAINT "REL_a8da0c13c31b053d896b51a2ff" UNIQUE ("nft_id"), CONSTRAINT "PK_a8da0c13c31b053d896b51a2ff2" PRIMARY KEY ("nft_id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "faq" ADD CONSTRAINT "FK_608be792463a4eb2842de091aa9" FOREIGN KEY ("drop_id") REFERENCES "drop"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "drop" ADD CONSTRAINT "FK_7f53cbabe6f1864d7d2511cb36e" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "nft-in-drop" ADD CONSTRAINT "FK_a8da0c13c31b053d896b51a2ff2" FOREIGN KEY ("nft_id") REFERENCES "nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "nft-in-drop" ADD CONSTRAINT "FK_e6265fee3b9b550c63ef3e406db" FOREIGN KEY ("dropId") REFERENCES "drop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft-in-drop" DROP CONSTRAINT "FK_e6265fee3b9b550c63ef3e406db"`);
        await queryRunner.query(`ALTER TABLE "nft-in-drop" DROP CONSTRAINT "FK_a8da0c13c31b053d896b51a2ff2"`);
        await queryRunner.query(`ALTER TABLE "drop" DROP CONSTRAINT "FK_7f53cbabe6f1864d7d2511cb36e"`);
        await queryRunner.query(`ALTER TABLE "faq" DROP CONSTRAINT "FK_608be792463a4eb2842de091aa9"`);
        await queryRunner.query(`DROP TABLE "nft-in-drop"`);
        await queryRunner.query(`DROP TYPE "public"."nft-in-drop_status_enum"`);
        await queryRunner.query(`DROP TABLE "drop"`);
        await queryRunner.query(`DROP TABLE "faq"`);
    }
}
