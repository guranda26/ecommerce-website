import { CustomerSignInResult } from '@commercetools/platform-sdk';
import { CustomerData } from '../src/Interfaces/CustomerInterface';
import { apiRoot } from '../sdk/client';
import { CustomerDraft } from '@commercetools/platform-sdk';

export const createCustomer = async (
  customerData: CustomerData
): Promise<CustomerSignInResult> => {
  const {
    firstName,
    lastName,
    email,
    password,
    countryCode,
    dateOfBirth,
    billingAddress,
    shippingAddress,
    setAsDefaultAddress,
    useSameAddress,
  } = customerData;

  const billingAddr = {
    country: countryCode,
    streetName: billingAddress.streetName,
    city: billingAddress.city,
    postalCode: billingAddress.postalCode,
  };

  const shippingAddr = useSameAddress
    ? billingAddr
    : {
        country: countryCode,
        streetName: shippingAddress.streetName,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
      };

  let customerDraft: CustomerDraft = {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    addresses: [billingAddr, shippingAddr],
  };

  if (setAsDefaultAddress) {
    customerDraft = {
      ...customerDraft,
      defaultShippingAddress: 1,
      defaultBillingAddress: 0,
    };
  }

  const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;

  try {
    const response = await apiRoot()
      .withProjectKey({ projectKey })
      .customers()
      .post({
        body: customerDraft,
      })
      .execute();

    return response.body;
  } catch (error) {
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(`Failed to create customer: ${errorMessage}`);
  }
};
