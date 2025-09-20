import * as yup from 'yup';

export const validation = {
    firstName: yup.string().trim().min(2).max(30).required(),
    lastName: yup.string().trim().min(2).max(40).required(),
    email: yup.string().trim().email().required(),
    address: yup.string().trim().min(10).required(),
};
