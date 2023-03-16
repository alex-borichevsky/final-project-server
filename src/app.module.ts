import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

// ============ App ================
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { RolesModule } from './app/roles/roles.module';
import { ProductsModule } from './app/products/products.module';
import { OrdersModule } from './app/orders/orders.module';
import { CategoriesModule } from './app/categories/categories.module';
import { CartModule } from './app/cart/cart.module';
import { dataSourceOptions } from "./config/typeOrm.config";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as path from "path";
import { AcceptLanguageResolver, I18nModule, QueryResolver } from "nestjs-i18n";


@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'ru',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'app/static')
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    RolesModule,
    ProductsModule,
    OrdersModule,
    CategoriesModule,
    CartModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
