export const authValidationsBasic = {
    validations: {
        email: {
            pattern: {
                // eslint-disable-next-line
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Please provide your email.'
            }
        },
        password: {
            pattern: {
                // eslint-disable-next-line
                value: /^(?=.*[A-Za-z])(?=.*\d){8,}/,
                message: 'Please provide your password, must be at least 8 characters long & 1 letter'
            }
        }
    }
};

export const EmailValidation = {
    validations: {
        email: {
            pattern: {
                // eslint-disable-next-line
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Please provide your email.'
            }
        }
    }
};

/* recovery validation */

export const recoveryPasswordValidation = {
    validations: {
        link: {
            custom: {
                isValid: ({ link }: { link: string }) => {
                    return link?.trim().length > 0;
                },
                message: 'Please provide the link sent to your email'
            }
        },
        ...authValidationsBasic.validations.password
    }
};
