import {MigrationInterface, QueryRunner} from "typeorm";

export class todo1628254838567 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`alter table todo add column 'createdAt' date`);
        await queryRunner.query(`alter table todo add column 'updatedAt' date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`alter table todo drop column 'createdAt'`);
        await queryRunner.query(`alter table todo drop column 'updatedAt'`);
    }

}
