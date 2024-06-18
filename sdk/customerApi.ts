import { CustomerSignInResult, MyCustomerDraft } from '@commercetools/platform-sdk';
import { CustomerData } from '../src/Interfaces/CustomerInterface';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export const createCustomer = async (
  customerData: CustomerData,
  apiRoot:ByProjectKeyRequestBuilder
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

  let customerDraft: MyCustomerDraft = {
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


  try {
    const response = await apiRoot
      .me()
      .signup()
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


