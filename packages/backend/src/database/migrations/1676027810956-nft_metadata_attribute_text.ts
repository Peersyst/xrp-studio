import { MigrationInterface, QueryRunner } from "typeorm";

export class nftMetadataAttributeText1676027810956 implements MigrationInterface {
    name = "nftMetadataAttributeText1676027810956";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" DROP COLUMN "trait_type"`);
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" ADD "trait_type" text`);
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" ADD "value" text`);
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" DROP COLUMN "display_type"`);
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" ADD "display_type" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" DROP COLUMN "display_type"`);
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" ADD "display_type" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" ADD "value" character varying(255)†`);
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" DROP COLUMN "trait_type"`);
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" ADD "trait_type" character varying(255)`);
    }
}
