export interface ModalButton {
  onClick?: () => void;
  disabled ?: boolean;
  main?: boolean;
  text: string;
}

export interface ModalContent {
  modalTitle?: string;
  modalContent ?: JSX.Element |string;
  modalText ?: string;
  modalButtons?: Array<ModalButton>;
  closeButton?: boolean;
}

export interface FlagItem {
  label: string;
  country: string;
}

export type FlagItems = Array<FlagItem>

interface RawCountry {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: Array<string>;
  emoji: string;
  ioc: string;
  languages: Array<string>;
  name: string;
  status: string;
}
interface AddedCountry {
  label: string
  value: string;
  value3: string;
  currencies: Array<{
    currencyValue: string;
    currencyLabel: string;
  }>
}

interface AddedCurrency {
  label: string
  value: string;
  currencyValue: string;
  currencyLabel: string;
}

export type AllowedLocaleString = 'en' | 'nb'

export type Country = RawCountry & AddedCountry
export type Countries = Array<Country>
export type Currency = RawCountry & AddedCurrency
export type Currencies = Array<Currency>
