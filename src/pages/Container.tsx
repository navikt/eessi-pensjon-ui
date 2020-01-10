import { PageProps } from 'pages/index'
import React from 'react'
import { State, Dispatch, ActionCreators } from 'types.d'
import { Lenke, Systemtittel, UndertekstBold } from '../Nav'
import { connect, bindActionCreators } from '../store'
import * as uiActions from '../actions/ui'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import './Container.css'
import { ReactComponent as NavLogo } from '../resources/images/nav.svg'

const mapStateToProps = (state: State) => ({ highContrast: state.highContrast })
const mapDispatchToProps = (dispatch: Dispatch) => ({ actions: bindActionCreators(uiActions, dispatch) })
export interface ContainerProps {
  actions: ActionCreators;
  className?: string;
  children: React.ReactNode;
}
const Container: React.FC<ContainerProps & PageProps> = ({
  actions, className, children, highContrast
}: ContainerProps & PageProps): JSX.Element => {
  return (
    <div className={classNames('_container', { highContrast: highContrast }, className)}>
      <aside>
        <nav>

          <div className='pb-3 ml-3'>
            <Link style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }} to='/'>
              <NavLogo className='pb-3' />
              <img
                alt='logo' className='eessi-pensjon-logo'
                src={require('../resources/images/earth.png')}
              />
            </Link>
            <UndertekstBold><Link className='p-0' to='/'>EESSI Pensjon UI</Link></UndertekstBold>
          </div>
          <Systemtittel className='pb-3'>Applications</Systemtittel>
          <ul className='pb-3'>
            <li><Link to='/Dashboard'>Dashboard</Link></li>
            <li><Link to='/PDFEditor'>PDF editor</Link></li>
          </ul>
          <Systemtittel className='pb-3'>Components</Systemtittel>
          <ul className='pb-3'>
            <li><Link to='/Alert'>Alert</Link></li>
            <li><Link to='/Banner'>Banner</Link></li>
            <li><Link to='/ColorPicker'>Color picker</Link></li>
            <li><Link to='/CountryUtils'>Country utils</Link></li>
            <li><Link to='/DatePicker'>Date picker</Link></li>
            <li><Link to='/ExpandingPanel'>Expanding panel</Link></li>
            <li><Link to='/File'>File</Link></li>
            <li><Link to='/FileUpload'>File upload</Link></li>
            <li><Link to='/Flag'>Flag</Link></li>
            <li><Link to='/Icons'>Icons</Link></li>
            <li><Link to='/Modal'>Modal</Link></li>
            <li><Link to='/MultipleSelect'>Multiple select</Link></li>
            <li><Link to='/Nav'>Nav elements</Link></li>
            <li><Link to='/Pagination'>Pagination</Link></li>
            <li><Link to='/PostalCodes'>Postal codes</Link></li>
            <li><Link to='/ProgressBar'>Progress bar</Link></li>
            <li><Link to='/RefreshButton'>Refresh button</Link></li>
            <li><Link to='/TableSorter'>Table sorter</Link></li>
            <li><Link to='/WaitingPanel'>Waiting panel</Link></li>
          </ul>
        </nav>
      </aside>
      <article className={classNames('body', className)}>
        <div className='d-flex flex-row justify-content-end'>
          <Lenke
            id='highcontrast-link-id'
            className='highcontrast-link mt-3 mr-3'
            href='#highContrast'
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              actions.setHighContrast()
            }}
          >
          high contrast
          </Lenke>
        </div>
        {children}
      </article>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
