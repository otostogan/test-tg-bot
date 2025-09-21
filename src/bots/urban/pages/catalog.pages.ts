import { IBotPage } from 'tg-bot-builder';
import { BUTTONS } from '../constants/buttons';
import { catalogService } from '../services';

export const catalogPages: IBotPage[] = [
    {
        id: 'catalog-categories',
        content: () => {
            const categories = catalogService.listCategories();
            const lines = categories.map(
                (c) => `${c.mood ?? '•'} *${c.title}* — ${c.description}`,
            );
            return {
                text: ['🏬 Категории каталога:', '', ...lines].join('\n'),
                options: { parse_mode: 'Markdown' },
            };
        },
        validate: (val) => {
            if (typeof val !== 'string')
                return {
                    valid: false,
                };
            const normalized = val.trim();
            if (normalized === BUTTONS.mainMenu)
                return {
                    valid: true,
                };
            const valid = catalogService
                .listCategories()
                .some((c) => c.title === normalized);
            return {
                valid,
            };
        },
        next: (ctx) => {
            const answer = String(
                ctx.session?.['catalog-categories'] ?? '',
            ).trim();
            if (answer === BUTTONS.mainMenu) return 'main-menu';
            const category = catalogService
                .listCategories()
                .find((c) => c.title === answer);
            return category ? `catalog-${category.id}` : 'catalog-categories';
        },
        middlewares: ['require-registration'],
    },
    ...catalogService.listCategories().map((category) => ({
        id: `catalog-${category.id}`,
        content: () => {
            const products = catalogService.listProductsByCategory(category.id);
            const lines = products.map((p) => `• ${p.title} — ${p.price} ₽`);
            return {
                text: [
                    `${category.mood ?? ''} ${category.title}:`,
                    ...lines,
                ].join('\n'),
            };
        },
        validate: (val) => {
            if (typeof val !== 'string')
                return {
                    valid: false,
                };
            const normalized = val.trim();
            if (
                [BUTTONS.mainMenu, BUTTONS.backToCategories].includes(
                    normalized,
                )
            ) {
                return {
                    valid: true,
                };
            }

            const valid = catalogService
                .listProductsByCategory(category.id)
                .some((p) => p.title === normalized);

            return {
                valid,
            };
        },
        next: (ctx) => {
            const answer = String(
                ctx.session?.[`catalog-${category.id}`] ?? '',
            ).trim();
            if (answer === BUTTONS.mainMenu) return 'main-menu';
            if (answer === BUTTONS.backToCategories)
                return 'catalog-categories';
            const product = catalogService
                .listProductsByCategory(category.id)
                .find((p) => p.title === answer);
            return product ? `product-${product.id}` : `catalog-${category.id}`;
        },
        middlewares: ['require-registration'],
    })),
];
