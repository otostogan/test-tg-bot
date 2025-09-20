import { Module } from '@nestjs/common';
import { BotBuilder } from 'tg-bot-builder';
import { ConfigModule, ConfigService } from '@nestjs/config';
import process from 'node:process';
import { LogModule } from 'otostogan-nest-logger';
import { createUrbanMarketBot } from './bots/urban';
import { DbService } from './db/db.service';
import { DbModule } from './db/db.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true,
        }),
        BotBuilder.forRootAsync({
            inject: [ConfigService, DbService],
            imports: [ConfigModule, DbModule],
            useFactory: (configService: ConfigService, prisma: DbService) => {
                const token = configService.get<string>('TG_BOT_TOKEN');
                if (!token) {
                    throw new Error(
                        'TG_BOT_TOKEN is not configured for the dev bot.',
                    );
                }

                return [
                    createUrbanMarketBot(token, {
                        prisma,
                    }),
                ];
            },
        }),
        LogModule.forRootAsync({
            useFactory: () => ({
                APP_NAME: 'BotBuilder',
                LOG_PATH: `${process.cwd()}/publisher`,
            }),
        }),
    ],
})
export class AppModule {}
