import { IBotPage } from 'tg-bot-builder';
import { BUTTONS } from '../constants/buttons';
import { ensureSession } from '../utils/session';
import { catalogService } from '../services';

export const cartPages: IBotPage[] = [
    {
        id: 'cart-overview',
        content: (ctx) => {
            const session = ensureSession(ctx);
            const cart = session.cart ?? [];
            if (cart.length === 0) {
                return { text: '🧺 Корзина пуста.' };
            }
            const items = cart
                .map((id, i) => {
                    const p = catalogService.getProduct(id);
                    return p ? `${i + 1}. ${p.title} — ${p.price} ₽` : null;
                })
                .filter(Boolean);
            const total = cart.reduce(
                (sum, id) => sum + (catalogService.getProduct(id)?.price ?? 0),
                0,
            );
            return {
                text: ['🧺 В корзине:', ...items, `Итого: ${total} ₽`].join(
                    '\n',
                ),
            };
        },
        validate: (val) =>
            typeof val === 'string' &&
            [BUTTONS.mainMenu, BUTTONS.clearCart, BUTTONS.checkout].includes(
                val.trim(),
            ),
        onValid: (ctx) => {
            const session = ensureSession(ctx);
            const answer = String(ctx.session?.['cart-overview'] ?? '').trim();
            if (answer === BUTTONS.clearCart) session.cart = [];
            if (
                answer === BUTTONS.checkout &&
                (!session.cart || session.cart.length === 0)
            ) {
                ctx.bot.sendMessage(ctx.chatId, 'Корзина пуста.');
            }
        },
        next: (ctx) => {
            const answer = String(ctx.session?.['cart-overview'] ?? '').trim();
            if (answer === BUTTONS.checkout) return 'order-confirmation';
            return 'main-menu';
        },
        middlewares: ['require-registration'],
    },
    {
        id: 'order-confirmation',
        content: (ctx) => {
            const session = ensureSession(ctx);
            const orderNumber = `UG-${Date.now().toString().slice(-6)}`;
            session.lastOrderNumber = orderNumber;
            session.cart = [];
            return {
                text: `🎉 Заказ оформлен!\nНомер: *${orderNumber}*`,
                options: { parse_mode: 'Markdown' },
            };
        },
        validate: (val) =>
            typeof val === 'string' &&
            [BUTTONS.mainMenu, BUTTONS.viewCatalog].includes(val.trim()),
        next: (ctx) => {
            const answer = String(
                ctx.session?.['order-confirmation'] ?? '',
            ).trim();
            return answer === BUTTONS.viewCatalog
                ? 'catalog-categories'
                : 'main-menu';
        },
        middlewares: ['require-registration'],
    },
];
