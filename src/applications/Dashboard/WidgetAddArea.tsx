import {
  Labels,
  WidgetMap,
  WidgetPlaceholder,
  Widgets,
  WidgetTemplates
} from 'applications/Dashboard/declarations/Dashboard'
import PT from 'prop-types'
import React from 'react'
import './Widget.css'
import WidgetAdd from './WidgetAdd'

export interface WidgetAddAreaProps {
  availableWidgets: WidgetTemplates;
  labels: Labels;
  myWidgets: WidgetMap;
  onPlaceholderWidgetAdd: (w: WidgetPlaceholder) => void;
  widgets: Widgets;
}

const WidgetAddArea = ({
  availableWidgets, myWidgets, onPlaceholderWidgetAdd, widgets
}: WidgetAddAreaProps): JSX.Element => (
  <div className='c-d-widgetAddArea'>
    {availableWidgets.map((widgetTemplate, i) => (
      <WidgetAdd
        key={i}
        myWidgets={myWidgets}
        widgets={widgets}
        widgetTemplate={widgetTemplate}
        onPlaceholderWidgetAdd={onPlaceholderWidgetAdd}
      />
    ))}
  </div>
)

WidgetAddArea.propTypes = {
  availableWidgets: PT.array.isRequired,
  labels: PT.object,
  myWidgets: PT.object,
  onPlaceholderWidgetAdd: PT.func.isRequired,
  widgets: PT.array.isRequired
}

export default WidgetAddArea
