const trimFields = (user:any) => ({
    ...user,
    name:user.name.trim(),
    email:user.email.trim(),
    number:user.number.trim(),
});

const normalizeEmail = (user:any) =>({
    ...user,
    email:user.email.toLowerCase(),
});

const compose = (...fn: Function[]) => (args: any) => fn.reduce((acc, fn) => fn(acc), args);

export const processUserInput=compose(trimFields, normalizeEmail);