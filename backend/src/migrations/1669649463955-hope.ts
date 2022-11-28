import { MigrationInterface, QueryRunner } from "typeorm";

export class hope1669649463955 implements MigrationInterface {
    name = 'hope1669649463955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" RENAME COLUMN "msg" TO "msgoop"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" RENAME COLUMN "msgoop" TO "msg"`);
    }

}
