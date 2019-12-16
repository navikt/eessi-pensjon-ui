import { Widget, WidgetMap } from 'applications/Dashboard/declarations/Dashboard'
import _ from 'lodash'
import PT from 'prop-types'
import React from 'react'

export interface WidgetEditOptionsProps {
  myWidgets: WidgetMap;
  widget: Widget;
}

const WidgetEditOptions = (props: WidgetEditOptionsProps) => {
  const { myWidgets, widget } = props

  const FoundWidget = _.find(myWidgets, (it) => {
    return it.properties ? it.properties.type === widget.type : false
  })

  if (FoundWidget && FoundWidget.edit) {
    return <FoundWidget.edit {...props} />
  }
  return null
}

// @ts-ignore
WidgetEditOptions.propTypes = {
  widget: PT.object.isRequired
}

export default WidgetEditOptions
