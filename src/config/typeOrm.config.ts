import { DataSource, DataSourceOptions } from "typeorm";
import { UserEntity } from "../app/users/entities/users.entity";
import { config } from "dotenv";
import { UserInfoEntity } from "../app/users/entities/user-info.entity";
import { CartEntity } from "../app/cart/entities/cart.entity";
import { CategoryEntity } from "../app/categories/entities/category.entity";
import { OrdersEntity } from "../app/orders/entities/orders.entity";
import { ProductsEntity } from "../app/products/entities/products.entity";
import { UserRoleEntity } from "../app/roles/entities/user-role.entity";
import {createTables1678974868027} from "../migrations/1678974868027-create-tables";
import {DmlMigration1679006037816} from "../migrations/1679006037816-DmlMigration";
import { UserInfoView } from "src/app/users/views/user-info.view";

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.POSTGRES_HOST}`,
  port: Number(process.env.POSTGRES_PORT),
  username: `${process.env.POSTGRES_USER}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: `${process.env.POSTGRES_DB}`,
  synchronize: true,
  installExtensions: true,
  migrations: [createTables1678974868027,DmlMigration1679006037816],
  entities: [UserEntity, UserInfoEntity, CartEntity, CategoryEntity, OrdersEntity, ProductsEntity,  UserRoleEntity, UserInfoView],

};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;


