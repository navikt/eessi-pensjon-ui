import React from 'react'
import Container from './Container'
import Dashboard from '../applications/Dashboard/Dashboard'
import { Normaltekst, Panel, Systemtittel } from '../Nav'
import Icons from '../components/Icons/Icons'
import { Undertittel } from 'nav-frontend-typografi'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const DashboardPage = () => {
  return (
    <Container className='w-100'>
      <Panel className='p-4 w-100'>
        <Systemtittel className='mt-4 mb-4'>Dashboard application</Systemtittel>
        <Normaltekst className='mt-4 mb-4'>The Dashboard application is a grid-based layout panel where you can place your <strong>widgets</strong>, in a similiar way as one can organize window applications in a desktop.</Normaltekst>
        <ul className='mt-4 mb-4'>
          <li>Responsive, with different layouts for phone, tablet and desktop sizes (sm, md and lg)</li>
          <li>Saves your custom layouts into your browser's local storage.</li>
          <li>Add, remove, resize and move any widgets.</li>
          <li>Have several dashboards running at the same time. </li>
          <li>Add your own applications as custom widgets.</li>
        </ul>

        <Undertittel className='mt-4 mb-4'>Simple dashboard</Undertittel>
        <Normaltekst>The default Dashboard renders a default panel with 3 widgets: a <strong>notes</strong> widget, a <strong>smiley</strong> widget and a <strong>cat</strong> midget.</Normaltekst>
        <Normaltekst>Click on the <Icons kind='settings' /> icon to enter <strong>edit</strong> mode. Here you can resize the widgets, delete them, or add new from a given list of default widgets.</Normaltekst>
        <Normaltekst className='mb-4'>There is a mandatory property, <code>id</code>, which is used to namespace the localStorage item when saving custom configurations.</Normaltekst>
        <Dashboard
          id='eessi-pensjon-ui-demo-1'
        />

        <SyntaxHighlighter language='javascript' style={prism}>
          {'<Dashboard id=\'eessi-pensjon-ui-demo-1\'/>'}
        </SyntaxHighlighter>

        <Undertittel className='mt-4 mb-4'>Custom dashboard</Undertittel>
        <Normaltekst>This custom dashboard illustrates how the dashboard layout object looks like:</Normaltekst>
        <ul className='mt-4 mb-4'>
          <li>Object keys are tab labels; if only key is used, the tabs are not shown</li>
          <li>There are 3 default breakpoints: <code>sm</code>, <code>md</code> and <code>lg</code> (they can be changed in the Dashboard configuration object) </li>
          <li>Each breakpoint has a list of widgets, which contain:
            <ul>
              <li><code>i</code>, the widget ID (matched in the widget configuration object)</li>
              <li><code>x</code>, the horizontal position</li>
              <li><code>y</code>, the vertical position</li>
              <li><code>w</code>, the widget width</li>
              <li><code>h</code>, the widget height (conditioned to widget resize)</li>
              <li><code>minW</code>, the minimum widget width</li>
              <li><code>maxW</code>, the maximum widget width</li>
              <li><code>minH</code>, the minimum widget height</li>
              <li><code>maxH</code>, the maximum widget height</li>
            </ul>
          </li>
        </ul>
        <Dashboard
          id='eessi-pensjon-ui-demo-2'
          defaultLayout={[{
            label: 'Side 1',
            body: {
              lg: [
                { i: 'w-1-note', x: 0, y: 0, w: 4, h: 5, minW: 4, maxW: 6, minH: 5, maxH: 999 }
              ],
              md: [
                { i: 'w-1-note', x: 0, y: 0, w: 2, h: 6, minW: 2, maxW: 3, minH: 1, maxH: 999 }
              ],
              sm: [
                { i: 'w-1-note', x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 999 }
              ]
            }
          }, {
            label: 'Side 2',
            body: {
              lg: [
                { i: 'w-2-smiley', x: 0, y: 0, w: 4, h: 5, minW: 4, maxW: 6, minH: 5, maxH: 999 }
              ],
              md: [
                { i: 'w-2-smiley', x: 0, y: 0, w: 2, h: 6, minW: 2, maxW: 3, minH: 1, maxH: 999 }
              ],
              sm: [
                { i: 'w-2-smiley', x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 999 }
              ]
            }
          }, {
            label: 'Side 3',
            body: {
              lg: [
                { i: 'w-3-cat', x: 0, y: 0, w: 4, h: 5, minW: 4, maxW: 6, minH: 5, maxH: 999 }
              ],
              md: [
                { i: 'w-3-cat', x: 0, y: 0, w: 2, h: 6, minW: 2, maxW: 3, minH: 1, maxH: 999 }
              ],
              sm: [
                { i: 'w-3-cat', x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 999 }
              ]
            }
          }]}
          defaultWidgets={[{
            i: 'w-1-note',
            type: 'note',
            title: 'Note widget',
            visible: true,
            options: {
              backgroundColor: 'yellow',
              content: '<ul><li>Eggs</li><li>Milk</li><li>Bread</li></ul>'
            }
          }, {
            i: 'w-2-smiley',
            type: 'smiley',
            title: 'Smiley widget',
            visible: true,
            options: {
              mood: '😁'
            }
          }, {
            i: 'w-3-cat',
            type: 'cat',
            title: 'Cat midget',
            visible: true,
            options: {}
          }]}
          defaultConfig={{
            cols: { lg: 12, md: 3, sm: 1 },
            breakpoints: { lg: 900, md: 600, sm: 0 },
            margin: [10, 10],
            containerPadding: [10, 10],
            rowHeight: 30,
            defaultTabIndex: 0,
            version: 1
          }}
          defaultTabIndex={0}
          allowedWidgets={['cat', 'smiley', 'note']}
        />

        <SyntaxHighlighter language='javascript' style={prism}>
          {'<Dashboard\n' +
          '  id=\'eessi-pensjon-ui-demo\'\n' +
          '  defaultLayout={{\n' +
          '  \'Side 1\': {\n' +
          '    lg: [\n' +
          '      { i: \'w-1-note\', x: 0, y: 0, w: 4, h: 5, minW: 4, maxW: 6, minH: 5, maxH: 999 }\n' +
          '    ],\n' +
          '    md: [\n' +
          '      { i: \'w-1-note\', x: 0, y: 0, w: 2, h: 6, minW: 2, maxW: 3, minH: 1, maxH: 999 }\n' +
          '    ],\n' +
          '    sm: [\n' +
          '      { i: \'w-1-note\', x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 999 }\n' +
          '    ]\n' +
          '  },\n' +
          '  \'Side 2\': {\n' +
          '    lg: [\n' +
          '      { i: \'w-2-smiley\', x: 0, y: 0, w: 4, h: 5, minW: 4, maxW: 6, minH: 5, maxH: 999 }\n' +
          '    ],\n' +
          '    md: [\n' +
          '      { i: \'w-2-smiley\', x: 0, y: 0, w: 2, h: 6, minW: 2, maxW: 3, minH: 1, maxH: 999 }\n' +
          '    ],\n' +
          '    sm: [\n' +
          '      { i: \'w-2-smiley\', x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 999 }\n' +
          '    ]\n' +
          '  },\n' +
          '  \'Side 3\': {\n' +
          '    lg: [\n' +
          '      { i: \'w-3-cat\', x: 0, y: 0, w: 4, h: 5, minW: 4, maxW: 6, minH: 5, maxH: 999 }\n' +
          '    ],\n' +
          '    md: [\n' +
          '      { i: \'w-3-cat\', x: 0, y: 0, w: 2, h: 6, minW: 2, maxW: 3, minH: 1, maxH: 999 }\n' +
          '    ],\n' +
          '    sm: [\n' +
          '      { i: \'w-3-cat\', x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 999 }\n' +
          '    ]\n' +
          '  }}\n' +
          '  defaultWidgets={[{\n' +
          '    i: \'w-1-note\',\n' +
          '    type: \'note\',\n' +
          '    title: \'Note widget\',\n' +
          '    visible: true,\n' +
          '    options: {\n' +
          '      backgroundColor: \'yellow\',\n' +
          '      content: \'<ul><li>Eggs</li><li>Milk</li><li>Bread</li></ul>\'\n' +
          '    }\n' +
          '  }, {\n' +
          '    i: \'w-2-smiley\',\n' +
          '    type: \'smiley\',\n' +
          '    title: \'Smiley widget\',\n' +
          '    visible: true,\n' +
          '    options: {\n' +
          '      mood: \'😁\'\n' +
          '    }\n' +
          '  }, {\n' +
          '    i: \'w-3-cat\',\n' +
          '    type: \'cat\',\n' +
          '    title: \'Cat midget\',\n' +
          '    visible: true,\n' +
          '    options: {}\n' +
          '  }]}' +
          '  defaultConfig={{\n' +
          '    cols: { lg: 12, md: 3, sm: 1 },\n' +
          '    breakpoints: { lg: 900, md: 600, sm: 0 },\n' +
          '    margin: [10, 10],\n' +
          '    containerPadding: [10, 10],\n' +
          '    rowHeight: 30,\n' +
          '    defaultTabIndex: 0,\n' +
          '    version: 1\n' +
          '  }}' +
          '  defaultTabIndex={0}\n' +
          '  allowedWidgets={[\'cat\', \'smiley\', \'note\']}\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={prism}>
          {'import { Dashboard } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-dashboard</code></Normaltekst>

        <Undertittel className='pt-4 pb-4'>React props</Undertittel>
        <table className='tabell'>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>afterLayoutChange</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function triggered everytime the dashboard layout changes.</td>
              <td>-</td>
            </tr>
            <tr>
              <td>allowedWidgets</td>
              <td><code>list</code></td>
              <td>false</td>
              <td>List of allowed Dashboard widgets. You will be able to only add those widgets to the dashboard, and you will only be able to see these widget types. By default, you are allowed to see/add all types of widgets.</td>
              <td>-</td>
            </tr>
            <tr>
              <td>defaultConfig</td>
              <td><code>list</code></td>
              <td>false</td>
              <td>Dashboard configuration object that overrides the default configuration. Useful for margin/padding/styling/breakpoint set</td>
              <td>-</td>
            </tr>
            <tr>
              <td>defaultLayout</td>
              <td><code>object</code></td>
              <td>false</td>
              <td>Dashboard layout object that overrides the default layout.</td>
              <td>-</td>
            </tr>
            <tr>
              <td>defaultTaIndex</td>
              <td><code>number</code></td>
              <td>false</td>
              <td>Active dashboard tab index, if there is more than one dashboard in the dashboard layout.</td>
              <td>-</td>
            </tr>
            <tr>
              <td>defaultWidgets</td>
              <td><code>list</code></td>
              <td>false</td>
              <td>Dashboard widgets configuration that overrides the default widgets.</td>
              <td>-</td>
            </tr>
            <tr>
              <td>extraWidgets</td>
              <td><code>object</code></td>
              <td>false</td>
              <td>Append your custom Widgets to the dashboard</td>
              <td>-</td>
            </tr>
            <tr>
              <td>id</td>
              <td><code>string</code></td>
              <td>true</td>
              <td>Dashboard ID used to namespace the localStorage items for future use</td>
              <td>-</td>
            </tr>
            <tr>
              <td>labels</td>
              <td><code>object</code></td>
              <td>true</td>
              <td>Optional label object used to override default labels.</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default DashboardPage
