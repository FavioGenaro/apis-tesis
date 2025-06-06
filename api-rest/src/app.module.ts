import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { SeedModule } from './seed/seed.module';
import { CustomerModule } from './customer/customer.module';
import { PurchaseModule } from './purchase/purchase.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MetricsInterceptor } from './metrics/rest-metrics.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +!process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD, 
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.MODE == 'production' ? false : true,
    }),
    ProductsModule,
    SeedModule,
    CustomerModule,
    PurchaseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    }
  ],
})
export class AppModule {}
