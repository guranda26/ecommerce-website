import { CountryCode } from 'src/modules/validationUtils';

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  countryCode: CountryCode;
  dateOfBirth: string;
  addresses?: Address[];
  billingAddress: Address;
  shippingAddress: Address;
  useSameAddress: boolean;
  setAsDefaultAddress: boolean;
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export interface Address {
  streetName: string;
  city: string;
  postalCode: string;
}

export interface AddressErrors {
  streetName?: string;
  city?: string;
  postalCode?: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  dateOfBirth?: string;
  countryCode?: CountryCode;
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

export type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  images?: string[];
  price?: string;
  discountPrice?: string;
  availableQuantity?: number;
};

export interface ProductsProps {
  productId?: string;
}

interface Image {
  url: string;
}

export interface MasterVariant {
  images?: Image[];
}

export interface ProductData {
  id: string;
  name?: { [key: string]: string };
  description?: { [key: string]: string };
  MasterVariant?: MasterVariant;
}

export interface TextInputProps {
  type: 'text' | 'email' | 'password' | 'date';
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
}
