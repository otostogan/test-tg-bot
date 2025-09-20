import { IBotPage } from 'tg-bot-builder';
import { BUTTONS } from '../constants/buttons';
import { catalogService } from '../services';
import { ensureSession } from '../utils/session';

export const productPages: IBotPage[] = catalogService
    .listCategories()
    .flatMap((cat) =>
        catalogService.listProductsByCategory(cat.id).map(
            (p): IBotPage => ({
                id: `product-${p.id}`,
                content: () => ({
                    text: catalogService.formatProductCard(p),
                    options: { parse_mode: 'Markdown' },
                }),
                validate: (val) =>
                    typeof val === 'string' &&
                    [
                        BUTTONS.addToCart,
                        BUTTONS.backToCategory,
                        BUTTONS.backToCategories,
                        BUTTONS.mainMenu,
                        BUTTONS.openCart,
                    ].includes(val.trim()),
                onValid: (ctx) => {
                    const session = ensureSession(ctx);
                    const answer = String(
                        ctx.session?.[`product-${p.id}`] ?? '',
                    ).trim();
                    if (answer === BUTTONS.addToCart) {
                        session.cart = session.cart ?? [];
                        session.cart.push(p.id);
                    }
                },
                next: (ctx) => {
                    const answer = String(
                        ctx.session?.[`product-${p.id}`] ?? '',
                    ).trim();
                    if (answer === BUTTONS.backToCategory)
                        return `catalog-${p.categoryId}`;
                    if (answer === BUTTONS.backToCategories)
                        return 'catalog-categories';
                    if (answer === BUTTONS.openCart) return 'cart-overview';
                    return 'main-menu';
                },
                middlewares: ['require-registration'],
            }),
        ),
    );
