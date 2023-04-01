import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";

// ============ Entities ================
import { UserEntity } from "../app/users/entities/users.entity";
import { UserInfoEntity } from "../app/users/entities/user-info.entity";
import { CartEntity } from "../app/cart/entities/cart.entity";
import { CategoryEntity } from "../app/categories/entities/category.entity";
import { OrdersEntity } from "../app/orders/entities/orders.entity";
import { ProductsEntity } from "../app/products/entities/products.entity";
import { UserRoleEntity } from "../app/roles/entities/user-role.entity";

// ============ Views ================
import { UserInfoView } from "src/app/users/views/user-info.view";
import { createTables1680299249950 } from '../migrations/1680299249950-create-tables';
import { DmlMigration1680299371259 } from '../migrations/1680299371259-DmlMigration';

// ============ Migrations ================

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.POSTGRES_HOST}`,
  port: Number(process.env.POSTGRES_PORT),
  username: `${process.env.POSTGRES_USER}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: `${process.env.POSTGRES_DB}`,
  installExtensions: true,
  migrations: [createTables1680299249950, DmlMigration1680299371259],
  migrationsRun: true,
  entities: [UserEntity, UserInfoEntity, CartEntity, CategoryEntity, OrdersEntity, ProductsEntity,  UserRoleEntity, UserInfoView],

};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;


