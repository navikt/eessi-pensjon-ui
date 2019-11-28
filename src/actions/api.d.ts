declare module 'eessi-pensjon-ui/dist/api';

import {ApiCallProps} from './api'

export function fakeCall (props : ApiCallProps): Function;
export function realCall (props : ApiCallProps): Function;
export function call (props : ApiCallProps): Function;