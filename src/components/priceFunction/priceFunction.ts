const priceFunction = (
  amount: number | undefined,
  currencyCode: string | undefined
): string | undefined => {
  if (amount !== undefined && currencyCode)
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount / 100);
  return undefined;
};

export default priceFunction;
