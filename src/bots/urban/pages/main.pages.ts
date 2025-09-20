import { IBotPage } from 'tg-bot-builder';
import { BUTTONS } from '../constants/buttons';
import { ensureSession } from '../utils/session';

export const mainPages: IBotPage[] = [
    {
        id: 'main-menu',
        content: (ctx) => {
            const session = ensureSession(ctx);
            const profile = session.profile ?? {};
            const name = profile.firstName ?? 'друг';

            const cartSize = session.cart?.length ?? 0;
            const cartLine =
                cartSize > 0
                    ? `🧺 В корзине ${cartSize} позици${cartSize === 1 ? 'я' : 'и'}.`
                    : '';

            return {
                text: [
                    `🌱 Снова рады вас видеть, ${name}!`,
                    'Выберите раздел, с которого хотите начать.',
                    cartLine,
                ]
                    .filter(Boolean)
                    .join('\n\n'),
            };
        },
        validate: (val) =>
            typeof val === 'string' &&
            [
                BUTTONS.viewCatalog,
                BUTTONS.viewProfile,
                BUTTONS.viewCart,
                BUTTONS.support,
                BUTTONS.reset,
            ].includes(val.trim()),
        onValid: (ctx) => {
            const session = ensureSession(ctx);
            const answer = String(ctx.session?.['main-menu'] ?? '').trim();

            if (answer === BUTTONS.reset) {
                session.lastOrderNumber = undefined;
            }
        },
        next: (ctx) => {
            const answer = String(ctx.session?.['main-menu'] ?? '').trim();
            switch (answer) {
                case BUTTONS.viewCatalog:
                    return 'catalog-categories';
                case BUTTONS.viewProfile:
                    return 'profile-overview';
                case BUTTONS.viewCart:
                    return 'cart-overview';
                case BUTTONS.support:
                    return 'support';
                case BUTTONS.reset:
                    return 'reset-confirm';
                default:
                    return 'main-menu';
            }
        },
        middlewares: ['require-registration'],
    },
];
