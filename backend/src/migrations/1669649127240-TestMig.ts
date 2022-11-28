import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMig1669649127240 implements MigrationInterface {
    name = 'TestMig1669649127240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" RENAME COLUMN "test" TO "testll"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" RENAME COLUMN "testll" TO "test"`);
    }

}
