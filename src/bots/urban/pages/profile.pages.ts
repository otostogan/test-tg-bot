import { IBotPage } from 'tg-bot-builder';
import { BUTTONS } from '../constants/buttons';
import { ensureSession } from '../utils/session';
import { formatProfileSummary } from '../utils/format';

export const profilePages: IBotPage[] = [
    {
        id: 'profile-overview',
        content: (ctx) => {
            const session = ensureSession(ctx);
            const summary = formatProfileSummary(session.profile ?? {});
            return { text: `👤 Профиль:\n${summary}` };
        },
        validate: (val) =>
            typeof val === 'string' &&
            [BUTTONS.mainMenu, BUTTONS.editProfile, BUTTONS.reset].includes(
                val.trim(),
            ),
        next: (ctx) => {
            const answer = String(
                ctx.session?.['profile-overview'] ?? '',
            ).trim();
            if (answer === BUTTONS.editProfile) return 'address-update';
            if (answer === BUTTONS.reset) return 'reset-confirm';
            return 'main-menu';
        },
        middlewares: ['require-registration'],
    },
    {
        id: 'address-update',
        content: '✏️ Напишите новый адрес доставки.',
        validate: (val) => typeof val === 'string' && val.trim().length > 10,
        onValid: (ctx) => {
            const session = ensureSession(ctx);
            const value = String(ctx.session?.['address-update'] ?? '').trim();
            const profile = session.profile ?? {};
            profile.address = value;
            session.profile = profile;
            session.address = value;
        },
        next: () => 'profile-overview',
        middlewares: ['require-registration'],
    },
];
