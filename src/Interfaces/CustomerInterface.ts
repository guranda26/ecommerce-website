export interface ICustomer {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  countryCode: string;
  dateOfBirth: string;
  billingAddress: Address;
  shippingAddress: Address;
  useSameAddress: boolean;
  setAsDefaultAddress: boolean;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
}

export interface CustomerDraft {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  key: string;
  dateOfBirth: string;
  addresses: Address[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export interface AddressErrors {
  street?: string;
  city?: string;
  postalCode?: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  dateOfBirth?: string;
  countryCode?: string;
  billingAddress?: AddressErrors;
  shippingAddress?: AddressErrors;
  submit?: string;

  [key: string]: string | AddressErrors | undefined;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  addresses: Address[];
  authenticationMode: string;
  billingAddressIds: string[];
  createdAt: string;
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  isEmailVerified: boolean;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  shippingAddressIds: string[];
  version: number;
  versionModifiedAt: string;
}

export interface CustomerResponse {
  body: {
    customer: Customer;
  };
  statusCode: number;
}

export interface PasswordInputProps {
  password: string;
  onPasswordChange: (password: string) => void;
  error?: string;
}
export interface CustomError extends Error {
  response?: {
    status?: number;
  };
}
