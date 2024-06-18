import { LoginFormErrors } from '../src/Interfaces/loginInterface';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { clientWithPassword } from './createClient';

export const authenticateUser = async (
    email: string,
    password: string,
    setErrors: (errors: LoginFormErrors) => void,
    apiRoot: ByProjectKeyRequestBuilder,
    setApiRoot: (newApiRoot: ByProjectKeyRequestBuilder) => void,
) => {
    try {
        const response = await apiRoot
            .me()
            .login()
            .post({
                body: {
                    email,
                    password,
                },
            })
            .execute();

        if (response.statusCode === 200) {
            const newApiRoot = clientWithPassword(email, password);
            setApiRoot(newApiRoot);
            return true;
        } else {
            setErrors({
                submit: 'Login failed. Please check your email and password.',
            });
            return false;
        }
    } catch (error) {
        console.error(error);
        setErrors({
            submit: 'Login failed. Please check your email and password.',
        });
        return false;
    }
};