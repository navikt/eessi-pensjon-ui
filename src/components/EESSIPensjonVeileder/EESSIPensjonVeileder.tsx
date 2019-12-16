import React from 'react'
import classNames from 'classnames'
import PT from 'prop-types'
import SmilendeOrangeVeileder from './veileder/NavPensjonSmilendeOrangeVeileder'
import TristOrangeVeileder from './veileder/NavPensjonTristOrangeVeileder'

export type Mood = 'smilende' |'trist'

export interface EESSIPensjonVeilederProps {
  className ?: string;
  mood?: Mood
}
const EESSIPensjonVeileder: React.FC<EESSIPensjonVeilederProps> = ({
  className, mood = 'smilende'
}: EESSIPensjonVeilederProps): JSX.Element => (
  <div className={classNames('c-EESSIPensjonVeileder', className)}>
    {mood === 'trist'
      ? <TristOrangeVeileder width='130' height='130' />
      : <SmilendeOrangeVeileder width='130' height='130' />}
  </div>
)

EESSIPensjonVeileder.propTypes = {
  className: PT.string,
  mood: PT.oneOf(['smilende', 'trist'])
}
EESSIPensjonVeileder.displayName = 'EESSIPensjonVeileder'
export default EESSIPensjonVeileder
