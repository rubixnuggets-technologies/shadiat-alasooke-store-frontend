export const formatCurrency = (amount: number, currency?: string) => {
  if (!amount) return null;

  return `${(amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "symbol",
    currencySign: "accounting",
  })}`;
};
