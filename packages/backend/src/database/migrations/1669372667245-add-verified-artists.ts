import { MigrationInterface, QueryRunner } from "typeorm";

export class addVerifiedArtists1669372667245 implements MigrationInterface {
    name = "addVerifiedArtists1669372667245";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "verifiedArtist" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "nft-in-drop" ALTER COLUMN "status" SET DEFAULT 'pending-authorization'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nft-in-drop" ALTER COLUMN "status" SET DEFAULT 'pending-authorization'-in-drop_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "verifiedArtist"`);
    }
}
