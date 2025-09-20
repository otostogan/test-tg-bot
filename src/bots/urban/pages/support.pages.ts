import { IBotPage } from 'tg-bot-builder';
import { BUTTONS } from '../constants/buttons';

export const supportPages: IBotPage[] = [
    {
        id: 'support',
        content: () => ({
            text: [
                '🛟 Поддержка Urban Greenhouse',
                'Мы на связи ежедневно с 10:00 до 22:00.',
                'Телефон: +7 (999) 777-45-45',
            ].join('\n'),
        }),
        validate: (val) =>
            typeof val === 'string' &&
            [BUTTONS.mainMenu, BUTTONS.viewCatalog].includes(val.trim()),
        next: (ctx) => {
            const answer = String(ctx.session?.support ?? '').trim();
            return answer === BUTTONS.viewCatalog
                ? 'catalog-categories'
                : 'main-menu';
        },
        middlewares: ['require-registration'],
    },
];
