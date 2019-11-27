import _ from 'lodash'
import isoCountries, { getNames } from 'i18n-iso-countries'
import { countries } from 'country-data-list'
import currencyToName from '@piotrgorecki/i18n-currency-name'

isoCountries.registerLocale(require('i18n-iso-countries/langs/en.json'))
isoCountries.registerLocale(require('i18n-iso-countries/langs/nb.json'))

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

const allowedLocales = ['en', 'nb']

class CountryList {
  constructor (locale) {
    this.locale = locale || 'en'
    if (allowedLocales.indexOf(this.locale) < 0) {
      throw new Error('Locale ' + this.locale + ' not supported by CountryList. Allowed locales: ' + allowedLocales.join(', '))
    }
    this.translations = getNames(this.locale) || {}
    this.currencyLocale = this.locale
    this.testCurrencyTranslation = currencyToName('USD', this.currencyLocale)
    if (!this.testCurrencyTranslation) {
      this.currencyLocale = 'en'
    }
    this.countries = countries.all
      .filter(country => country.status === 'assigned')
      .map(country => ({
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

  getData () {
    return this.countries
  }

  filterValue (value) {
    return value.toUpperCase()
  }

  findByValue (value) {
    return _.find(this.countries, { value: this.filterValue(value) })
  }

  findByValue3 (value) {
    return _.find(this.countries, { value3: this.filterValue(value) })
  }

  exists (value) {
    return this.findByValue(this.filterValue(value)) !== undefined
  }

  filterByValueOnArray (needles) {
    var _needles = needles.map(needle => this.filterValue(needle))
    return _.filter(this.countries, country => _.includes(_needles, this.filterValue(country.value)))
  }
}

class CurrencyList {
  constructor (locale) {
    this.locale = locale || 'en'
    this.currencyLocale = this.locale
    this.testCurrencyTranslation = currencyToName('USD', this.currencyLocale)
    if (!this.testCurrencyTranslation) {
      this.currencyLocale = 'en'
    }
    this.currencies = []
    countries.all.forEach(country => {
      country.currencies.forEach(currency => {
        this.currencies.push({
          ...country,
          label: this.translations[country.alpha2],
          value: country.alpha2,
          currencyLabel: currencyToName(currency, this.currencyLocale),
          currencyValue: currency
        })
      })
    })
    console.log(this.currencies)
  }

  getData () {
    return this.currencies
  }

  findByValue (value) {
    return _.find(this.currencies, { value: value.toUpperCase() })
  }
}

const CountryData = (() => {
  const instances = {
    country: {},
    currency: {}
  }

  return {
    getCountryInstance: (locale) => {
      if (!instances.country.locale) {
        instances.country[locale] = new CountryList(locale)
      }
      return instances.country[locale]
    },
    getCurrencyInstance: (locale) => {
      if (!instances.currency.locale) {
        instances.currency[locale] = new CurrencyList(locale)
      }
      return instances.currency[locale]
    }

  }
})()

export default CountryData
