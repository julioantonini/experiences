import {MigrationInterface, QueryRunner} from "typeorm";

export class createCostumerTable1619137270061 implements MigrationInterface {
    name = 'createCostumerTable1619137270061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying, "cpf" character varying(11) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), CONSTRAINT "UQ_e96edf3964ada73dc7e048d4f31" UNIQUE ("cpf"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
