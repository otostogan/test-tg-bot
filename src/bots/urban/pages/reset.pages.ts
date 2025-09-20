import { IBotPage } from 'tg-bot-builder';
import { BUTTONS } from '../constants/buttons';
import { ensureSession } from '../utils/session';

export const resetPages: IBotPage[] = [
    {
        id: 'reset-confirm',
        content: '⚠️ Уверены, что хотите стереть профиль и начать заново?',
        validate: (val) =>
            typeof val === 'string' &&
            [BUTTONS.confirmReset, BUTTONS.cancelReset].includes(val.trim()),
        onValid: (ctx) => {
            const session = ensureSession(ctx);
            const answer = String(ctx.session?.['reset-confirm'] ?? '').trim();
            if (answer === BUTTONS.confirmReset) {
                session.profile = {};
                session.registration = { completed: false };
                session.cart = [];
            }
        },
        next: (ctx) => {
            const answer = String(ctx.session?.['reset-confirm'] ?? '').trim();
            return answer === BUTTONS.confirmReset ? 'first-name' : 'main-menu';
        },
        middlewares: ['require-registration'],
    },
];
