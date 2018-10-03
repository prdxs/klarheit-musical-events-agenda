import { ExtractionQuery } from './extraction-query';
import { ExtractionResult } from './extraction-result';

export interface Extractor {
  extract(rootNode: Document | HTMLElement, extrationQuery: ExtractionQuery): ExtractionResult;
}
