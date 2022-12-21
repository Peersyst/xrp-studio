import { MigrationInterface, QueryRunner } from "typeorm";

export class addOffers1670436703256 implements MigrationInterface {
    name = "addOffers1670436703256";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "verifiedArtist" TO "verified_artist"`);
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
        await queryRunner.query(`ALTER TABLE "nft" ADD "owner_account" character varying(255) NOT NULL`);
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
            `ALTER TABLE "nft" ADD CONSTRAINT "FK_02aa049f193e7982e24eaa3a473" FOREIGN KEY ("owner_account") REFERENCES "user"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft" DROP CONSTRAINT "FK_02aa049f193e7982e24eaa3a473"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_43e458059026b9eaff948171bef"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_4812cdca264443404918c5ef9df"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_175ee748d2234f5ba7ad3396e31"`);
        await queryRunner.query(`ALTER TABLE "nft_in_drop" DROP CONSTRAINT "FK_54c8caf5845692b849d1bad6539"`);
        await queryRunner.query(`ALTER TABLE "nft_in_drop" DROP CONSTRAINT "FK_61a54557c0f248eece974eeb2eb"`);
        await queryRunner.query(`ALTER TABLE "nft" DROP COLUMN "owner_account"`);
        await queryRunner.query(`DROP TABLE "offer"`);
        await queryRunner.query(`DROP TYPE "public"."offer_type_enum"`);
        await queryRunner.query(`DROP TABLE "nft_in_drop"`);
        await queryRunner.query(`DROP TYPE "public"."nft_in_drop_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "verified_artist" TO "verifiedArtist"`);
    }
}
