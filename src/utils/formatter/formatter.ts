import lodash from 'lodash';
import moment from 'moment';
import { CURRENCIES, getCurrencyInfo } from '../currencies';
import { format } from '../dateFormat';
import converter from 'number-to-words';

export function getCurrencySymbol(currency: string | { code: string } | null | undefined) {
  const code = lodash.isString(currency) ? currency : (currency && currency.code) || null;

  return (code && getCurrencyInfo(code)?.symbol) || null;
}


export function formatCurrency(
  value: number | null | undefined,
  currency: string | { code: string } | null = null,
  fractionDigits = 2,
  groupBySuffix?: boolean,
  minimumFractionDigits?: number,
) {
  const code = lodash.isString(currency) ? currency : (currency && currency.code) || null;
  const currencyObj = CURRENCIES.find((c) => c.code === code);

  const formatter = new Intl.NumberFormat('en-US', {
    style: code ? 'currency' : 'decimal',
    currency: code || undefined,
    currencyDisplay: 'symbol',
    minimumFractionDigits: minimumFractionDigits ?? fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

  const formatWithSymbol = (value: number) => {
    const formatted = formatter.format(value);
    if (currencyObj) {
      return formatted.replace(currencyObj.code, currencyObj.symbol);
    }
    return formatted;
  };

  if (lodash.isNil(value) || lodash.isNaN(value)) return formatWithSymbol(0);

  if (groupBySuffix) {
    const m = ['', 'K', 'M', 'B', 'T'];
    while (value >= 1000 && m.length > 1) {
      value /= 1000;
      if (m.length) {
        m.shift();
      }
    }

    return formatWithSymbol(value) + m[0];
  }

  return formatWithSymbol(value || 0);
}

export function formatRate(value: number | null | undefined, currency: string | { code: string } | null = null) {
  if (lodash.isNil(value)) return '';
  return currency ? formatCurrency(value, currency, 0) : formatDecimal(value, 0);
}

export function formatDecimal(
  value: number,
  fractionDigits: number | null = null,
  minimumFractionDigits: number | null = null,
) {
  if (lodash.isNil(value)) return '';

  if (fractionDigits === null) {
    fractionDigits = 2;
  }

  if (minimumFractionDigits === null) {
    minimumFractionDigits = fractionDigits;
  }

  return new Intl.NumberFormat('en', {
    style: 'decimal',
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function formatInteger(value: number) {
  return formatDecimal(value, 0);
}

export function formatPercent(value: number, fractionDigits = 0) {
  if (lodash.isNil(value)) return '';

  return formatDecimal(value, fractionDigits) + '%';
}

export function formatBytes(bytes: number, options?: { decimal?: boolean; factionDigits?: number }) {
  if (!bytes) return '0 B';

  const kb = options?.decimal ? 1000 : 1024;
  const factionDigits = options?.factionDigits ?? 2;

  const i = Math.floor(Math.log(bytes) / Math.log(kb));

  if (i < 0) return `${bytes.toFixed(factionDigits)} B`;

  return (bytes / Math.pow(kb, i)).toFixed(factionDigits) + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
}

export function formatEmail(email: string, name?: string | null) {
  email = lodash.trim(email);
  name = name && lodash.trim(name);

  if (!name) return email;

  return `${name} <${email}>`;
}

export function formatDate(date: number | string) {
  date = moment.unix(date as number).format(format)
  return date
}

export function formatNumberToWord(amount: number) {
  return converter.toWords(amount)
}