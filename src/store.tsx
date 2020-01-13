import React, { useContext, createContext, Context, ReactNode, Reducer } from 'react'
import { State, Action } from 'declarations/types'
import useThunkReducer from 'react-hook-thunk-reducer'

const Store: Context<any> = createContext({})
const useStore = () => useContext(Store)

interface StoreProviderProps {
  reducer: Reducer<State, Action>;
  initialState: State;
  children: ReactNode;
}

export const StoreProvider = ({ reducer, initialState, children }: StoreProviderProps) => {
  const [state, dispatch] = useThunkReducer(reducer, initialState)
  return (
    <Store.Provider value={[state, dispatch]}>
      {children}
    </Store.Provider>
  )
}

const bindActionCreator = (actionCreator : any, dispatch : any) => {
  return (...args : any) => {
    // @ts-ignore
    return dispatch(actionCreator.apply(this, args))
  }
}

export const bindActionCreators = (actionCreators: any, dispatch: any) => {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  if (typeof actionCreators === 'object') {
    const keys = Object.keys(actionCreators)
    const boundActionCreators: any = {}
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const actionCreator = actionCreators[key]
      if (typeof actionCreator === 'function') {
        boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
      }
    }
    return boundActionCreators
  }
  return {}
}

export const connect = (
  mapStateToProps: Function,
  mapDispatchToProps: Function
) => (WrappedComponent : any) => {
  return (props : any) => {
    const [state, dispatch]: any = useStore()
    return (
      <WrappedComponent
        {...props}
        dispatch={dispatch}
        {...mapStateToProps(state, props)}
        {...mapDispatchToProps(dispatch, props)}
      />
    )
  }
}
