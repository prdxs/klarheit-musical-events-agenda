import { GeneralExtractor } from './extractors';
import { ExtractionQuery, ExtractionResult, Extractor } from './types';

export default class Klarheit implements Extractor {

  constructor(private rootNode: Document | HTMLElement = document, private extractionQuery: ExtractionQuery) { }

  public extract(): ExtractionResult {
    const extractor = new GeneralExtractor(document, this.extractionQuery);
    const extractionResult = extractor.extract();

    return extractionResult;
  }
}
