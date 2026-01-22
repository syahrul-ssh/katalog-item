import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoriesTable1769076123741 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "name" VARCHAR(255) NOT NULL
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
