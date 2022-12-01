import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialTables1669789786635 implements MigrationInterface {
  name = 'initialTables1669789786635';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "contact_status" ("id" SERIAL NOT NULL, "contactId" integer NOT NULL, "statusId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_afd386b52864cee12bc7c943ab6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."status_status_enum" AS ENUM('Lead', 'PotentialCustomer', 'LostPotentialCustomer', 'LoyalCustomer', 'LostLoyalCustomer', 'Loyal', 'LostLoyal')`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" SERIAL NOT NULL, "status" "public"."status_status_enum" NOT NULL DEFAULT 'Lead', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "note" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "score" integer, "date" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "statusId" integer, "contactId" integer, CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."role_name_enum" AS ENUM('Owner', 'Employee')`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" "public"."role_name_enum" NOT NULL DEFAULT 'Owner', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "enabled" boolean NOT NULL DEFAULT false, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "organizationId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_dfda472c0af7812401e592b6a6" UNIQUE ("organizationId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization_user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, "orgId" integer, "roleId" integer, CONSTRAINT "REL_29586d245154770441881d8f4f" UNIQUE ("userId"), CONSTRAINT "PK_b93269ca4d9016837d22ab6e1e0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "slug" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_a08804baa7c5d5427067c49a31f" UNIQUE ("slug"), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying(14) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "organizationId" integer, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "invite" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "token" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "invitedById" integer, "invitedOrganizationId" integer, CONSTRAINT "UQ_658d8246180c0345d32a100544e" UNIQUE ("email"), CONSTRAINT "UQ_83dbe83cb33c3e8468c8045ea7c" UNIQUE ("token"), CONSTRAINT "PK_fc9fa190e5a3c5d80604a4f63e1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "log" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "entityType" character varying NOT NULL, "entityId" integer NOT NULL, "event" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_status" ADD CONSTRAINT "FK_655cf48fae6f113feaee4c3a042" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_status" ADD CONSTRAINT "FK_274fa84629b697dc4162a0c96fe" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "note" ADD CONSTRAINT "FK_8f95ccbdd18b761235b0b4e2a81" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "note" ADD CONSTRAINT "FK_e9053d65e5315db1c2bbfe03354" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_user" ADD CONSTRAINT "FK_29586d245154770441881d8f4fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_user" ADD CONSTRAINT "FK_8b7d3626b6770e423622248e763" FOREIGN KEY ("orgId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_user" ADD CONSTRAINT "FK_a4b2a3d752ecb729980e5dd5945" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact" ADD CONSTRAINT "FK_7719d73cd16a9f57ecc6ac24b3d" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite" ADD CONSTRAINT "FK_5a182e8b3e225b14ddf6df7e6c3" FOREIGN KEY ("invitedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite" ADD CONSTRAINT "FK_a2cfc212af4af5e6099a64ae18a" FOREIGN KEY ("invitedOrganizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invite" DROP CONSTRAINT "FK_a2cfc212af4af5e6099a64ae18a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invite" DROP CONSTRAINT "FK_5a182e8b3e225b14ddf6df7e6c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact" DROP CONSTRAINT "FK_7719d73cd16a9f57ecc6ac24b3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_user" DROP CONSTRAINT "FK_a4b2a3d752ecb729980e5dd5945"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_user" DROP CONSTRAINT "FK_8b7d3626b6770e423622248e763"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_user" DROP CONSTRAINT "FK_29586d245154770441881d8f4fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dfda472c0af7812401e592b6a61"`,
    );
    await queryRunner.query(
      `ALTER TABLE "note" DROP CONSTRAINT "FK_e9053d65e5315db1c2bbfe03354"`,
    );
    await queryRunner.query(
      `ALTER TABLE "note" DROP CONSTRAINT "FK_8f95ccbdd18b761235b0b4e2a81"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_status" DROP CONSTRAINT "FK_274fa84629b697dc4162a0c96fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_status" DROP CONSTRAINT "FK_655cf48fae6f113feaee4c3a042"`,
    );
    await queryRunner.query(`DROP TABLE "log"`);
    await queryRunner.query(`DROP TABLE "invite"`);
    await queryRunner.query(`DROP TABLE "contact"`);
    await queryRunner.query(`DROP TABLE "organization"`);
    await queryRunner.query(`DROP TABLE "organization_user"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TYPE "public"."role_name_enum"`);
    await queryRunner.query(`DROP TABLE "note"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TYPE "public"."status_status_enum"`);
    await queryRunner.query(`DROP TABLE "contact_status"`);
  }
}
