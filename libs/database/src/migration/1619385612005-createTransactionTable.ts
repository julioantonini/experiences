import {MigrationInterface, QueryRunner} from "typeorm";

export class createTransactionTable1619385612005 implements MigrationInterface {
    name = 'createTransactionTable1619385612005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "date" date NOT NULL, "value" numeric(12,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "custommerId" integer, "storeId" integer, "collaboratorId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_a77d644886fcd25691bab62e161" FOREIGN KEY ("custommerId") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_37096c1d619bbd8865042bede28" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_5dd39f31992eca8896f2f329583" FOREIGN KEY ("collaboratorId") REFERENCES "collaborator"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_5dd39f31992eca8896f2f329583"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_37096c1d619bbd8865042bede28"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_a77d644886fcd25691bab62e161"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
