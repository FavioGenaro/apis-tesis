import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CustomerModule } from './customer/customer.module';
import { PurchaseModule } from './purchase/purchase.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault }  from '@apollo/server/plugin/landingPage/default';
import { graphqlTracingPlugin } from './graphql-tracing.plugin';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLMetricsInterceptor } from './graphql-metrics.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join( process.cwd(), 'src/schema.gql'), 
      plugins: [
        graphqlTracingPlugin(),
        ApolloServerPluginLandingPageLocalDefault(),
      ]
    }),

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
    CustomerModule, 
    PurchaseModule
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: GraphQLMetricsInterceptor,
    // },
  ],
})
export class AppModule {}
