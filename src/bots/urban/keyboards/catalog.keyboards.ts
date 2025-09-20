import { BUTTONS } from '../constants/buttons';
import { catalogService } from '../services';

export const catalogKeyboards = [
    {
        id: 'catalog-categories',
        resolve: () => {
            const categories = catalogService.listCategories();
            const buttons = categories.map((c) => [{ text: c.title }]);
            buttons.push([{ text: BUTTONS.mainMenu }]);
            return { keyboard: buttons, resize_keyboard: true };
        },
    },
    ...catalogService.listCategories().map((c) => ({
        id: `catalog-${c.id}`,
        resolve: () => {
            const products = catalogService.listProductsByCategory(c.id);
            const buttons = products.map((p) => [{ text: p.title }]);
            buttons.push([{ text: BUTTONS.backToCategories }]);
            buttons.push([{ text: BUTTONS.mainMenu }]);
            return { keyboard: buttons, resize_keyboard: true };
        },
    })),
];
