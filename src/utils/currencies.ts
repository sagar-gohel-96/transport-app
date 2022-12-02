import lodash from "lodash";

export interface CurrencyInfo {
  code: string;
  symbol: string;
  icon: string;
}

export const CURRENCIES: CurrencyInfo[] = [
  { code: 'EUR', symbol: '€', icon: 'flag-icon flag-icon-eu' },
  { code: 'USD', symbol: '$', icon: 'flag-icon flag-icon-us' },
  { code: 'CAD', symbol: '$', icon: 'flag-icon flag-icon-ca' },
  { code: 'GBP', symbol: '£', icon: 'flag-icon flag-icon-gb' },
  { code: 'AED', symbol: 'د.إ', icon: 'flag-icon flag-icon-ae' },
  { code: 'ANG', symbol: 'ƒ', icon: 'flag-icon flag-icon-an' },
  { code: 'ARS', symbol: '$', icon: 'flag-icon flag-icon-ar' },
  { code: 'AUD', symbol: '$', icon: 'flag-icon flag-icon-au' },
  { code: 'BRL', symbol: 'R$', icon: 'flag-icon flag-icon-br' },
  { code: 'BSD', symbol: '$', icon: 'flag-icon flag-icon-bs' },
  { code: 'CHF', symbol: 'CHF', icon: 'flag-icon flag-icon-ch' },
  { code: 'CLP', symbol: '$', icon: 'flag-icon flag-icon-cl' },
  { code: 'CNY', symbol: '¥', icon: 'flag-icon flag-icon-cn' },
  { code: 'COP', symbol: '$', icon: 'flag-icon flag-icon-co' },
  { code: 'CZK', symbol: 'Kč', icon: 'flag-icon flag-icon-cz' },
  { code: 'DEU', symbol: '₰', icon: 'flag-icon flag-icon-de' },
  { code: 'DKK', symbol: 'kr', icon: 'flag-icon flag-icon-dk' },
  { code: 'ESP', symbol: '₧', icon: 'flag-icon flag-icon-es' },
  { code: 'EGP', symbol: '£', icon: 'flag-icon flag-icon-eg' },
  { code: 'FJD', symbol: '$', icon: 'flag-icon flag-icon-fj' },
  { code: 'GHS', symbol: '¢', icon: 'flag-icon flag-icon-gh' },
  { code: 'GRD', symbol: '₯', icon: 'flag-icon flag-icon-gr' },
  { code: 'GTQ', symbol: 'Q', icon: 'flag-icon flag-icon-gt' },
  { code: 'HKD', symbol: '$', icon: 'flag-icon flag-icon-hk' },
  { code: 'HNL', symbol: 'L', icon: 'flag-icon flag-icon-hn' },
  { code: 'HRK', symbol: 'kn', icon: 'flag-icon flag-icon-hr' },
  { code: 'HUF', symbol: 'Ft', icon: 'flag-icon flag-icon-hu' },
  { code: 'IDR', symbol: 'Rp', icon: 'flag-icon flag-icon-id' },
  { code: 'ILS', symbol: '₪', icon: 'flag-icon flag-icon-il' },
  { code: 'INR', symbol: '₹', icon: 'flag-icon flag-icon-in' },
  { code: 'ISK', symbol: 'kr', icon: 'flag-icon flag-icon-is' },
  { code: 'JMD', symbol: 'J$', icon: 'flag-icon flag-icon-jm' },
  { code: 'JPY', symbol: '¥', icon: 'flag-icon flag-icon-jp' },
  { code: 'KRW', symbol: '₩', icon: 'flag-icon flag-icon-kr' },
  { code: 'LAK', symbol: '₭', icon: 'flag-icon flag-icon-la' },
  { code: 'LKR', symbol: '₨', icon: 'flag-icon flag-icon-lk' },
  { code: 'MAD', symbol: '.د.م', icon: 'flag-icon flag-icon-ma' },
  { code: 'MMK', symbol: 'K', icon: 'flag-icon flag-icon-mm' },
  { code: 'MNT', symbol: '₮', icon: 'flag-icon flag-icon-mn' },
  { code: 'MXN', symbol: '$', icon: 'flag-icon flag-icon-mx' },
  { code: 'MYR', symbol: 'RM', icon: 'flag-icon flag-icon-my' },
  { code: 'MDL', symbol: 'L', icon: 'flag-icon flag-icon-md' },
  { code: 'NOK', symbol: 'kr', icon: 'flag-icon flag-icon-no' },
  { code: 'NZD', symbol: '$', icon: 'flag-icon flag-icon-nz' },
  { code: 'PAB', symbol: 'B/.', icon: 'flag-icon flag-icon-pa' },
  { code: 'PEN', symbol: 'S/.', icon: 'flag-icon flag-icon-pe' },
  { code: 'PHP', symbol: '₱', icon: 'flag-icon flag-icon-ph' },
  { code: 'PKR', symbol: '₨', icon: 'flag-icon flag-icon-pk' },
  { code: 'PLN', symbol: 'zł', icon: 'flag-icon flag-icon-pl' },
  { code: 'PYG', symbol: 'Gs', icon: 'flag-icon flag-icon-py' },
  { code: 'RON', symbol: 'lei', icon: 'flag-icon flag-icon-ro' },
  { code: 'RSD', symbol: 'Дин.', icon: 'flag-icon flag-icon-rs' },
  { code: 'RUB', symbol: 'руб', icon: 'flag-icon flag-icon-ru' },
  { code: 'SEK', symbol: 'kr', icon: 'flag-icon flag-icon-se' },
  { code: 'SGD', symbol: '$', icon: 'flag-icon flag-icon-sg' },
  { code: 'THB', symbol: '฿', icon: 'flag-icon flag-icon-th' },
  { code: 'TND', symbol: 'DT', icon: 'flag-icon flag-icon-tn' },
  { code: 'TRY', symbol: '₤', icon: 'flag-icon flag-icon-tr' },
  { code: 'TTD', symbol: 'TT$', icon: 'flag-icon flag-icon-tt' },
  { code: 'UAH', symbol: '₴', icon: 'flag-icon flag-icon-ua' },
  { code: 'VEF', symbol: 'Bs', icon: 'flag-icon flag-icon-ve' },
  { code: 'VND', symbol: '₫', icon: 'flag-icon flag-icon-vn' },
  { code: 'XAF', symbol: 'FCFA', icon: 'flag-icon flag-icon-cm' },
  { code: 'XCD', symbol: '$', icon: 'flag-icon flag-icon-vc' },
  { code: 'XPF', symbol: 'F', icon: 'flag-icon flag-icon-pf' },
  { code: 'ZAR', symbol: 'R', icon: 'flag-icon flag-icon-za' },
  { code: 'BGN', symbol: 'лв', icon: 'flag-icon flag-icon-bg' },
  { code: 'NGN', symbol: '₦', icon: 'flag-icon flag-icon-ng' },
  { code: 'OMR', symbol: '﷼', icon: 'flag-icon flag-icon-om' },
  { code: 'SAR', symbol: '﷼', icon: 'flag-icon flag-icon-sa' },
  { code: 'BHD', symbol: '.د.ب', icon: 'flag-icon flag-icon-bh' },
];

const CURRENCIES_BY_CODES = lodash.keyBy(CURRENCIES, (currency) => currency.code);

export function getCurrencyInfo(code: string | null | undefined): CurrencyInfo | null {
  return (code && CURRENCIES_BY_CODES[code]) || null;
}

export function getDefaultCurrencyInfo() {
  return CURRENCIES_BY_CODES['USD'];
}

export function getTokeetCurrency(code: string | null | undefined) {
  const currency = (code && CURRENCIES_BY_CODES[code]) || CURRENCIES_BY_CODES['USD'];

  const img = 'flag flag-' + currency.icon.slice(-2);

  return { ...currency, img };
}
