import { Action } from 'redux'

export type Labels = {[k in string]? : string}

export interface ErrorPayload<T = any> {
  error: T
}

export interface ActionWithPayload<T = any> extends Action {
  originalPayload?: any;
  context?: any;
  payload: T;
}

export interface File {
  id?: string | null;
  size: number;
  name: string;
  numPages?: number | null | undefined;
  mimetype: string;
  content: {
    md5?: string | null;
    text?: string | null;
    base64?: string | null;
  }
}

export type Files = Array<File>