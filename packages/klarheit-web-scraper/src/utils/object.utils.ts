import { ClonerOptions } from '../types';

export const cloner = (object: object, options: ClonerOptions = {}) => {
  const { toMerge = [], toDelete = [] } = options;
  const clone = Object.assign({}, object, ...toMerge);

  toDelete.forEach((key: string) => delete clone[key]);
  return clone;
};

export const isObject = (object: any): object is object =>
  Object.prototype.toString.call(object) === '[object Object]';

export const isObjectEmpty = (object: object) =>
  isObject(object) && Object.keys(object).length === 0;
