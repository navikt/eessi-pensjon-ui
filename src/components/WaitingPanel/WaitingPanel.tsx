import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import { Spinner, Normaltekst } from 'Nav'

export interface WaitingPanelProps {
  className?: string;
  size?: 'XXS'| 'XS' | 'S'| 'M' | 'L'| 'XL'| 'XXL' | 'XXXL';
  style?: React.CSSProperties;
  message?: string
}

const WaitingPanel: React.FC<WaitingPanelProps> = ({
  className, size = 'M', style = {}, message = 'Vennligst vent...'
}: WaitingPanelProps): JSX.Element | null => (
  <div style={style} className={classNames('c-waitingPanel', 'text-center', className)}>
    <Spinner type={size} />
    {message ? (
      <Normaltekst className='c-waitingPanel__message ml-2'>
        {message}
      </Normaltekst>
    ) : null}
  </div>
)

WaitingPanel.propTypes = {
  className: PT.string,
  message: PT.string,
  size: PT.oneOf(['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']),
  style: PT.object
}
WaitingPanel.displayName = 'WaitingPanel'
export default WaitingPanel
