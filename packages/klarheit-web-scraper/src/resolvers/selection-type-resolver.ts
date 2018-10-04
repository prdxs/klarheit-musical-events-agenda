import { ExtractionQuery, SelectionType } from '../types';
import { cloner } from '../utils';

export const selectionTypeResolver = (extractionQuery: ExtractionQuery) => {
  const hasType = Boolean(extractionQuery.type);
  const clonerOptions = hasType ? {} : { toMerge: [{ type: SelectionType.Single }] };
  const clone = cloner(extractionQuery, clonerOptions);

  return clone;
};
