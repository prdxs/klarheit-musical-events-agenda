import { Extractor } from './extractors';
import { ExtractionQuery, ExtractionResult } from './types';

export default class Klarheit {

  public extractionResult: ExtractionResult = null;

  constructor(private extractionQuery: ExtractionQuery) { }

  public extract(): ExtractionResult {
    const extractor = new Extractor(document, this.extractionQuery);
    const extractionResult = extractor.extract();

    this.extractionResult = extractionResult;

    return extractionResult;
  }
}
