export const isEmailValid = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

export const isPasswordValid = (password: string): boolean => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
};

export const isNameValid = (name: string): boolean => {
  return /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(name);
};

export const isDateOfBirthValid = (dob: string): boolean => {
  const userDate = new Date(dob);
  const currentDate = new Date();
  let age = currentDate.getFullYear() - userDate.getFullYear();
  const m = currentDate.getMonth() - userDate.getMonth();
  if (m < 0 || (m === 0 && currentDate.getDate() < userDate.getDate())) {
    age--;
  }
  return age >= 13;
};

export const isSimpleTextValid = (text: string): boolean => {
  return text.trim().length > 0;
};

export const isCityValid = (city: string): boolean => {
  return /^[a-zA-Z\s]+$/.test(city) && city.trim().length > 0;
};

export type CountryCode = 'US' | 'CA' | 'GE' | 'DE' | 'FR' | 'GB' | 'UZ' | 'PL';

export const isPostalCodeValid = (
  postalCode: string,
  country: CountryCode
): boolean => {
  const patterns: { [key in CountryCode]: RegExp } = {
    US: /^\d{5}$/,
    CA: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    GE: /^\d{4}$/, // Example pattern for Georgia
    DE: /^\d{5}$/, // Example pattern for Germany
    FR: /^\d{5}$/, // Example pattern for France
    GB: /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/, // Example pattern for Great Britain
    UZ: /^\d{6}$/, // Pattern for Uzbekistan
    PL: /^\d{2}-\d{3}$/, // Pattern for Poland
  };
  const pattern = patterns[country];
  return pattern ? pattern.test(postalCode) : false;
};

export const isCountryValid = (
  country: string,
  validCountries: string[]
): boolean => {
  return validCountries.includes(country);
};
