import { MigrationInterface, QueryRunner } from "typeorm";

export class nftMetadataAttributeText1676027810956 implements MigrationInterface {
    name = "nftMetadataAttributeText1676027810956";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" ALTER COLUMN "trait_type" TYPE TEXT USING "trait_type" :: TEXT`);
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" ALTER COLUMN "value" TYPE TEXT USING "value" :: TEXT`);
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" ALTER COLUMN "display_type" TYPE TEXT USING "display_type" :: TEXT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "nft_metadata_attribute" ALTER COLUMN "trait_type" TYPE varying(255) USING "trait_type" :: varying(255)`,
        );
        await queryRunner.query(
            `ALTER TABLE "nft_metadata_attribute" ALTER COLUMN "value" TYPE varying(255) USING "value" :: varying(255)`,
        );
        await queryRunner.query(
            `ALTER TABLE "nft_metadata_attribute" ALTER COLUMN "display_type" TYPE varying(255) USING "display_type" :: varying(255)`,
        );
    }
}
