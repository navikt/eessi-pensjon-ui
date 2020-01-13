import {
  LayoutTemplates,
  WidgetFC,
  WidgetMap,
  WidgetPlaceholder,
  WidgetTemplate
} from 'declarations/Dashboard.d'
import {
  WidgetTemplatePropType
} from 'declarations/Dashboard.pt'
import { WidgetContainerProps } from 'applications/Dashboard/WidgetContainer'
import classNames from 'classnames'
import _ from 'lodash'
import PT from 'prop-types'
import React, { useState } from 'react'
import './Widget.css'

export interface WidgetAddProps {
  myWidgets: WidgetMap;
  onPlaceholderWidgetAdd: (w: WidgetPlaceholder) => void;
  widgetTemplate: WidgetTemplate;
}

export const WidgetAdd: React.FC<WidgetAddProps> = ({
  myWidgets, onPlaceholderWidgetAdd, widgetTemplate
}: WidgetAddProps): JSX.Element => {
  const [mouseOver, setMouseOver] = useState<boolean>(false)

  const FoundWidget: WidgetFC<WidgetContainerProps> = _.find(_.values(myWidgets), (it) => {
    return it.properties ? it.properties.type === widgetTemplate.type : false
  })
  if (!FoundWidget) {
    return <div />
  }

  return (
    <div
      className={classNames('c-d-widgetAdd', 'droppable-element', {
        hover: mouseOver
      })}
      key={widgetTemplate.description}
      draggable
      unselectable='on'
      onDragStart={(e: React.DragEvent) => {
        const placeholderWidget: WidgetPlaceholder = {
          i: '',
          visible: true,
          title: widgetTemplate.title,
          type: widgetTemplate.type,
          options: widgetTemplate.options,
          defaultLayout: FoundWidget.properties.layout as LayoutTemplates
        }
        onPlaceholderWidgetAdd(placeholderWidget)
        e.dataTransfer.setData('text/plain', '')
      }}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      title={widgetTemplate.description}
    >
      <div className='p-2 content'>
        <h6 className='c-d-widgetAdd__title'>{widgetTemplate.title}</h6>
        <p className='c-d-widgetAdd__description'>
          <small>{widgetTemplate.description}</small>
        </p>
      </div>
    </div>
  )
}

WidgetAdd.propTypes = {
  myWidgets: PT.object.isRequired,
  onPlaceholderWidgetAdd: PT.func.isRequired,
  widgetTemplate: WidgetTemplatePropType.isRequired
}

export default WidgetAdd
