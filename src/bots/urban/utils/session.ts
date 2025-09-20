import { IBotBuilderContext } from 'tg-bot-builder';
import { IUrbanMarketSession, IUrbanMarketProfile } from '../types';

export const ensureSession = (
    context: IBotBuilderContext,
): IUrbanMarketSession => {
    if (!context.session) {
        context.session = {};
    }
    return context.session as IUrbanMarketSession;
};

export const getProfile = (
    context: IBotBuilderContext,
): IUrbanMarketProfile => {
    const session = ensureSession(context);
    session.profile = session.profile ?? {};
    return session.profile;
};

export const isRegistrationCompleted = (
    session?: IUrbanMarketSession,
): boolean => Boolean(session?.registration?.completed);
