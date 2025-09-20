import { BUTTONS } from '../constants/buttons';
import { catalogService } from '../services';

export const productKeyboards = catalogService.listCategories().flatMap((c) =>
    catalogService.listProductsByCategory(c.id).map((p) => ({
        id: `product-${p.id}`,
        resolve: () => ({
            keyboard: [
                [{ text: BUTTONS.addToCart }],
                [
                    { text: BUTTONS.backToCategory },
                    { text: BUTTONS.backToCategories },
                ],
                [{ text: BUTTONS.openCart }, { text: BUTTONS.mainMenu }],
            ],
            resize_keyboard: true,
        }),
    })),
);
