import { MigrationInterface, QueryRunner } from "typeorm"

export class DmlMigration1679006037816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "categories" (name, description) 
                    VALUES ('Furniture', 'Default furniture category');`
        ),
            await queryRunner.query(
                `INSERT INTO "user_roles" (type, name, permissions)
                    VALUES ('super-admin', 'super admin', '{}');`
            ),
            await queryRunner.query(
                `INSERT INTO "user_roles" (type, name, permissions)
                    VALUES ('client', 'user', '{"get-user-info", "update-user-info", "update-password", "get-all-products", "add-product-to-cart", "update-product-quantity","delete-product-from-cart", "get-all-orders", "create-order", "get-all-categories", "get-cart"}')`
            )


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM "categories"
                        WHERE name='Furniture'`,
        ),
            await queryRunner.query(
                `DELETE FROM "user_roles"
                        WHERE type='super-admin'`,
            )
        await queryRunner.query(
            `DELETE FROM "user_roles"
                        WHERE type='client'`,
        )
    }

}
