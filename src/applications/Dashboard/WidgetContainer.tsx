import {
  Breakpoint,
  Layout,
  Size,
  Sizes,
  Widget as IWidget,
  WidgetMap
} from 'applications/Dashboard/declarations/Dashboard'
import _ from 'lodash'
import PT from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Labels } from 'types'
import Widget from './Widget'
import './Widget.css'

export interface WidgetContainerProps {
  currentBreakpoint: Breakpoint;
  editMode: boolean;
  layout: Layout;
  labels: Labels;
  myWidgets: WidgetMap;
  onWidgetDelete?: (layout: Layout) => void;
  onWidgetFullFocus?: (focusedWidget: IWidget) => void;
  onWidgetResize?: (layout: Layout) => void;
  onWidgetRestoreFocus?: () => void;
  onWidgetUpdate?: (widget: IWidget, layout: Layout) => void;
  rowHeight: number;
  widget: IWidget;
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({
  currentBreakpoint, editMode, labels, layout, myWidgets, onWidgetDelete, onWidgetUpdate, onWidgetResize,
  onWidgetFullFocus, onWidgetRestoreFocus, rowHeight, widget
}: WidgetContainerProps): JSX.Element => {

  const [sizes, setSizes] = useState<Sizes>({ lg: {}, md: {}, sm: {} })
  const [mouseOver, setMouseOver] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)
  const [mode, setMode] = useState<string>('view')

  useEffect(() => {
    const getSize: () => Size = () => {
      return {
        width: document.getElementById('widget-' + layout.i)!.offsetWidth,
        height: document.getElementById('widget-' + layout.i)!.offsetHeight
      }
    }

    if (!mounted) {
      if (document.getElementById('widget-' + layout.i)) {
        const newSize: Size = getSize()
        const oldSizes: Sizes = _.cloneDeep(sizes)
        if (_.isEmpty(oldSizes[currentBreakpoint]) || (
          ((oldSizes[currentBreakpoint].height !== newSize.height) ||
          (oldSizes[currentBreakpoint].width !== newSize.width)))) {
          oldSizes[currentBreakpoint] = newSize
          setSizes(oldSizes)
        }
      }
      setMounted(true)
    }
  }, [mounted, layout, sizes, currentBreakpoint])

  useEffect(() => {
    if (mode === 'view' && editMode && mouseOver) {
      setMode('edit')
    }
    if (mode === 'edit' && !mouseOver) {
      setMode('view')
    }
  }, [mode, editMode, mouseOver])

  const onUpdate = (widget: IWidget): void => {
    onWidgetUpdate!(widget, layout)
  }

  const onDelete = (): void => {
    onWidgetDelete!(layout)
  }

  const onFullFocus = (): void => {
    onWidgetFullFocus!(widget)
  }

  const onRestoreFocus = (): void => {
    onWidgetRestoreFocus!()
  }

  const onResize = (width: number, height: number): void => {
    if (!height || !width) {
      return
    }
    if (_.isFunction(onWidgetResize)) {
      const newLayout: Layout = _.cloneDeep(layout)
      // these 10 are padding/margin added to each h
      let newH: number = Math.ceil((height + 10) / (rowHeight + 10))

      // do not shrink below minimum H
      if (newH < newLayout.minH) {
        // console.log('New h ' + newH + ' rejected because minH is ' + newLayout.minH)
        newH = newLayout.minH
      }

      if (newH > newLayout.maxH) {
        // console.log('New h ' + newH + ' rejected because maxH is ' + newLayout.maxH)
        newH = newLayout.maxH
      }

      // in edit mode, don't make it smaller than view mode
      if (mode === 'edit' && newH < newLayout.h) {
        // console.log('New h ' + newH + ' rejected because edit mode and h is ' + newLayout.h)
        newH = newLayout.h
      }
      if (mode !== 'edit' && newH !== newLayout.h) {
        // console.log('Resized ' + newLayout.i + ' from h ' + newLayout.h + ' to ' + newH)
        newLayout.h = newH
        onWidgetResize(newLayout)
      }
    }
  }

  if (!widget) {
    return <div/>
  }

  let backgroundColor: string = widget.options.backgroundColor || 'transparent'
  if (editMode) {
    backgroundColor = 'white'
  }

  return (
    <div
      className='c-d-Widget' style={{ backgroundColor }}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <Widget
        layout={layout}
        labels={labels}
        mode={mode}
        setMode={setMode}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onResize={onResize}
        onFullFocus={onFullFocus}
        onRestoreFocus={onRestoreFocus}
        myWidgets={myWidgets}
        widget={widget}
      />
    </div>
  )
}

WidgetContainer.propTypes = {
  currentBreakpoint: PT.oneOf<Breakpoint>(['sm','md','lg']).isRequired,
  editMode: PT.bool.isRequired,
  layout: PT.oneOf<Layout>([]).isRequired,
  labels: PT.oneOf<Labels>([]).isRequired,
  onWidgetUpdate: PT.func,
  onWidgetDelete: PT.func,
  onWidgetResize: PT.func,
  onWidgetFullFocus: PT.func,
  onWidgetRestoreFocus: PT.func,
  rowHeight: PT.number.isRequired,
  widget: PT.oneOf<IWidget>([]).isRequired
}

export default WidgetContainer
