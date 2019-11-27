import fetch from 'cross-fetch'
import { get as cookieGet } from 'browser-cookies'
import 'cross-fetch/polyfill'
import uuid from 'uuid/v4'
import * as types from '../constants/actionTypes'
import { IS_TEST } from '../constants/environment'
import { HOST } from '../constants/urls'
import { Dispatch } from 'redux'

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

  constructor(message?: string) {
    // 'Error' breaks prototype chain here
    super(message);

    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) { Object.setPrototypeOf(this, actualProto); }
    else { (this as any).__proto__ = actualProto; }
  }

}

export const fakeCall: Function = ({ context, expectedPayload, method, type, url } : ApiCallProps) => {
  return (dispatch: Dispatch) => {
    if (!IS_TEST) {
      /* istanbul ignore next */
      console.log('FAKE API REQUEST FOR ' + (method || 'GET') + ' ' + url)
    }
    dispatch({
      type: type.request
    })
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        const _payload = typeof expectedPayload === 'function' ? expectedPayload() : expectedPayload
        resolve(_payload)
      }, Math.floor(Math.random() * 2000))
    }).then(payload => {
      if (!IS_TEST) {
        /* istanbul ignore next */
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
      if (!IS_TEST) {
        /* istanbul ignore next */
        console.log(JSON.stringify(error))
      }
    })
    return promise
  }
}

export const realCall: Function = ({ body, context, cascadeFailureError, headers, method, payload, type, url }: ApiCallProps) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: type.request
    })
    let _body = body || payload
    _body = _body ? JSON.stringify(_body) : undefined
    const CSRF_PROTECTION = cookieGet('NAV_CSRF_PROTECTION')
      ? { NAV_CSRF_PROTECTION: cookieGet('NAV_CSRF_PROTECTION') }
      : {}
    return fetch(url, {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Request-ID': uuid(),
        ...CSRF_PROTECTION,
        ...headers
      },
      body: _body
    }).catch(error => {
      console.log(JSON.stringify(error))
    }).then(response => {
      if (response) {
        if (response.status >= 400) {
          const error = new ApiError(response.statusText)
          error.response = response
          error.status = response.status
          return response.json().then((json) => {
            error.message = json.message
            error.stackTrace = json.stackTrace
            throw error
          })
          .catch((error2) => {
            if (!IS_TEST) {
              /* istanbul ignore next */
              console.log(JSON.stringify(error2))
            }
            return Promise.reject(error)
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
      const _body = body || payload
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

export const call = HOST === 'localhost' && !IS_TEST ? fakeCall : realCall
