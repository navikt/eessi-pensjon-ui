import { Labels } from 'declarations/types'
export type Breakpoint = 'lg' | 'md' | 'sm'

export interface BreakpointValues {
    lg: number;
    md: number;
    sm: number;
};

export interface Config {
    cols: BreakpointValues;
    breakpoints: BreakpointValues;
    margin: Array<number>;
    containerPadding: Array<number>;
    rowHeight: number;
    defaultTabIndex: number;
    version: number;
}

export interface DroppingItem {
    i: string;
    w: number;
    h: number;
}

export interface DroppedItem {
    x: number;
    y: number;
    w: number;
    h: number;
}

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

export type Layouts = Array<Layout>

export interface LayoutBody {
    lg: Layouts;
    md: Layouts;
    sm: Layouts;
}

export interface LayoutTab {
    label: string;
    body: LayoutBody
}

export type LayoutTabs = Array<LayoutTab>

export interface LayoutTemplate {
    minW: number;
    maxW: number;
    defaultW: number;
    minH: number;
    defaultH: number;
    maxH: number;
}

export type LayoutTemplates = {[breakpoint in Breakpoint]: LayoutTemplate}

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

export type Widgets = Array<Widget>

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

export type WidgetTemplates = Array<WidgetTemplate>;

export interface WidgetFC<T> extends React.FC<T> {
    properties: WidgetTemplate;
    edit?: any;
    propTypes: PropTypes.InferProps;
    defaultProps?: any;
}

export type WidgetMap = {[k: string]: WidgetFC};

export interface WidgetPlaceholder extends Widget {
    defaultLayout: {[k in Breakpoint]: LayoutTemplate};
}
