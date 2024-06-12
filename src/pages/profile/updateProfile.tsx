// export const handleUpdate = async (fetchFunction, body) => {
//     void await fetchFunction(body);
// }

import { Customer } from '@commercetools/platform-sdk';

export const handleEditBtn = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  input: HTMLInputElement
) => {
  e.preventDefault();
  if (input) {
    input.readOnly = !input.readOnly;
    input.focus();
  }
};

export const handlechange = (
  element: HTMLInputElement,
  setUser: React.Dispatch<React.SetStateAction<Customer>>
) => {
  setUser((prev) => {
    if (
      element.name === 'country' ||
      element.name === 'city' ||
      element.name === 'postalCode'
    ) {
      const newAddreses = [
        { ...prev.addresses[0], [element.name]: element.value },
        { ...prev.addresses[1], [element.name]: element.value },
      ];
      return {
        ...prev,
        addresses: newAddreses,
      };
    }
    return {
      ...prev,
      [element.name]: element.value,
    };
  });
};
