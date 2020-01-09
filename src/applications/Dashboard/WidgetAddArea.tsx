import {
  WidgetMap,
  WidgetPlaceholder,
  Widgets,
  WidgetTemplates
} from 'applications/Dashboard/declarations/Dashboard'
import PT from 'prop-types'
import React from 'react'
import './Widget.css'
import { Labels } from 'types'
import WidgetAdd from './WidgetAdd'

export interface WidgetAddAreaProps {
  availableWidgets: WidgetTemplates;
  labels: Labels;
  myWidgets: WidgetMap;
  onPlaceholderWidgetAdd: (w: WidgetPlaceholder) => void;
  widgets: Widgets;
}

const WidgetAddArea: React.FC<WidgetAddAreaProps> = ({
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
  labels: PT.oneOf<Labels>([]).isRequired,
  myWidgets: PT.oneOf<WidgetMap>([]).isRequired,
  onPlaceholderWidgetAdd: PT.func.isRequired,
  widgets: PT.oneOf<Widgets>([]).isRequired,
}

export default WidgetAddArea
