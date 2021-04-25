import {MigrationInterface, QueryRunner} from "typeorm";

export class createColaboratorTable1619365177921 implements MigrationInterface {
    name = 'createColaboratorTable1619365177921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "collaborator" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "storeId" integer, CONSTRAINT "PK_aa48142926d7bdb485d21ad2696" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "collaborator" ADD CONSTRAINT "FK_2e80ac572293e2a2052fc888fc1" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collaborator" DROP CONSTRAINT "FK_2e80ac572293e2a2052fc888fc1"`);
        await queryRunner.query(`DROP TABLE "collaborator"`);
    }

}
