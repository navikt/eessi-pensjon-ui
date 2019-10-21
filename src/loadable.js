import Loadable from 'react-loadable'
import WaitingPanel from './components/WaitingPanel/WaitingPanel'

const MyLoadable = (opts) => {
  return Loadable(Object.assign({
    loading: WaitingPanel,
    delay: 200,
    timeout: 10000
  }, opts))
}
export default MyLoadable
