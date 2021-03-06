import { CSSSelector } from './css-selector';
import { SelectionType } from './selection-type';
import { ExtractionQueryDescriptor } from './extraction-query-descriptor'; 

export interface ArrayExtractionQuery {
  selector: CSSSelector;
  type: SelectionType.Multiple;
  query: ExtractionQueryDescriptor;
}
