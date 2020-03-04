import { get as cookieGet } from 'browser-cookies'
import * as types from 'constants/actionTypes'
import { IS_TEST, RUNNING_IN_BROWSER } from 'constants/environment'
import { HOST } from 'constants/urls'
import fetch from 'cross-fetch'
import 'cross-fetch/polyfill'
import { ActionWithPayload, MyThunkDispatch, ThunkResult } from 'declarations/types.d'
import { ActionCreator } from 'redux'
import uuid from 'uuid'

export interface ApiCallTypes {
  request: string;
  success: string;
  failure: string;
  forbidden?: string;
}

export interface ApiCallProps {
  body?: any;
  context?: any;
  cascadeFailureError?: boolean;
  expectedPayload?: any;
  headers?: any;
  method?: string;
  payload?: any;
  type: ApiCallTypes;
  url: string;
}

class ApiError extends Error {
  public response?: Response;
  public status?: number;
  public stackTrace?: any;
  constructor (message?: string) {
    // 'Error' breaks prototype chain here
    super(message)
    const actualProto = new.target.prototype
    Object.setPrototypeOf(this, actualProto)
  }
}

export const fakeCall: ActionCreator<ThunkResult<ActionWithPayload>> = ({
  context, expectedPayload, method, type, url
}: ApiCallProps): ThunkResult<ActionWithPayload> => {
  return (dispatch: MyThunkDispatch) => {
    const inTest = !RUNNING_IN_BROWSER && HOST === 'localhost'
    if (!inTest) {
      /* istanbul ignore next */
      console.log('FAKE API REQUEST FOR ' + (method || 'GET') + ' ' + url)
    }
    dispatch({
      type: type.request
    })
    const promise: Promise<ActionWithPayload> = new Promise((resolve) => {
      setTimeout(/* istanbul ignore next */ () => {
        const _payload = typeof expectedPayload === 'function' ? expectedPayload() : expectedPayload
        resolve(_payload)
      }, inTest ? 1 : /* istanbul ignore next */ Math.floor(Math.random() * 2000))
    }).then(payload => {
      /* istanbul ignore next */
      if (!inTest) {
        console.log('FAKE API SUCCESS FOR ' + (method || 'GET') + ' ' + url)
        /* istanbul ignore next */
        console.log('Payload', payload)
      }
      return dispatch({
        type: type.success,
        payload: payload,
        context: context
      })
    })
    promise.catch((error) => {
      /* istanbul ignore next */
      if (!IS_TEST) {
        console.error(JSON.stringify(error))
      }
    })
    return promise
  }
}

export const realCall: ActionCreator<ThunkResult<ActionWithPayload>> = ({
  body, context, cascadeFailureError, headers, method, payload, type, url
}: ApiCallProps): ThunkResult<ActionWithPayload> => {
  return (dispatch: MyThunkDispatch) => {
    dispatch({
      type: type.request
    })
    let _body: any = body || payload
    /* istanbul ignore next */
    _body = _body ? JSON.stringify(_body) : undefined
    /* istanbul ignore next */
    const CSRF_PROTECTION: {[k: string]: string | null} = cookieGet('NAV_CSRF_PROTECTION')
      ? { NAV_CSRF_PROTECTION: cookieGet('NAV_CSRF_PROTECTION') }
      : {}
    const now: number = new Date().getTime()
    const _url: string = url.match(/\?./) ? url + '&ts=' + now : url + '?ts=' + now
    return fetch(_url, {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Request-ID': uuid.v4(),
        ...CSRF_PROTECTION,
        ...headers
      },
      body: _body
    }).catch(/* istanbul ignore next */error => {
      console.error(JSON.stringify(error))
      return Promise.reject(error)
    }).then(response => {
      if (response) {
        if (response.status >= 400) {
          const apiError: ApiError = new ApiError(response.statusText)
          apiError.response = response
          apiError.status = response.status
          return response.json().then((json) => {
            apiError.message = json.message
            apiError.stackTrace = json.stackTrace
            throw apiError
          })
            .catch((error) => {
              if (!IS_TEST) {
              /* istanbul ignore next */
                console.error(JSON.stringify(error))
              }
              return Promise.reject(apiError)
            })
        } else {
          return response.json()
        }
      }
    }).then(payload => {
      return dispatch({
        type: type.success,
        payload: payload,
        originalPayload: body,
        context: context
      })
    }).catch(error => {
      const _body: any = body || payload
      if (error.status === 401) {
        dispatch({
          type: types.SERVER_UNAUTHORIZED_ERROR,
          payload: {
            error: error
          },
          originalPayload: _body,
          context: context
        })
        if (cascadeFailureError) {
          dispatch({
            type: type.failure,
            payload: {
              error: error
            },
            originalPayload: _body,
            context: context
          })
        }
      } else if (error.status === 403) {
        dispatch({
          type: type.forbidden || type.failure,
          payload: {
            error: error
          },
          originalPayload: _body,
          context: context
        })
      } else if (error.status >= 500) {
        dispatch({
          type: types.SERVER_INTERNAL_ERROR,
          payload: {
            error: error
          },
          originalPayload: _body,
          context: context
        })
        if (cascadeFailureError) {
          dispatch({
            type: type.failure,
            payload: {
              error: error
            },
            originalPayload: _body,
            context: context
          })
        }
      } else {
        return dispatch({
          type: type.failure,
          payload: {
            error: error
          },
          originalPayload: _body,
          context: context
        })
      }
    })
  }
}

export const call: Function = HOST === 'localhost' && !IS_TEST ? fakeCall : realCall
