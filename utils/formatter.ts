
import { CURRENCY_CODE } from "../constants"; // CURRENCY_CODE is "FCFA"

export const formatCurrency = (amount: number, currencyToFormat: string = CURRENCY_CODE): string => {
  let actualIsoCode: string;

  // Map common display codes to their ISO 4217 counterparts
  if (currencyToFormat.toUpperCase() === "FCFA") {
    actualIsoCode = "XOF";
  } else {
    actualIsoCode = currencyToFormat; // Assume it might be a valid ISO code already (e.g., "USD", "EUR")
  }

  try {
    return new Intl.NumberFormat('fr-SN', { // Using Senegal locale for FCFA
      style: 'currency',
      currency: actualIsoCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    console.error(`Error formatting currency with code "${actualIsoCode}" (from input "${currencyToFormat}"):`, error);
    // Fallback display if Intl.NumberFormat fails for some reason
    return `${amount.toLocaleString('fr-SN')} ${currencyToFormat}`;
  }
};
