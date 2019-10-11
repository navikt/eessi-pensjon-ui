import React from 'react'
import PT from 'prop-types'
import WidgetAdd from './WidgetAdd'
import WidgetAddPreview from './WidgetAddPreview'
import './Widget.css'

const WidgetAddArea = ({ availableWidgets, currentBreakpoint, dragApi, labels, setWidgets, widgets }) => (
  <div className='c-d-widgetAddArea'>
    <WidgetAddPreview labels={labels} currentBreakpoint={currentBreakpoint} />
    {availableWidgets.map((widget, i) => {
      return (
        <WidgetAdd
          key={i}
          widgets={widgets}
          setWidgets={setWidgets}
          widget={widget}
          dragApi={dragApi}
        />
      )
    })}
  </div>
)

WidgetAddArea.propTypes = {
  availableWidgets: PT.array.isRequired,
  currentBreakpoint: PT.string.isRequired,
  dragApi: PT.object,
  labels: PT.object,
  setWidgets: PT.func.isRequired,
  widgets: PT.array.isRequired
}

export default WidgetAddArea
