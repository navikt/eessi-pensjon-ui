import classnames from 'classnames'
import flagList from 'components/Flag/Flags'
import PT from 'prop-types'
import Tooltip from 'rc-tooltip'
import React from 'react'
import CountryData, { CountryList } from '../CountryData/CountryData'
import './Flag.css'

const countryData: CountryList = CountryData.getCountryInstance('nb')

export interface FlagProps {
  className ?: string;
  country: string;
  label: string | JSX.Element;
  size?: 'S' | 'M' | 'L' | 'XL';
  style?: React.CSSProperties;
  type?: 'original' | 'circle';
}

const Flag: React.FC<FlagProps> = ({
  className, country, label, size = 'M', style = {}, type = 'original'
}: FlagProps): JSX.Element | null => {
  if (['original', 'circle'].indexOf(type) < 0) {
    console.error('Flag type ' + type + ' not valid')
    return null
  }

  const getFlag = (): JSX.Element | null => {
    // we are using UK as the code, but we have GB as flag's svg
    if (countryData.exists(country)) {
      const flag: string | undefined = flagList['flag' + country.toUpperCase()]
      return flag ? <img style={style} alt={label.toString()} src={flag} /> : null
    }
    console.error('Flag ' + country.toLowerCase() + ' not found')
    return null
  }

  return (
    <Tooltip placement='top' trigger={['hover']} overlay={<span>{label}</span>}>
      <div
        style={style}
        className={classnames(className, 'c-flag', 'size-' + size, 'type-' + type)}
      >
        {getFlag()}
      </div>
    </Tooltip>
  )
}

Flag.propTypes = {
  className: PT.string,
  country: PT.string.isRequired,
  label: PT.oneOfType([PT.string, PT.element]).isRequired,
  type: PT.oneOf(['original', 'circle']),
  size: PT.oneOf(['S', 'M', 'L', 'XL']),
  style: PT.object
}

Flag.displayName = 'Flag'
export default Flag
