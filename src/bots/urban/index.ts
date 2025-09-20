import { IBotBuilderOptions } from 'tg-bot-builder';
import { requireRegistrationMiddleware } from './middlewares/requireRegistration';
import {
    mainPages,
    registrationPages,
    catalogPages,
    productPages,
    profilePages,
    cartPages,
    supportPages,
    resetPages,
} from './pages';
import { keyboards } from './keyboards';
import { catalogService } from './services/';

export interface ICreateUrbanMarketBotOptions
    extends Partial<Omit<IBotBuilderOptions, 'TG_BOT_TOKEN'>> {}

export const createUrbanMarketBot = (
    token: string,
    options: ICreateUrbanMarketBotOptions = {},
): IBotBuilderOptions => {
    const {
        services,
        pageMiddlewares,
        pages,
        keyboards: overrideKeyboards,
        ...rest
    } = options;

    return {
        TG_BOT_TOKEN: token,
        id: rest.id ?? 'urban-market-dev',
        slug: rest.slug ?? 'urban-market-dev',
        initialPageId: rest.initialPageId ?? 'first-name',

        services: {
            catalog: catalogService,
            ...(services ?? {}),
        },

        pageMiddlewares: pageMiddlewares ?? [requireRegistrationMiddleware],

        pages: [
            ...registrationPages,
            ...mainPages,
            ...catalogPages,
            ...productPages,
            ...profilePages,
            ...cartPages,
            ...supportPages,
            ...resetPages,
            ...(pages ?? []),
        ],

        keyboards: overrideKeyboards ?? keyboards,

        ...rest,
    };
};
