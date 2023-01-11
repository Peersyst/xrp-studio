import {MigrationInterface, QueryRunner} from "typeorm";

export class nonNullableUserName1673457756028 implements MigrationInterface {
    name = 'nonNullableUserName1673457756028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" DROP NOT NULL`);
    }

}
