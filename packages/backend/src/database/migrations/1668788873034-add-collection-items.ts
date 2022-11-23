import { MigrationInterface, QueryRunner } from "typeorm";

export class addCollectionItems1668788873034 implements MigrationInterface {
    name = "addCollectionItems1668788873034";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" ADD "items" integer`);
        await queryRunner.query(`ALTER TABLE "nft_metadata" DROP CONSTRAINT "FK_dbd59046d98b206d31803a83289"`);
        await queryRunner.query(`ALTER TABLE "nft_metadata" ADD CONSTRAINT "UQ_dbd59046d98b206d31803a83289" UNIQUE ("nft_id")`);
        await queryRunner.query(`ALTER TABLE "nft" DROP CONSTRAINT "FK_a185d922933cab5a4854db8931a"`);
        await queryRunner.query(`ALTER TABLE "nft" ALTER COLUMN "account" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "FK_ad07bc71d4c5633242299eba9f3"`);
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "UQ_60381174c9122afd459eb265c68"`);
        await queryRunner.query(`ALTER TABLE "collection" ALTER COLUMN "account" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "collection" ADD CONSTRAINT "UQ_60381174c9122afd459eb265c68" UNIQUE ("taxon", "account")`);
        await queryRunner.query(
            `ALTER TABLE "nft_metadata_attribute" ADD CONSTRAINT "FK_7b22ca7b417dd851fc4c31aa99a" FOREIGN KEY ("nft_metadata_id") REFERENCES "nft_metadata"("nft_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "nft_metadata" ADD CONSTRAINT "FK_dbd59046d98b206d31803a83289" FOREIGN KEY ("nft_id") REFERENCES "nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "nft" ADD CONSTRAINT "FK_a185d922933cab5a4854db8931a" FOREIGN KEY ("account") REFERENCES "user"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "collection" ADD CONSTRAINT "FK_ad07bc71d4c5633242299eba9f3" FOREIGN KEY ("account") REFERENCES "user"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "FK_ad07bc71d4c5633242299eba9f3"`);
        await queryRunner.query(`ALTER TABLE "nft" DROP CONSTRAINT "FK_a185d922933cab5a4854db8931a"`);
        await queryRunner.query(`ALTER TABLE "nft_metadata" DROP CONSTRAINT "FK_dbd59046d98b206d31803a83289"`);
        await queryRunner.query(`ALTER TABLE "nft_metadata_attribute" DROP CONSTRAINT "FK_7b22ca7b417dd851fc4c31aa99a"`);
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "UQ_60381174c9122afd459eb265c68"`);
        await queryRunner.query(`ALTER TABLE "collection" ALTER COLUMN "account" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "collection" ADD CONSTRAINT "UQ_60381174c9122afd459eb265c68" UNIQUE ("taxon", "account")`);
        await queryRunner.query(
            `ALTER TABLE "collection" ADD CONSTRAINT "FK_ad07bc71d4c5633242299eba9f3" FOREIGN KEY ("account") REFERENCES "user"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(`ALTER TABLE "nft" ALTER COLUMN "account" DROP NOT NULL`);
        await queryRunner.query(
            `ALTER TABLE "nft" ADD CONSTRAINT "FK_a185d922933cab5a4854db8931a" FOREIGN KEY ("account") REFERENCES "user"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(`ALTER TABLE "nft_metadata" DROP CONSTRAINT "UQ_dbd59046d98b206d31803a83289"`);
        await queryRunner.query(
            `ALTER TABLE "nft_metadata" ADD CONSTRAINT "FK_dbd59046d98b206d31803a83289" FOREIGN KEY ("nft_id") REFERENCES "nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "items"`);
    }
}
