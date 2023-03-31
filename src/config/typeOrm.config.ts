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

// ============ Migrations ================
import { createTables1680255641500 } from '../migrations/1680255641500-create-tables';
import { DmlMigration1680255968306 } from '../migrations/1680255968306-DmlMigration';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.POSTGRES_HOST}`,
  port: Number(process.env.POSTGRES_PORT),
  username: `${process.env.POSTGRES_USER}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: `${process.env.POSTGRES_DB}`,
  installExtensions: true,
  migrations: [createTables1680255641500, DmlMigration1680255968306],
  migrationsRun: true,
  entities: [UserEntity, UserInfoEntity, CartEntity, CategoryEntity, OrdersEntity, ProductsEntity,  UserRoleEntity, UserInfoView],

};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;


