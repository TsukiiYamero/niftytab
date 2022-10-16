type SignUpForm = { email: string, password: string, passwordRepeat: string }

export const authValidations = {
    validations: {
        email: {
            pattern: {
                // eslint-disable-next-line
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Please enter a valid email address.'
            }
        },
        password: {
            pattern: {
                // eslint-disable-next-line
                value: /^(?=.*[A-Za-z])(?=.*\d){8,}/,
                message: 'Password must be at least 8 characters long & contain one letter & one number'
            }
        },
        passwordRepeat: {
            custom: {
                isValid: (value: SignUpForm) => value.password === value.passwordRepeat,
                message: 'Both password should be the same.'
            }
        }
    }
};

export const authValidationsBasic = {
    validations: {
        email: {
            pattern: {
                // eslint-disable-next-line
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Please enter a valid email address.'
            }
        },
        password: {
            pattern: {
                // eslint-disable-next-line
                value: /^(?=.*[A-Za-z])(?=.*\d){8,}/,
                message: 'Password must be at least 8 characters long & contain one letter & one number'
            }
        }
    }
};
