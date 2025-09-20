import { IBotPage } from 'tg-bot-builder';
import { validation } from '../validation/schemas';
import { getProfile, ensureSession } from '../utils/session';
import { formatProfileSummary } from '../utils/format';
import { BUTTONS } from '../constants/buttons';
import { MESSAGES } from '../constants/messages';

export const registrationPages: IBotPage[] = [
    {
        id: 'first-name',
        content: MESSAGES.registration.askFirstName,
        yup: validation.firstName,
        onValid: (ctx) => {
            getProfile(ctx).firstName = String(
                ctx.session?.['first-name'],
            ).trim();
        },
        next: () => 'last-name',
    },
    {
        id: 'last-name',
        content: MESSAGES.registration.askLastName,
        yup: validation.lastName,
        onValid: (ctx) => {
            getProfile(ctx).lastName = String(
                ctx.session?.['last-name'],
            ).trim();
        },
        next: () => 'email',
    },
    {
        id: 'email',
        content: MESSAGES.registration.askEmail,
        yup: validation.email,
        onValid: (ctx) => {
            getProfile(ctx).email = String(ctx.session?.email ?? '').trim();
        },
        next: () => 'phone',
    },
    {
        id: 'phone',
        content: MESSAGES.registration.askPhone,
        validate: (value) => {
            if (typeof value === 'string') {
                return /^\+?\d[\d\s\-()]{7,}$/.test(value.trim());
            }
            if (value && typeof value === 'object' && 'phone_number' in value) {
                return true;
            }
            return false;
        },
        onValid: (ctx) => {
            const profile = getProfile(ctx);
            profile.phone = String(ctx.session?.phone ?? '').trim();
        },
        next: () => 'address',
    },
    {
        id: 'address',
        content: MESSAGES.registration.askAddress,
        yup: validation.address,
        onValid: (ctx) => {
            getProfile(ctx).address = String(ctx.session?.address ?? '').trim();
        },
        next: () => 'registration-summary',
    },
    {
        id: 'registration-summary',
        content: (ctx) => {
            const session = ensureSession(ctx);
            const profile = getProfile(ctx);
            const summary = formatProfileSummary(profile);
            const greeting = profile.firstName
                ? `Спасибо, ${profile.firstName}!`
                : 'Спасибо за ответы!';

            return {
                text: [
                    MESSAGES.registration.summary,
                    greeting,
                    '',
                    summary,
                    '',
                    'Выберите, что сделать дальше.',
                ].join('\n'),
                options: { parse_mode: 'Markdown' },
            };
        },
        validate: (val) =>
            typeof val === 'string' &&
            [BUTTONS.openCatalog, BUTTONS.editProfile].includes(val.trim()),
        onValid: (ctx) => {
            const session = ensureSession(ctx);
            const answer = String(
                ctx.session?.['registration-summary'] ?? '',
            ).trim();

            if (answer === BUTTONS.openCatalog) {
                session.registration = {
                    completed: true,
                    registeredAt: new Date().toISOString(),
                };
            }
            if (answer === BUTTONS.editProfile) {
                session.registration = { completed: false };
                session.cart = [];
                session.profile = {};
            }
        },
        next: (ctx) => {
            const answer = String(
                ctx.session?.['registration-summary'] ?? '',
            ).trim();
            return answer === BUTTONS.editProfile ? 'first-name' : 'main-menu';
        },
    },
];
