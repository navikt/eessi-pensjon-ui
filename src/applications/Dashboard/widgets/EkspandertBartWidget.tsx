import {
  Widget,
  WidgetFC,
  WidgetProps,
  WidgetTemplate
} from 'declarations/Dashboard.d'
import {
  WidgetPropType
} from 'declarations/Dashboard.pt'
import _ from 'lodash'
import * as Nav from 'Nav'
import PT from 'prop-types'
import React from 'react'
import ReactResizeDetector from 'react-resize-detector'

const EkspandertBartWidget: WidgetFC<WidgetProps> = ({ onResize, onUpdate, widget }: WidgetProps): JSX.Element => {
  const onClick = (): void => {
    const newWidget: Widget = _.cloneDeep(widget)
    newWidget.options.collapsed = !newWidget.options.collapsed
    if (_.isFunction(onUpdate)) {
      onUpdate(newWidget)
    }
  }

  const _onResize = (w: number, h: number): void => {
    if (_.isFunction(onResize)) {
      // give more 50 for the panel header
      onResize(w, h + 60)
    }
  }

  return (
    <div className='w-EkspandertbartWidget'>
      <Nav.Ekspanderbartpanel
        apen={!widget.options.collapsed}
        tittel={widget.title || ''}
        onClick={onClick}
      >
        <div>
          <ReactResizeDetector
            handleWidth
            handleHeight
            onResize={_onResize}
          />
          {widget.options.collapsed === true
            ? ''
            : (
              <div
                className='content'
                dangerouslySetInnerHTML={{ __html: widget!.options.content }}
              />
            )}
        </div>
      </Nav.Ekspanderbartpanel>
    </div>
  )
}

const properties: WidgetTemplate = {
  type: 'ekspandertbart',
  title: 'Ekspandertbart widget',
  description: 'Widget that can collapse',
  layout: {
    lg: { minW: 6, maxW: 12, defaultW: 6, minH: 2, maxH: 999, defaultH: 6 },
    md: { minW: 2, maxW: 3, defaultW: 2, minH: 2, maxH: 999, defaultH: 3 },
    sm: { minW: 1, maxW: 1, defaultW: 1, minH: 2, maxH: 999, defaultH: 3 }
  },
  options: {
    collapsed: false,
    content: ''
  }
}
EkspandertBartWidget.properties = properties
EkspandertBartWidget.propTypes = {
  content: PT.string,
  onResize: PT.func.isRequired,
  onUpdate: PT.func.isRequired,
  widget: WidgetPropType.isRequired
}

export default EkspandertBartWidget
