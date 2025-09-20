import { BUTTONS } from '../constants/buttons';

export const supportKeyboards = [
    {
        id: 'support',
        resolve: () => ({
            keyboard: [
                [{ text: BUTTONS.viewCatalog }],
                [{ text: BUTTONS.mainMenu }],
            ],
            resize_keyboard: true,
        }),
    },
];
