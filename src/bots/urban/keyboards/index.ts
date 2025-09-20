import { registrationKeyboards } from './registration.keyboards';
import { catalogKeyboards } from './catalog.keyboards';
import { productKeyboards } from './product.keyboards';
import { cartKeyboards } from './cart.keyboards';
import { profileKeyboards } from './profile.keyboards';
import { supportKeyboards } from './support.keyboards';
import { resetKeyboards } from './reset.keyboards';
import { commonKeyboards } from './common.keyboards';

export const keyboards = [
    ...registrationKeyboards,
    ...catalogKeyboards,
    ...productKeyboards,
    ...cartKeyboards,
    ...profileKeyboards,
    ...supportKeyboards,
    ...resetKeyboards,
    ...commonKeyboards,
];
