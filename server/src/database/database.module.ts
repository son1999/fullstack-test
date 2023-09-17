import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import containt from '../configs/containt';
dotenv.config();

import { parse } from 'pg-connection-string';
const config = parse(process.env.DATABASE_URL);

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: config.host,
            port: parseInt(config.port, containt.PORT_FIXED) || containt.PORT,
            username: config.user,
            password: config.password,
            database: config.database,
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            // synchronize: true,
            ssl: {
                rejectUnauthorized: false,
            },
        }),
    ],
})
export class DatabaseModule { }