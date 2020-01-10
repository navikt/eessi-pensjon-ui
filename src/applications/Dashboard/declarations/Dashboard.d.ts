import PT from 'prop-types'
import { Labels } from 'types.d'
export type Breakpoint = 'lg' | 'md' | 'sm'

export const BreakpointPropType = PT.oneOf<Breakpoint>(['lg', 'md', 'sm'])

export interface BreakpointValues {
    lg: number;
    md: number;
    sm: number;
};

export const BreakpointValuesPropType = PT.shape({
  lg: PT.number.isRequired,
  md: PT.number.isRequired,
  sm: PT.number.isRequired
})

export interface Config {
    cols: BreakpointValues;
    breakpoints: BreakpointValues;
    margin: Array<number>;
    containerPadding: Array<number>;
    rowHeight: number;
    defaultTabIndex: number;
    version: number;
}

function tuple (typeCheckers: Function[]) {
  return PT.arrayOf(
    function (value, index, ...rest) {
      return typeCheckers[index](value, index, ...rest)
    }
  )
}

export const ConfigPropType = PT.shape({
  cols: BreakpointValuesPropType.isRequired,
  breakpoints: BreakpointValuesPropType.isRequired,
  margin: PT.arrayOf(PT.number.isRequired).isRequired,
  containerPadding: PT.arrayOf(PT.number.isRequired).isRequired,
  rowHeight: PT.number.isRequired,
  defaultTabIndex: PT.number.isRequired,
  version: PT.number.isRequired
})

export interface DroppingItem {
    i: string;
    w: number;
    h: number;
}

export const DroppingItemPropType = PT.shape({
  i: PT.string.isRequired,
  w: PT.number.isRequired,
  h: PT.number.isRequired
})

export interface DroppedItem {
    x: number;
    y: number;
    w: number;
    h: number;
}

export const DroppedItemPropType = PT.shape({
  x: PT.number.isRequired,
  y: PT.number.isRequired,
  w: PT.number.isRequired,
  h: PT.number.isRequired
})

export interface Layout {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    minW: number;
    maxW: number;
    minH: number;
    maxH: number
}

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

export type Layouts = Array<Layout>

export const LayoutsPropType = PT.arrayOf(LayoutPropType.isRequired)

export interface LayoutBody {
    lg: Layouts;
    md: Layouts;
    sm: Layouts;
}

export const LayoutBodyPropType = PT.shape({
  lg: LayoutsPropType.isRequired,
  md: LayoutsPropType.isRequired,
  sm: LayoutsPropType.isRequired
})

export interface LayoutTab {
    label: string;
    body: LayoutBody
}

export const LayoutTabPropType = PT.shape({
  label: PT.string.isRequired,
  body: LayoutBodyPropType.isRequired
})

export type LayoutTabs = Array<LayoutTab>

export const LayoutTabsPropType = PT.arrayOf(LayoutTabPropType.isRequired)

export interface LayoutTemplate {
    minW: number;
    maxW: number;
    defaultW: number;
    minH: number;
    defaultH: number;
    maxH: number;
}

export const LayoutTemplatePropType = PT.shape({
  minW: PT.number.isRequired,
  maxW: PT.number.isRequired,
  defaultW: PT.number.isRequired,
  minH: PT.number.isRequired,
  defaultH: PT.number.isRequired,
  maxH: PT.number.isRequired
})

export type LayoutTemplates = {[breakpoint in Breakpoint]: LayoutTemplate}

export const LayoutTemplatesPropType = PT.shape({
  lg: LayoutTemplatePropType.isRequired,
  md: LayoutTemplatePropType.isRequired,
  sm: LayoutTemplatePropType.isRequired
})

export interface Size {
    width?: number;
    height?: number;
}

export type Sizes = {[k in Breakpoint]: Size}

export interface Widget {
    i: string;
    type: string;
    title: string;
    visible: boolean;
    options: {[prop: string]: any};
}

export const WidgetPropType = PT.shape({
  i: PT.string.isRequired,
  type: PT.string.isRequired,
  title: PT.string.isRequired,
  visible: PT.bool.isRequired,
  options: PT.object.isRequired
})

export type Widgets = Array<Widget>

export const WidgetsPropType = PT.arrayOf(WidgetPropType.isRequired)

export interface WidgetProps {
    id ?: string;
    labels ?: Labels;
    layout?: Layout;
    mode ?: string;
    onFullFocus ?: () => void;
    onRestoreFocus ?: () => void;
    onResize?: (w?: number, h?: number) => void;
    onUpdate?: (w: Widget) => void;
    widget: Widget;
}

export interface WidgetTemplate {
    type: string;
    title: string;
    description: string;
    layout: LayoutTemplates;
    options: any
}
export const WidgetTemplatePropType = PT.shape({
  type: PT.string.isRequired,
  title: PT.string.isRequired,
  layout: LayoutTemplatesPropType.isRequired,
  description: PT.string.isRequired,
  options: PT.object.isRequired
})

export type WidgetTemplates = Array<WidgetTemplate>;

export const WidgetTemplatesPropType = PT.arrayOf(WidgetTemplatePropType.isRequired)

export interface WidgetFC<T> extends React.FC<T> {
    properties: WidgetTemplate;
    edit?: any;
    propTypes: PropTypes.InferProps;
    defaultProps?: any;
}

export type WidgetMap = {[k: string]: WidgetFC};

export const WidgetMapPropType = PT.object

export interface WidgetPlaceholder extends Widget {
    defaultLayout: {[k in Breakpoint]: LayoutTemplate};
}
