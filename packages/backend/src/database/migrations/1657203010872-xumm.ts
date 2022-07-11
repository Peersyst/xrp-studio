import { MigrationInterface, QueryRunner } from "typeorm";

export class xumm1657203010872 implements MigrationInterface {
    name = "xumm1657203010872";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "xumm" ("id" SERIAL NOT NULL, "user_token" character varying(255) NOT NULL, "address" character varying(255) NOT NULL, "payload" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e872cf9e62b1d867e4df5786819" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(`ALTER TABLE "nft_metadata" DROP CONSTRAINT "FK_dbd59046d98b206d31803a83289"`);
        await queryRunner.query(`ALTER TABLE "nft_metadata" ADD CONSTRAINT "UQ_dbd59046d98b206d31803a83289" UNIQUE ("nft_id")`);
        await queryRunner.query(
            `ALTER TABLE "nft_metadata" ADD CONSTRAINT "FK_dbd59046d98b206d31803a83289" FOREIGN KEY ("nft_id") REFERENCES "nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft_metadata" DROP CONSTRAINT "FK_dbd59046d98b206d31803a83289"`);
        await queryRunner.query(`ALTER TABLE "nft_metadata" DROP CONSTRAINT "UQ_dbd59046d98b206d31803a83289"`);
        await queryRunner.query(
            `ALTER TABLE "nft_metadata" ADD CONSTRAINT "FK_dbd59046d98b206d31803a83289" FOREIGN KEY ("nft_id") REFERENCES "nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(`DROP TABLE "xumm"`);
    }
}
