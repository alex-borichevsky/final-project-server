import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1678888257865 implements MigrationInterface {
    name = 'createTables1678888257865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_info" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_273a06d6cdc2085ee1ce7638b24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_roles" ("id" BIGSERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "type" character varying NOT NULL, "name" character varying NOT NULL, "permissions" text array NOT NULL, CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "name" character varying NOT NULL, "totalPrice" integer NOT NULL, "userId" bigint, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" BIGSERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "name" character varying NOT NULL, "price" integer NOT NULL, "description" character varying NOT NULL, "quantity" integer NOT NULL, "image" character varying NOT NULL DEFAULT '', "brand" character varying NOT NULL DEFAULT '', "cartId" uuid, "ordersId" uuid, "categoryId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "totalPrice" integer NOT NULL, CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, "role_id" bigint NOT NULL, "role_type" character varying NOT NULL, "userInfoId" uuid, "cartId" uuid, CONSTRAINT "REL_e43569535ff044bc1626bbeb7f" UNIQUE ("userInfoId"), CONSTRAINT "REL_89502c44bd22c06e714c31c1e9" UNIQUE ("cartId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "user_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_7a637e662f7c4b3a85001c53dfd" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_5e47f94f1353b902908e359e476" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_e43569535ff044bc1626bbeb7f9" FOREIGN KEY ("userInfoId") REFERENCES "user_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "user_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_e43569535ff044bc1626bbeb7f9"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_5e47f94f1353b902908e359e476"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_7a637e662f7c4b3a85001c53dfd"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP TABLE "user_info"`);
    }

}
