import React from 'react';
// README this is because I don't know how to typescript validationSchema

const useYupValidationResolver = validationSchema =>
    React.useCallback(
        async data => {
            try {
                const values = await validationSchema.validate(data, {
                    abortEarly: false,
                });

                return {
                    values,
                    errors: {},
                };
            } catch (errors) {
                return {
                    values: {},
                    errors: errors.inner.reduce(
                        (allErrors, currentError) => ({
                            ...allErrors,
                            [currentError.path]: {
                                type: currentError.type ?? 'validation',
                                message: currentError.message,
                            },
                        }),
                        {}
                    ),
                };
            }
        },
        [validationSchema]
    );

export { useYupValidationResolver };
