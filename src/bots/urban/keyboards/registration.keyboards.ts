import { BUTTONS } from '../constants/buttons';

export const registrationKeyboards = [
    {
        id: 'phone',
        resolve: () => ({
            keyboard: [
                [{ text: '📱 Поделиться контактом', request_contact: true }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        }),
    },
    {
        id: 'registration-summary',
        resolve: () => ({
            keyboard: [
                [{ text: BUTTONS.openCatalog }],
                [{ text: BUTTONS.editProfile }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        }),
    },
];
