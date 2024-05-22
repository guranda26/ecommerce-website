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

export type CountryCode =
  | 'Canada'
  | 'France'
  | 'Georgia'
  | 'Germany'
  | 'Poland'
  | 'USA'
  | 'Uzbekistan';

export const isPostalCodeValid = (
  postalCode: string,
  country: CountryCode
): boolean => {
  const patterns: { [key in CountryCode]: RegExp } = {
    Georgia: /^\d{4}$/,
    Germany: /^\d{5}$/,
    Poland: /^\d{2}-\d{3}$/,
    USA: /^\d{5}$/,
    Uzbekistan: /^\d{6}$/,
    Canada: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    France: /^\d{5}$/,
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
