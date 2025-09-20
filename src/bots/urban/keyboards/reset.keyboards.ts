import { BUTTONS } from '../constants/buttons';

export const resetKeyboards = [
    {
        id: 'reset-confirm',
        resolve: () => ({
            keyboard: [
                [{ text: BUTTONS.confirmReset }],
                [{ text: BUTTONS.cancelReset }],
            ],
            resize_keyboard: true,
        }),
    },
];
