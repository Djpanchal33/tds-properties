export const formatINR = (value: number, currency = "INR") =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);

export const propertyPrice = (property: { price: number; currency: string; priceLabel?: string }) =>
  property.priceLabel || formatINR(property.price, property.currency);

export const compactNumber = (value: number) => new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(value);
