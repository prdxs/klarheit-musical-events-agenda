import { AttributeExtractionQueryDescriptor } from './attribute-extraction-query-descriptor';
import { CSSSelector } from './css-selector';
import { SelectionType } from './selection-type';

export interface AttributeExtractionQuery {
  selector?: CSSSelector;
  type?: SelectionType.Single;
  query?: AttributeExtractionQueryDescriptor;
}
