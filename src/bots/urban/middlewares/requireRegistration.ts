import { IBotPageMiddlewareConfig } from 'tg-bot-builder';
import { isRegistrationCompleted } from '../utils/session';
import { IUrbanMarketSession } from '../types';

export const requireRegistrationMiddleware: IBotPageMiddlewareConfig = {
    name: 'require-registration',
    priority: 100,
    handler: (context) => {
        const session = context.session as IUrbanMarketSession | undefined;
        if (!isRegistrationCompleted(session)) {
            return {
                allow: false,
                message:
                    'Мы ещё не познакомились. Пожалуйста, пройдите регистрацию.',
            };
        }
        return { allow: true };
    },
};
