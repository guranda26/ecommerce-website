import {
  CustomerData,
  CustomerResponse,
  ICustomer,
} from '../src/Interfaces/CustomerInterface';
import { apiRoot } from '../sdk/client';
import { CustomerDraft } from '@commercetools/platform-sdk';

export const getCustomerById = async (
  customerId: string
): Promise<ICustomer> => {
  const response = await apiRoot
    .customers()
    .withId({ ID: customerId })
    .get()
    .execute();
  const customer = response.body as ICustomer;
  if (
    customer.firstName === undefined ||
    customer.lastName === undefined ||
    customer.email === undefined
  ) {
    throw new Error('Customer data is incomplete');
  }
  return customer;
};

export const getCustomerByKey = (key: string) => {
  return apiRoot.customers().withKey({ key: key }).get().execute();
};

type CustomerPostRequest<T extends CustomerDraft> = {
  body: T;
  execute(): Promise<CustomerResponse>;
};

type CustomersAPI = {
  post<T extends CustomerDraft>(
    request: CustomerPostRequest<T>
  ): CustomerPostRequest<T>;
};

export type ApiRoot = {
  customers(): CustomersAPI;
};

export const createCustomer = async (
  apiRoot: ApiRoot,
  customerData: CustomerData
): Promise<CustomerResponse> => {
  const {
    firstName,
    lastName,
    email,
    password,
    countryCode,
    billingAddress,
    shippingAddress,
    setAsDefaultAddress,
    useSameAddress,
  } = customerData;

  const billingAddr = {
    country: countryCode,
    streetName: billingAddress.street,
    city: billingAddress.city,
    postalCode: billingAddress.postalCode,
  };

  const shippingAddr = useSameAddress
    ? billingAddr
    : {
        country: countryCode,
        streetName: shippingAddress.street,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
      };

  let customerDraft: CustomerDraft = {
    firstName,
    lastName,
    email,
    password,
    addresses: [billingAddr, shippingAddr],
  };

  if (setAsDefaultAddress) {
    customerDraft = {
      ...customerDraft,
      defaultShippingAddress: 1,
      defaultBillingAddress: 0,
    };
  }

  const request: CustomerPostRequest<CustomerDraft> = {
    body: customerDraft,
    execute: async () => await apiRoot.customers().post(request).execute(),
  };

  return await request.execute();
};
