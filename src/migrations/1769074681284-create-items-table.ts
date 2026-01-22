import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItemsTable1769074681284 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "items" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "name" VARCHAR(255) NOT NULL,
                "category" VARCHAR(100) NOT NULL,
                "price" DECIMAL(10, 2) NOT NULL,
                "isAvailable" BOOLEAN NOT NULL DEFAULT 1
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "items"`);
    }

}
