import { IBotSessionState } from 'tg-bot-builder';

export type TContactValue = {
    phone_number?: string;
    first_name?: string;
    last_name?: string;
};

export interface IUrbanMarketProfile {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
}

export interface IUrbanMarketRegistrationState {
    completed?: boolean;
    registeredAt?: string;
}

export interface IUrbanMarketSession extends IBotSessionState {
    profile?: IUrbanMarketProfile;
    registration?: IUrbanMarketRegistrationState;
    cart?: string[];
    lastOrderNumber?: string;
}

export interface ICategory {
    id: string;
    title: string;
    description: string;
    mood?: string;
}

export interface IProduct {
    id: string;
    categoryId: string;
    title: string;
    description: string;
    price: number;
    tastingNotes: string[];
}
