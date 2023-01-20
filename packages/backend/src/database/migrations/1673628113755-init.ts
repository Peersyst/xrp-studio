import { MigrationInterface, QueryRunner } from "typeorm";

export class init1673628113755 implements MigrationInterface {
    name = "init1673628113755";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "nft_metadata_attribute" ("id" SERIAL NOT NULL, "nft_metadata_id" integer NOT NULL, "trait_type" character varying(255), "value" character varying(255) NOT NULL, "display_type" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b61f2d47ede5c3de42fd80148e8" PRIMARY KEY ("id", "nft_metadata_id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "nft_metadata" ("nft_id" integer NOT NULL, "name" character varying(255), "description" text, "image" text, "background_color" character varying(9), "external_url" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_dbd59046d98b206d31803a8328" UNIQUE ("nft_id"), CONSTRAINT "PK_dbd59046d98b206d31803a83289" PRIMARY KEY ("nft_id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "faq" ("id" SERIAL NOT NULL, "drop_id" integer NOT NULL, "question" text NOT NULL, "answer" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "drop" ("id" SERIAL NOT NULL, "collection_id" integer NOT NULL, "price" character varying(255) NOT NULL, "items" integer NOT NULL, "soldItems" integer NOT NULL DEFAULT '0', "backgroundColor" character varying(7) NOT NULL, "fontColor" character varying(7) NOT NULL, "videoUrl" character varying(1023), "instagram" character varying(255), "twitter" character varying(255), "discord" character varying(1023), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_7f53cbabe6f1864d7d2511cb36" UNIQUE ("collection_id"), CONSTRAINT "PK_abaebd56a1515ba3b3f47c602fe" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."nft_in_drop_status_enum" AS ENUM('pending-authorization', 'authorized', 'minting', 'minted', 'creating-offer', 'offer-created', 'sold', 'funding', 'funded')`,
        );
        await queryRunner.query(
            `CREATE TABLE "nft_in_drop" ("nft_id" integer NOT NULL, "drop_id" integer NOT NULL, "price" character varying(255) NOT NULL, "mintingTransactionHash" character varying(255), "offerTransactionHash" character varying(255), "acceptOfferTransactionHash" character varying(255), "fundingTransactionHash" character varying(255), "offerId" character varying(255), "status" "public"."nft_in_drop_status_enum" NOT NULL DEFAULT 'pending-authorization', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_61a54557c0f248eece974eeb2e" UNIQUE ("nft_id"), CONSTRAINT "PK_61a54557c0f248eece974eeb2eb" PRIMARY KEY ("nft_id"))`,
        );
        await queryRunner.query(`CREATE TYPE "public"."offer_type_enum" AS ENUM('sell', 'buy')`);
        await queryRunner.query(
            `CREATE TABLE "offer" ("id" SERIAL NOT NULL, "offer_id" character varying(255) NOT NULL, "nft_id" integer NOT NULL, "creator_account" character varying(255) NOT NULL, "accepter_account" character varying(255), "owner" character varying(255), "amount" character varying(255) NOT NULL, "expiration" integer, "destination" character varying(255), "offer_hash" character varying(255) NOT NULL, "accept_offer_hash" character varying(255), "type" "public"."offer_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "nftId" integer, CONSTRAINT "UQ_64682cc1a937320dc67a90ac8eb" UNIQUE ("offer_id"), CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(`CREATE TYPE "public"."nft_status_enum" AS ENUM('draft', 'pending', 'confirmed', 'failed')`);
        await queryRunner.query(
            `CREATE TABLE "nft" ("id" SERIAL NOT NULL, "token_id" character varying(255), "mint_transaction_hash" character varying(255), "issuer" character varying(255) NOT NULL, "transfer_fee" integer, "flags" integer NOT NULL, "uri" character varying(255), "status" "public"."nft_status_enum" NOT NULL DEFAULT 'draft', "account" character varying(255) NOT NULL, "owner_account" character varying(255) NOT NULL, "priority" integer, "collection_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7e215df412b248db3731737290e" UNIQUE ("token_id"), CONSTRAINT "UQ_ca0320847607f5411fa21fc43f8" UNIQUE ("mint_transaction_hash"), CONSTRAINT "PK_8f46897c58e23b0e7bf6c8e56b0" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "user" ("address" character varying(255) NOT NULL, "name" character varying(255), "description" text, "image" text, "header" text, "twitter" character varying(255), "discord" character varying(255), "verified_artist" boolean NOT NULL DEFAULT false, "priority" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"), CONSTRAINT "PK_3122b4b8709577da50e89b68983" PRIMARY KEY ("address"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "collection" ("id" SERIAL NOT NULL, "taxon" bigint NOT NULL, "name" character varying(255), "description" text, "image" text, "header" text, "items" integer, "account" character varying(255) NOT NULL, "priority" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_60381174c9122afd459eb265c68" UNIQUE ("taxon", "account"), CONSTRAINT "PK_ad3f485bbc99d875491f44d7c85" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "last_indexed_ledger" ("id" integer NOT NULL DEFAULT '1', "index" integer NOT NULL, CONSTRAINT "CHK_e3236bd8ac28b934604ba95490" CHECK ("id" = 1), CONSTRAINT "PK_b3b4f91ce6242a2026fe8d5997e" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "xumm" ("id" SERIAL NOT NULL, "user_token" character varying(255) NOT NULL, "address" character varying(255) NOT NULL, "payload" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e872cf9e62b1d867e4df5786819" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "nft_metadata_attribute" ADD CONSTRAINT "FK_7b22ca7b417dd851fc4c31aa99a" FOREIGN KEY ("nft_metadata_id") REFERENCES "nft_metadata"("nft_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "nft_metadata" ADD CONSTRAINT "FK_dbd59046d98b206d31803a83289" FOREIGN KEY ("nft_id") REFERENCES "nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "faq" ADD CONSTRAINT "FK_608be792463a4eb2842de091aa9" FOREIGN KEY ("drop_id") REFERENCES "drop"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "drop" ADD CONSTRAINT "FK_7f53cbabe6f1864d7d2511cb36e" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "nft_in_drop" ADD CONSTRAINT "FK_61a54557c0f248eece974eeb2eb" FOREIGN KEY ("nft_id") REFERENCES "nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "nft_in_drop" ADD CONSTRAINT "FK_54c8caf5845692b849d1bad6539" FOREIGN KEY ("drop_id") REFERENCES "drop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "offer" ADD CONSTRAINT "FK_175ee748d2234f5ba7ad3396e31" FOREIGN KEY ("creator_account") REFERENCES "user"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "offer" ADD CONSTRAINT "FK_4812cdca264443404918c5ef9df" FOREIGN KEY ("accepter_account") REFERENCES "user"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "offer" ADD CONSTRAINT "FK_43e458059026b9eaff948171bef" FOREIGN KEY ("nftId") REFERENCES "nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "nft" ADD CONSTRAINT "FK_a185d922933cab5a4854db8931a" FOREIGN KEY ("account") REFERENCES "user"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "nft" ADD CONSTRAINT "FK_02aa049f193e7982e24eaa3a473" FOREIGN KEY ("owner_account") REFERENCES "user"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
        await queryRunner.query(`ALTER TABLE "nft" DROP CONSTRAINT "FK_02aa049f193e7982e24eaa3a473"`);
        await queryRunner.query(`ALTER TABLE "nft" DROP CONSTRAINT "FK_a185d922933cab5a4854db8931a"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_43e458059026b9eaff948171bef"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_4812cdca264443404918c5ef9df"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_175ee748d2234f5ba7ad3396e31"`);
        await queryRunner.query(`ALTER TABLE "nft_in_drop" DROP CONSTRAINT "FK_54c8caf5845692b849d1bad6539"`);
        await queryRunner.query(`ALTER TABLE "nft_in_drop" DROP CONSTRAINT "FK_61a54557c0f248eece974eeb2eb"`);
        await queryRunner.query(`ALTER TABLE "drop" DROP CONSTRAINT "FK_7f53cbabe6f1864d7d2511cb36e"`);
        await queryRunner.query(`ALTER TABLE "faq" DROP CONSTRAINT "FK_608be792463a4eb2842de091aa9"`);
        await queryRunner.query(`ALTER TABLE "nft_metadata" DROP CONSTRAINT "FK_dbd59046d98b206d31803a83289"`);
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" DROP CONSTRAINT "FK_7b22ca7b417dd851fc4c31aa99a"`);
        await queryRunner.query(`DROP TABLE "xumm"`);
        await queryRunner.query(`DROP TABLE "last_indexed_ledger"`);
        await queryRunner.query(`DROP TABLE "collection"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "nft"`);
        await queryRunner.query(`DROP TYPE "public"."nft_status_enum"`);
        await queryRunner.query(`DROP TABLE "offer"`);
        await queryRunner.query(`DROP TYPE "public"."offer_type_enum"`);
        await queryRunner.query(`DROP TABLE "nft_in_drop"`);
        await queryRunner.query(`DROP TYPE "public"."nft_in_drop_status_enum"`);
        await queryRunner.query(`DROP TABLE "drop"`);
        await queryRunner.query(`DROP TABLE "faq"`);
        await queryRunner.query(`DROP TABLE "nft_metadata"`);
        await queryRunner.query(`DROP TABLE "nft_metadata_attribute"`);
    }
}
