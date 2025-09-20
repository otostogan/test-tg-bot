import { BUTTONS } from '../constants/buttons';

export const profileKeyboards = [
    {
        id: 'profile-overview',
        resolve: () => ({
            keyboard: [
                [{ text: BUTTONS.editProfile }],
                [{ text: BUTTONS.mainMenu }, { text: BUTTONS.reset }],
            ],
            resize_keyboard: true,
        }),
    },
    {
        id: 'address-update',
        resolve: () => ({
            keyboard: [[{ text: BUTTONS.mainMenu }]],
            resize_keyboard: true,
            one_time_keyboard: true,
        }),
    },
];
