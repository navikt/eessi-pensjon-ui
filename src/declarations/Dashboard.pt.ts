import { Breakpoint } from 'declarations/Dashboard'
import PT from 'prop-types'

export const BreakpointPropType = PT.oneOf<Breakpoint>(['lg', 'md', 'sm'])

export const BreakpointValuesPropType = PT.shape({
  lg: PT.number.isRequired,
  md: PT.number.isRequired,
  sm: PT.number.isRequired
})

export const ConfigPropType = PT.shape({
  cols: BreakpointValuesPropType.isRequired,
  breakpoints: BreakpointValuesPropType.isRequired,
  margin: PT.arrayOf(PT.number.isRequired).isRequired,
  containerPadding: PT.arrayOf(PT.number.isRequired).isRequired,
  rowHeight: PT.number.isRequired,
  defaultTabIndex: PT.number.isRequired,
  version: PT.number.isRequired
})

export const DroppingItemPropType = PT.shape({
  i: PT.string.isRequired,
  w: PT.number.isRequired,
  h: PT.number.isRequired
})

export const DroppedItemPropType = PT.shape({
  x: PT.number.isRequired,
  y: PT.number.isRequired,
  w: PT.number.isRequired,
  h: PT.number.isRequired
})

export const LayoutPropType = PT.shape({
  i: PT.string.isRequired,
  x: PT.number.isRequired,
  y: PT.number.isRequired,
  w: PT.number.isRequired,
  h: PT.number.isRequired,
  minW: PT.number.isRequired,
  maxW: PT.number.isRequired,
  minH: PT.number.isRequired,
  maxH: PT.number.isRequired
})

export const LayoutsPropType = PT.arrayOf(LayoutPropType.isRequired)

export const LayoutBodyPropType = PT.shape({
  lg: LayoutsPropType.isRequired,
  md: LayoutsPropType.isRequired,
  sm: LayoutsPropType.isRequired
})

export const LayoutTabPropType = PT.shape({
  label: PT.string.isRequired,
  body: LayoutBodyPropType.isRequired
})

export const LayoutTabsPropType = PT.arrayOf(LayoutTabPropType.isRequired)

export const LayoutTemplatePropType = PT.shape({
  minW: PT.number.isRequired,
  maxW: PT.number.isRequired,
  defaultW: PT.number.isRequired,
  minH: PT.number.isRequired,
  defaultH: PT.number.isRequired,
  maxH: PT.number.isRequired
})

export const LayoutTemplatesPropType = PT.shape({
  lg: LayoutTemplatePropType.isRequired,
  md: LayoutTemplatePropType.isRequired,
  sm: LayoutTemplatePropType.isRequired
})

export const WidgetPropType = PT.shape({
  i: PT.string.isRequired,
  type: PT.string.isRequired,
  title: PT.string.isRequired,
  visible: PT.bool.isRequired,
  options: PT.object.isRequired
})

export const WidgetsPropType = PT.arrayOf(WidgetPropType.isRequired)

export const WidgetTemplatePropType = PT.shape({
  type: PT.string.isRequired,
  title: PT.string.isRequired,
  layout: LayoutTemplatesPropType.isRequired,
  description: PT.string.isRequired,
  options: PT.object.isRequired
})

export const WidgetTemplatesPropType = PT.arrayOf(WidgetTemplatePropType.isRequired)

export const WidgetMapPropType = PT.object
