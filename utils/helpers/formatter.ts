export const formatCurrency = (amount: number, currency?: string) => {
  if (!amount) return null;

  return `${amount.toLocaleString("en-US", {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "narrowSymbol",
    currencySign: "accounting",
  })}`;
};
