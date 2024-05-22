export const isEmailValid = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

export const isPasswordValid = (password: string): boolean => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,])[A-Za-z\d!@#$%^&*.,]{8,}$/.test(
    password
  );
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

export type CountryCode = 'CA' | 'FR' | 'GE' | 'DE' | 'PL' | 'US' | 'UZ';

export const isPostalCodeValid = (
  postalCode: string,
  country: CountryCode
): boolean => {
  const patterns: { [key in CountryCode]: RegExp } = {
    CA: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    FR: /^\d{5}$/,
    GE: /^\d{4}$/,
    DE: /^\d{5}$/,
    PL: /^\d{2}-\d{3}$/,
    US: /^\d{5}$/,
    UZ: /^\d{6}$/,
  };
  const pattern = patterns[country];
  return pattern ? pattern.test(postalCode) : false;
};

export const isCountryValid = (
  country: CountryCode,
  validCountries: CountryCode[] = [
    'CA', // Canada
    'FR', // France
    'GE', // Georgia
    'DE', // Germany
    'PL', // Poland
    'US', // USA
    'UZ', // Uzbekistan
  ]
): boolean => {
  return validCountries.includes(country);
};
