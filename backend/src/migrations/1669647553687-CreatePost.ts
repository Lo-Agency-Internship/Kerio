import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePost1669647553687 implements MigrationInterface {
  name = 'CreatePost1669647553687';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "note" ADD "msg" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "msg"`);
  }
}
