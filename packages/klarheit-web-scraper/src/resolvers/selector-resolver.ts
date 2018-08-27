import { SelectionType, SelectorDescriptor } from '../types';

export const selectorResolver = (selector: SelectorDescriptor): SelectorDescriptor => {

  if (Array.isArray(selector)) {
    return selector;
  }

  return [ selector, SelectionType.Single ];
};
