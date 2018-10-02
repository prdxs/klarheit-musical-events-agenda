import { CSSSelector } from './css-selector';
import { SelectionType } from './selection-type';
import { ExtractionQueryDescriptor } from './extraction-query-descriptor';

export interface ObjectExtractionQuery {
  selector?: CSSSelector | [ CSSSelector, SelectionType.Single ];
  query: ExtractionQueryDescriptor;
}
