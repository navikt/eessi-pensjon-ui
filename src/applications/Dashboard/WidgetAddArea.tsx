import {
  WidgetMap,
  WidgetPlaceholder,
  WidgetTemplates
} from 'declarations/Dashboard.d'
import {
  WidgetMapPropType
} from 'declarations/Dashboard.pt'
import PT from 'prop-types'
import React from 'react'
import { Labels } from 'declarations/types.d'
import { LabelsPropType } from 'declarations/types.pt'
import './Widget.css'
import WidgetAdd from './WidgetAdd'

export interface WidgetAddAreaProps {
  availableWidgets: WidgetTemplates;
  labels: Labels;
  myWidgets: WidgetMap;
  onPlaceholderWidgetAdd: (w: WidgetPlaceholder) => void;
}

const WidgetAddArea: React.FC<WidgetAddAreaProps> = ({
  availableWidgets, myWidgets, onPlaceholderWidgetAdd
}: WidgetAddAreaProps): JSX.Element => (
  <div className='c-d-widgetAddArea'>
    {availableWidgets.map((widgetTemplate, i) => (
      <WidgetAdd
        key={i}
        myWidgets={myWidgets}
        widgetTemplate={widgetTemplate}
        onPlaceholderWidgetAdd={onPlaceholderWidgetAdd}
      />
    ))}
  </div>
)

WidgetAddArea.propTypes = {
  availableWidgets: PT.array.isRequired,
  labels: LabelsPropType.isRequired,
  myWidgets: WidgetMapPropType.isRequired,
  onPlaceholderWidgetAdd: PT.func.isRequired
}

export default WidgetAddArea
