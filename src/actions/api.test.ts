import * as api from './api'
import configureMockStore, {MockStoreEnhanced } from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

const mockStore = configureMockStore([thunk])

describe('actions/api', () => {
  let store: MockStoreEnhanced<unknown, {}>

  beforeEach(() => {
    store = mockStore({})
  })

  it('call() with fake url and 404 response', () => {
    nock('http://mockedurl')
      .get('/')
      .reply(404, 'nope')

    return store.dispatch(api.realCall({
      url: 'http://mockedurl',
      type: {
        request: 'REQUEST',
        success: 'SUCCESS',
        failure: 'FAILURE'
      }
    }))
      .then(() => {
        const expectedActions = store.getActions()
        expect(expectedActions.length).toBe(2)
        expect(expectedActions[0]).toHaveProperty('type', 'REQUEST')
        expect(expectedActions[1]).toHaveProperty('type', 'FAILURE')
      })
  })

  it('call() with fake url and 200 response', () => {
    nock('http://mockedurl')
      .get('/')
      .reply(200, { foo: 'bar' })

    return store.dispatch(api.realCall({
      url: 'http://mockedurl/',
      type: {
        request: 'REQUEST',
        success: 'SUCCESS',
        failure: 'FAILURE'
      }
    }))
      .then(() => {
        const expectedActions = store.getActions()
        expect(expectedActions.length).toBe(2)
        expect(expectedActions[0]).toHaveProperty('type', 'REQUEST')
        expect(expectedActions[1]).toHaveProperty('type', 'SUCCESS')
      })
  })

  it('call() with fake url and 500 response', () => {
    nock('http://mockedurl')
      .get('/')
      .reply(500, { message: 'error' })

    return store.dispatch(api.realCall({
      url: 'http://mockedurl/',
      type: {
        request: 'REQUEST',
        success: 'SUCCESS',
        failure: 'FAILURE'
      }
    }))
      .then(() => {
        const expectedActions = store.getActions()
        expect(expectedActions.length).toBe(2)
        expect(expectedActions[0]).toHaveProperty('type', 'REQUEST')
        expect(expectedActions[1]).toHaveProperty('type', 'SERVER/INTERNAL/ERROR')
      })
  })

  it('call() with fake url, 500 response and cascading failure error', () => {
    nock('http://mockedurl')
      .get('/')
      .reply(500, { message: 'unauthorized' })

    return store.dispatch(api.realCall({
      url: 'http://mockedurl/',
      cascadeFailureError: true,
      type: {
        request: 'REQUEST',
        success: 'SUCCESS',
        failure: 'FAILURE'
      }
    }))
      .then(() => {
        const expectedActions = store.getActions()
        expect(expectedActions.length).toBe(3)
        expect(expectedActions[0]).toHaveProperty('type', 'REQUEST')
        expect(expectedActions[1]).toHaveProperty('type', 'SERVER/INTERNAL/ERROR')
        expect(expectedActions[2]).toHaveProperty('type', 'FAILURE')
      })
  })

  it('call() with fake url and 401 response', () => {
    nock('http://mockedurl')
      .get('/')
      .reply(401, { message: 'unauthorized' })

    return store.dispatch(api.realCall({
      url: 'http://mockedurl/',
      type: {
        request: 'REQUEST',
        success: 'SUCCESS',
        failure: 'FAILURE'
      }
    }))
      .then(() => {
        const expectedActions = store.getActions()
        expect(expectedActions.length).toBe(2)
        expect(expectedActions[0]).toHaveProperty('type', 'REQUEST')
        expect(expectedActions[1]).toHaveProperty('type', 'SERVER/UNAUTHORIZED/ERROR')
      })
  })

  it('call() with fake url and 403 response with a forbidden action', () => {
    nock('http://mockedurl')
      .get('/')
      .reply(403, { message: 'no way jose' })

    return store.dispatch(api.realCall({
      url: 'http://mockedurl/',
      type: {
        request: 'REQUEST',
        success: 'SUCCESS',
        failure: 'FAILURE',
        forbidden: 'FORBIDDEN'
      }
    }))
      .then(() => {
        const expectedActions = store.getActions()
        expect(expectedActions.length).toBe(2)
        expect(expectedActions[0]).toHaveProperty('type', 'REQUEST')
        expect(expectedActions[1]).toHaveProperty('type', 'FORBIDDEN')
      })
  })

  it('call() with fake url and 403 response with standard failure action', () => {
    nock('http://mockedurl')
      .get('/')
      .reply(403, { message: 'no way jose' })

    return store.dispatch(api.realCall({
      url: 'http://mockedurl/',
      type: {
        request: 'REQUEST',
        success: 'SUCCESS',
        failure: 'FAILURE'
      }
    }))
      .then(() => {
        const expectedActions = store.getActions()
        expect(expectedActions.length).toBe(2)
        expect(expectedActions[0]).toHaveProperty('type', 'REQUEST')
        expect(expectedActions[1]).toHaveProperty('type', 'FAILURE')
      })
  })

  it('call() with fake url, 401 response and cascadeFailureError', () => {
    nock('http://mockedurl')
      .get('/')
      .reply(401, { message: 'unauthorized' })

    return store.dispatch(api.realCall({
      url: 'http://mockedurl/',
      cascadeFailureError: true,
      type: {
        request: 'REQUEST',
        success: 'SUCCESS',
        failure: 'FAILURE'
      }
    }))
      .then(() => {
        const expectedActions = store.getActions()
        expect(expectedActions.length).toBe(3)
        expect(expectedActions[0]).toHaveProperty('type', 'REQUEST')
        expect(expectedActions[1]).toHaveProperty('type', 'SERVER/UNAUTHORIZED/ERROR')
        expect(expectedActions[2]).toHaveProperty('type', 'FAILURE')
      })
  })

  it('fakeCall()', async (done) => {
    const mockedPayload = { foo: 'bar' }
    store.dispatch(api.fakeCall({
      url: 'http://mockedurl/',
      type: {
        request: 'REQUEST',
        success: 'SUCCESS',
        failure: 'FAILURE'
      },
      expectedPayload: mockedPayload
    })).then(() => {
      const expectedActions = store.getActions()
      expect(expectedActions.length).toBe(2)
      expect(expectedActions[0]).toHaveProperty('type', 'REQUEST')
      expect(expectedActions[1]).toHaveProperty('type', 'SUCCESS')
      expect(expectedActions[1]).toHaveProperty('payload', mockedPayload)
      done()
    })
  })

  it('decides to use call as we are in localhost and test env', () => {
    expect(api.call.name).toEqual('realCall')
  })

  it('decides to use fakeCall as we are in localhost and NOT test env', () => {
    jest.resetModules()
    jest.mock('constants/urls', () => {
      return { HOST: 'localhost' }
    })
    jest.mock('constants/environment', () => {
      return { IS_TEST: false }
    })
    const newApi = require('actions/api')
    expect(newApi.call.name).toEqual('fakeCall')

    store.dispatch(newApi.call({
      url: 'http://mockedurl/',
      type: {
        request: 'REQUEST',
        success: 'SUCCESS',
        failure: 'FAILURE'
      },
      expectedPayload: 'mockedPayload'
    }))
  })
})
