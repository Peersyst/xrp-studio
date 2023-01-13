import { MigrationInterface, QueryRunner } from "typeorm";

export class removeTraitTypeMandatory1671444791084 implements MigrationInterface {
    name = "removeTraitTypeMandatory1671444791084";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" DROP CONSTRAINT "PK_859d585bac5bacc1b64ca2911de"`);
        await queryRunner.query(
            `ALTER TABLE "nft_metadata_attribute" ADD CONSTRAINT "PK_b61f2d47ede5c3de42fd80148e8" PRIMARY KEY ("id", "nft_metadata_id")`,
        );
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" ALTER COLUMN "trait_type" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft-in-drop" ALTER COLUMN "status" SET DEFAULT 'pending-authorization'-in-drop_status_enum"`);
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" DROP CONSTRAINT "PK_b61f2d47ede5c3de42fd80148e8"`);
        await queryRunner.query(
            `ALTER TABLE "nft_metadata_attribute" ADD CONSTRAINT "PK_44d73874092a63a51e51c39d085" PRIMARY KEY ("nft_metadata_id", "trait_type", "id")`,
        );
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" ALTER COLUMN "trait_type" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" DROP CONSTRAINT "PK_b61f2d47ede5c3de42fd80148e8"`);
        await queryRunner.query(
            `ALTER TABLE "nft_metadata_attribute" ADD CONSTRAINT "PK_44d73874092a63a51e51c39d085" PRIMARY KEY ("nft_metadata_id", "trait_type", "id")`,
        );
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" DROP CONSTRAINT "PK_44d73874092a63a51e51c39d085"`);
        await queryRunner.query(
            `ALTER TABLE "nft_metadata_attribute" ADD CONSTRAINT "PK_859d585bac5bacc1b64ca2911de" PRIMARY KEY ("nft_metadata_id", "trait_type")`,
        );
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" DROP COLUMN "id"`);
    }
}
