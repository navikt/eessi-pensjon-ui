export interface Config {
    cols: {
        lg: number;
        md: number;
        sm: number;
    },
    breakpoints: {
        lg: number;
        md: number;
        sm: number;
    },
    margin: [number, number];
    containerPadding: [number, number];
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

export type Labels = {[key: string] : string}

export interface LayoutTemplate {
    minW: number;
    maxW: number;
    defaultW: number;
    minH: number;
    defaultH: number;
    maxH: number;
}

type Breakpoint = 'lg' | 'md' | 'sm'

export type LayoutTemplates = {[breakpoint in Breakpoint]: LayoutTemplate}

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

export type LayoutBody = {[breakpoint in Breakpoint]: Layouts}

export interface LayoutTab {
    label: string;
    body: LayoutBody
}

export type LayoutTabs = Array<LayoutTab>

export interface WidgetComponentProps {
    id ?: string;
    labels ?: Labels;
    layout ?: Layout;
    mode?: string;
    onFullFocus ?:(...args: any[]) => any;
    onRestoreFocus ?:(...args: any[]) => any;
    onResize?: (...args: any[]) => any;
    onUpdate?: (...args: any[]) => any;
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

export interface WidgetFC extends Function {
    properties: WidgetTemplate;
    edit?: any;
    propTypes: PropTypes.InferProps;
}

export interface WidgetEditFC extends Function {
    edit?: any;
    propTypes: PropTypes.InferProps;
}

export type WidgetMap = {[k: string]: WidgetFC};

export interface Widget {
    i: string;
    type: string;
    title: string;
    visible: boolean;
    options: {[prop: string]: any};
}

export interface WidgetPlaceholder extends Widget {
    defaultLayout: {[k in Breakpoint]: LayoutTemplate};
}

export type Widgets = Array<Widget>
