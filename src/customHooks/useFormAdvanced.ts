import { ChangeEvent, useEffect, useState } from 'react';

type ErrorRecord<T> = Partial<Record<keyof T, string>>;

interface Validation {
    required?: {
        value: boolean;
        message: string;
    };
    pattern?: {
        value: RegExp;
        message: string;
    };
    custom?: {
        isValid: (value: any) => boolean;
        message: string;
    };
}

type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

export const useFormAdvanced = <T extends Record<keyof T, any> = {}>(options: {
    validations?: Validations<T>;
    initialValues?: Partial<T>;
    onSubmit?: () => void;
}) => {
    const [data, setData] = useState(options?.initialValues);
    const [errors, setErrors] = useState<ErrorRecord<T>>({});
    const [isValid, setIsValid] = useState(false);
    const [pristine, setPristine] = useState(true);

    const handleChange =
        <S extends unknown>(key: keyof T, sanitizeFn: (value: string) => S) =>
            (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
                const value = sanitizeFn
                    ? sanitizeFn(e.target.value)
                    : e.target.value;
                setData({
                    ...data,
                    [key]: value
                });
            };

    const handelSetData = <T extends Record<keyof T, any> = {}>(data: Partial<T>) => {
        if (!data) return;

        setData(data);
        setPristine(false);
    };

    useEffect(() => {
        const validations = options?.validations;

        if (validations) {
            let valid = true;
            const newErrors: any = {};

            for (const key in validations) {
                const value = data?.[key];
                const validation = validations[key];
                if (validation?.required?.value && !value) {
                    valid = false;
                    newErrors[key] = validation?.required?.message;
                }

                const pattern = validation?.pattern;
                if (pattern?.value && !RegExp(pattern.value).test(value ?? '')) {
                    valid = false;
                    newErrors[key] = pattern.message;
                }

                const custom = validation?.custom;
                if (custom?.isValid && !custom.isValid(data)) {
                    valid = false;
                    newErrors[key] = custom.message;
                }
            }

            if (!valid) {
                setErrors(newErrors);
                setIsValid(false);
                return;
            }

            setIsValid(true);
        }
        setErrors({});
    }, [data, options.validations]);

    return {
        data,
        errors,
        isValid,
        pristine,
        handleChange,
        handelSetData,
        setErrors
    };
};
