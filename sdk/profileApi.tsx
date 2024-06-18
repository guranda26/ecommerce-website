
import { Customer, MyCustomerChangePassword, MyCustomerUpdate } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';


export const updateProfile = async (
    user: Customer,
    apiRoot: ByProjectKeyRequestBuilder,
) => {
    const customerData: MyCustomerUpdate = {
        version: user.version,
        actions: [
            {
                action: 'setFirstName',
                firstName: user.firstName
            },
            {
                action: 'setLastName',
                lastName: user.lastName,
            },
            {
                action: 'changeEmail',
                email: user.email
            },
            {
                action: 'setDateOfBirth',
                dateOfBirth: user.dateOfBirth
            },
            {
                action: "changeAddress",
                addressId: user.addresses[0].id,
                address: {
                    streetName: user.addresses[0].streetName,
                    postalCode: user.addresses[0].postalCode,
                    city: user.addresses[0].city,
                    country: user.addresses[0].country,
                }
            },
            {
                action: "changeAddress",
                addressId: user.addresses[1].id,
                address: {
                    streetName: user.addresses[1].streetName,
                    postalCode: user.addresses[1].postalCode,
                    city: user.addresses[1].city,
                    country: user.addresses[1].country,
                }
            }
        ]
    };

    try {
        const response = await apiRoot
            .me()
            .post({
                body: customerData
            })
            .execute();
        return response.body;

    } catch (error) {
        console.error('Error update:', error);
        throw error;
    }
}


export const updatePassword = async (
    user: Customer,
    password: {
        currentPassword: string;
        newPassword: string;
    },
    apiRoot: ByProjectKeyRequestBuilder,
) => {

    const customerData: MyCustomerChangePassword = {
        version: user.version,
        currentPassword: password.currentPassword,
        newPassword: password.newPassword
    };

    try {
        await apiRoot
            .me()
            .password()
            .post({
                body: customerData
            })
            .execute();
        return true;

    } catch (error) {
        console.error('Error update password :', error);
        return false;
    }
}

export const getUser = async (
    apiRoot: ByProjectKeyRequestBuilder,
) => {

    try {
        const response = await apiRoot
            .me()
            .get()
            .execute();
        return response.body;
    }
    catch (error) {
        console.error('Error fetching user data:', error);
    }
}