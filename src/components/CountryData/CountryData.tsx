import _ from 'lodash'
import isoCountries, { getNames, LocalizedCountryNames } from 'i18n-iso-countries'
// @ts-ignore
import { countries } from 'country-data-list'
// @ts-ignore
import currencyToName from '@piotrgorecki/i18n-currency-name'

isoCountries.registerLocale(require('i18n-iso-countries/langs/en.json'))
isoCountries.registerLocale(require('i18n-iso-countries/langs/nb.json'))

const allowedLocales = ['en', 'nb']
export type AllowedLocaleString = 'en' | 'nb'
export type CountryDataInstance = {[k in AllowedLocaleString]? : any}

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

export type Country = RawCountry & AddedCountry
export type Countries = Array<Country>
export type Currency = RawCountry & AddedCurrency
export type Currencies = Array<Currency>

/* countries: {
    alpha2: 'AC',
    alpha3: '',
    countryCallingCodes: ['+247'],
    currencies: ['USD'],
    emoji: '',
    ioc: 'SHP',
    languages: ['eng'],
    name: 'Ascension Island',
    status: 'reserved',
  },
 */

const UK = {
  alpha2: 'UK',
  alpha3: 'UK_',
  countryCallingCodes: ['+44'],
  currencies: ['GBP'],
  emoji: '🇬🇧',
  ioc: 'GBR',
  languages: ['eng', 'cor', 'gle', 'gla', 'cym'],
  name: 'United Kingdom',
  status: 'assigned'
}

export class CountryList {
  private locale: AllowedLocaleString
  private translations: LocalizedCountryNames
  private currencyLocale: AllowedLocaleString
  private testCurrencyTranslation: string
  private countries: Countries
  constructor (locale: AllowedLocaleString) {
    this.locale = locale || 'en'
    if (allowedLocales.indexOf(this.locale) < 0) {
      throw new Error('Locale ' + this.locale + ' not supported by CountryList. Allowed locales: ' + allowedLocales.join(', '))
    }
    this.translations = getNames(this.locale) || {}
    this.translations.UK = this.translations.GB
    this.currencyLocale = this.locale
    this.testCurrencyTranslation = currencyToName('USD', this.currencyLocale)
    if (!this.testCurrencyTranslation) {
      this.currencyLocale = 'en'
    }
    this.countries = countries.all
      .concat(UK)
      .filter((country: any) => country.status === 'assigned')
      .map((country: Country) => ({
        ...country,
        label: this.translations[country.alpha2],
        value: country.alpha2,
        value3: country.alpha3,
        currencies: country.currencies.map(currency => ({
          currencyValue: currency,
          currencyLabel: currencyToName(currency, this.currencyLocale)
        }))
      })
      )
  }

  getData (): Countries {
    return this.countries
  }

  filterValue (value: string): string {
    return value.toUpperCase()
  }

  findByValue (value: string): Country | undefined {
    return _.find(this.countries, { value: this.filterValue(value) })
  }

  findByValue3 (value: string): Country | undefined {
    return _.find(this.countries, { value3: this.filterValue(value) })
  }

  exists (value: string): boolean {
    return this.findByValue(this.filterValue(value)) !== undefined
  }

  filterByValueOnArray (needles: Array<string>): Countries {
    var _needles = needles.map(needle => this.filterValue(needle))
    return _.filter(this.countries, country => _.includes(_needles, this.filterValue(country.value)))
  }
}

class CurrencyList {
  private locale: AllowedLocaleString
  private currencyLocale: AllowedLocaleString
  private translations: LocalizedCountryNames
  private testCurrencyTranslation: string
  private currencies: Currencies
  constructor (locale: AllowedLocaleString) {
    this.locale = locale || 'en'
    this.translations = getNames(this.locale) || {}
    this.currencyLocale = this.locale
    this.testCurrencyTranslation = currencyToName('USD', this.currencyLocale)
    if (!this.testCurrencyTranslation) {
      this.currencyLocale = 'en'
    }
    this.currencies = []
    countries.all.forEach((country: any) => {
      country.currencies.forEach((currency: any) => {
        this.currencies.push({
          ...country,
          label: this.translations[country.alpha2],
          value: country.alpha2,
          currencyLabel: currencyToName(currency, this.currencyLocale),
          currencyValue: currency
        })
      })
    })
  }

  getData (): Currencies {
    return this.currencies
  }

  findByValue (value: string): Currency | undefined {
    return _.find(this.currencies, { value: value.toUpperCase() })
  }
}

const CountryData = (() => {
  const instances: {
    country: CountryDataInstance,
    currency: CountryDataInstance,
  } = {
    country: {},
    currency: {}
  }
  return {
    getCountryInstance: (locale: AllowedLocaleString) => {
      if (!instances.country[locale]) {
        instances.country[locale] = new CountryList(locale)
      }
      return instances.country[locale]
    },
    getCurrencyInstance: (locale: AllowedLocaleString) => {
      if (!instances.currency[locale]) {
        instances.currency[locale] = new CurrencyList(locale)
      }
      return instances.currency[locale]
    }
  }
})()

export default CountryData
