import { MigrationInterface, QueryRunner } from "typeorm";

export class init1658143801437 implements MigrationInterface {
    name = "init1658143801437";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "last_indexed_ledger" ("id" integer NOT NULL DEFAULT '1', "index" integer NOT NULL, CONSTRAINT "CHK_e3236bd8ac28b934604ba95490" CHECK ("id" = 1), CONSTRAINT "PK_b3b4f91ce6242a2026fe8d5997e" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "nft_metadata_attribute" ("nft_metadata_id" integer NOT NULL, "trait_type" character varying(255) NOT NULL, "value" character varying(255) NOT NULL, "display_type" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_859d585bac5bacc1b64ca2911de" PRIMARY KEY ("nft_metadata_id", "trait_type"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "nft_metadata" ("name" character varying(255), "description" text, "image" text, "background_color" character varying(9), "external_url" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "nft_id" integer NOT NULL, CONSTRAINT "REL_dbd59046d98b206d31803a8328" UNIQUE ("nft_id"), CONSTRAINT "PK_dbd59046d98b206d31803a83289" PRIMARY KEY ("nft_id"))`,
        );
        await queryRunner.query(`CREATE TYPE "public"."nft_status_enum" AS ENUM('draft', 'pending', 'confirmed', 'failed')`);
        await queryRunner.query(
            `CREATE TABLE "nft" ("id" SERIAL NOT NULL, "token_id" character varying(255), "mint_transaction_hash" character varying(255), "issuer" character varying(255) NOT NULL, "transfer_fee" integer, "flags" integer NOT NULL, "uri" character varying(255), "status" "public"."nft_status_enum" NOT NULL DEFAULT 'draft', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "account" character varying(255), "collection_id" integer, CONSTRAINT "UQ_7e215df412b248db3731737290e" UNIQUE ("token_id"), CONSTRAINT "UQ_ca0320847607f5411fa21fc43f8" UNIQUE ("mint_transaction_hash"), CONSTRAINT "PK_8f46897c58e23b0e7bf6c8e56b0" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "user" ("address" character varying(255) NOT NULL, "name" character varying(255), "description" text, "image" text, "header" text, "twitter" character varying(255), "discord" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"), CONSTRAINT "PK_3122b4b8709577da50e89b68983" PRIMARY KEY ("address"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "collection" ("id" SERIAL NOT NULL, "taxon" bigint NOT NULL, "name" character varying(255), "description" text, "image" text, "header" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "account" character varying(255), CONSTRAINT "UQ_60381174c9122afd459eb265c68" UNIQUE ("taxon", "account"), CONSTRAINT "PK_ad3f485bbc99d875491f44d7c85" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "xumm" ("id" SERIAL NOT NULL, "user_token" character varying(255) NOT NULL, "address" character varying(255) NOT NULL, "payload" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e872cf9e62b1d867e4df5786819" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "nft_metadata" ADD CONSTRAINT "FK_dbd59046d98b206d31803a83289" FOREIGN KEY ("nft_id") REFERENCES "nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "nft" ADD CONSTRAINT "FK_a185d922933cab5a4854db8931a" FOREIGN KEY ("account") REFERENCES "user"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "nft" ADD CONSTRAINT "FK_ffe58aa05707db77c2f20ecdbc3" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "collection" ADD CONSTRAINT "FK_ad07bc71d4c5633242299eba9f3" FOREIGN KEY ("account") REFERENCES "user"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "FK_ad07bc71d4c5633242299eba9f3"`);
        await queryRunner.query(`ALTER TABLE "nft" DROP CONSTRAINT "FK_ffe58aa05707db77c2f20ecdbc3"`);
        await queryRunner.query(`ALTER TABLE "nft" DROP CONSTRAINT "FK_a185d922933cab5a4854db8931a"`);
        await queryRunner.query(`ALTER TABLE "nft_metadata" DROP CONSTRAINT "FK_dbd59046d98b206d31803a83289"`);
        await queryRunner.query(`DROP TABLE "xumm"`);
        await queryRunner.query(`DROP TABLE "collection"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "nft"`);
        await queryRunner.query(`DROP TYPE "public"."nft_status_enum"`);
        await queryRunner.query(`DROP TABLE "nft_metadata"`);
        await queryRunner.query(`DROP TABLE "nft_metadata_attribute"`);
        await queryRunner.query(`DROP TABLE "last_indexed_ledger"`);
    }
}
