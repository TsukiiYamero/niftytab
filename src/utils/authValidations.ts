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
                message: 'Please provide your password, must be at least 8 characters long'
            }
        }
    }
};
