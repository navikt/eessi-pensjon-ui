import React from 'react'
import PT from 'prop-types'
import _ from 'lodash'

const WidgetEditOptions = (props) => {
  const { MyWidgets, widget } = props

  const FoundWidget = _.find(MyWidgets, (it) => {
    return it.properties ? it.properties.type === widget.type : false
  })

  if (FoundWidget && FoundWidget.edit) {
    return <FoundWidget.edit {...props} />
  }
  return null
}

WidgetEditOptions.propTypes = {
  widget: PT.object.isRequired
}

export default WidgetEditOptions
