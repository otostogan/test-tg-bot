import { BUTTONS } from '../constants/buttons';
import { IBotBuilderContext } from 'tg-bot-builder';
import { isRegistrationCompleted } from '../utils/session';
import { IUrbanMarketSession } from '../types';

export const commonKeyboards = [
    {
        id: 'main-navigation',
        persistent: true,
        resolve: (ctx: IBotBuilderContext) => {
            const session = ctx.session as IUrbanMarketSession | undefined;
            if (!isRegistrationCompleted(session)) return undefined;

            return {
                keyboard: [
                    [{ text: BUTTONS.viewCatalog }, { text: BUTTONS.viewCart }],
                    [{ text: BUTTONS.viewProfile }, { text: BUTTONS.support }],
                    [{ text: BUTTONS.reset }],
                ],
                resize_keyboard: true,
            };
        },
    },
];
