import { BUTTONS } from '../constants/buttons';
import { IBotBuilderContext } from 'tg-bot-builder';
import { ensureSession } from '../utils/session';

export const cartKeyboards = [
    {
        id: 'cart-overview',
        resolve: (ctx: IBotBuilderContext) => {
            const session = ensureSession(ctx);
            const cartEmpty = !session.cart || session.cart.length === 0;

            const keyboard = [[{ text: BUTTONS.mainMenu }]];

            if (!cartEmpty) {
                keyboard.unshift([{ text: BUTTONS.checkout }]);
                keyboard.splice(1, 0, [{ text: BUTTONS.clearCart }]);
            }

            return { keyboard, resize_keyboard: true };
        },
    },
    {
        id: 'order-confirmation',
        resolve: () => ({
            keyboard: [
                [{ text: BUTTONS.viewCatalog }],
                [{ text: BUTTONS.mainMenu }],
            ],
            resize_keyboard: true,
        }),
    },
];
