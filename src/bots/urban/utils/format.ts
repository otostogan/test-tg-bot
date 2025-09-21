import { IUrbanMarketProfile } from '../types';

export const formatProfileSummary = (profile: IUrbanMarketProfile): string => {
    return [
        `Имя: ${profile.firstName ?? '—'}`,
        `Фамилия: ${profile.lastName ?? '—'}`,
        `Телефон: ${profile.phone ?? '—'}`,
        `Почта: ${profile.email ?? '—'}`,
        `Адрес доставки: ${profile.address ?? '—'}`,
    ].join('\n');
};

export const normalizePhoneValue = (value: unknown): string | undefined => {
    if (!value) return undefined;
    if (typeof value === 'string') return value.trim();

    if (
        typeof value === 'object' &&
        value !== null &&
        'phone_number' in value
    ) {
        return (value as { phone_number: string }).phone_number.trim();
    }
};
