import { Widget, WidgetProps, WidgetPropType } from 'applications/Dashboard/declarations/Dashboard.d'
import SmileyWidget from 'applications/Dashboard/widgets/Smiley/SmileyWidget'
import _ from 'lodash'
import * as Nav from 'Nav'
import PT from 'prop-types'
import React, { useState } from 'react'

interface Mood {
  label: string;
  value: string
}

const SmileyOptionsWidget: React.FC<WidgetProps> = ({ onUpdate, widget }: WidgetProps): JSX.Element => {
  const [mood, setMood] = useState<string>(widget!.options.mood)

  const chooseMood = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newWidget: Widget = _.cloneDeep(widget)
    newWidget.options.mood = e.target.value
    setMood(e.target.value)
    if (_.isFunction(onUpdate)) {
      onUpdate(newWidget)
    }
  }

  return (
    <div className='w-SmileyOptionsWidget p-3'>
      <Nav.Select
        id='w-SmileyOptionsWidget__mood-select-id'
        label='mood'
        value={mood || ''}
        onChange={chooseMood}
      >
        {SmileyWidget.properties.options.availableMoods.map((_mood: Mood) => {
          return <option key={_mood.label} value={_mood.value}>{_mood.label}{' - '}{_mood.value}</option>
        })}
      </Nav.Select>
    </div>
  )
}

SmileyOptionsWidget.propTypes = {
  onUpdate: PT.func.isRequired,
  widget: WidgetPropType.isRequired
}

export default SmileyOptionsWidget
