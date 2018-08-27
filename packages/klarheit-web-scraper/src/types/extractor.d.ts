import { ExtractionQuery, ExtractionResult } from "./command";

export interface Extractor {
  extract(rootNode: Document | HTMLElement, extrationQuery: ExtractionQuery): ExtractionResult;
}
