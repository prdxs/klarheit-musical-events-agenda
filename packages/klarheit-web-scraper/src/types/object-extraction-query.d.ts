import { CSSSelector } from './css-selector';
import { ObjectExtractionQueryDescriptor } from './object-extraction-query-descriptor';
import { SelectionType } from './selection-type';

export interface ObjectExtractionQuery {
  selector?: CSSSelector;
  type?: SelectionType.Single;
  query: ObjectExtractionQueryDescriptor;
}
