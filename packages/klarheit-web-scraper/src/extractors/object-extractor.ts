import { CSSSelector, ExtractionResult, ObjectExtractionQuery } from '../types';
import { isObjectEmpty, qsFrom } from '../utils';
import { Extractor } from './extractor';

export class ObjectExtractor {

  constructor(private rootNode: Document | HTMLElement, private extractionQuery: ObjectExtractionQuery) { }

  public extract(): ExtractionResult {
    const { rootNode, extractionQuery, filterEmptyEntries } = this;
    const { selector, query } = extractionQuery;
    const node = selector ? qsFrom(rootNode)(selector as CSSSelector) : rootNode;
    const extractionResult = Object.entries(query).reduce((extraction, [key, innerExtractionQuery]): object => {
      const extractor = new Extractor(node, innerExtractionQuery);
      return Object.assign(extraction, { [key]: extractor.extract() });
    }, {});

    return filterEmptyEntries(extractionResult);
  }

  private filterEmptyEntries(extractionResult: ExtractionResult): ExtractionResult {
    return Object.entries(extractionResult).reduce((filteredExtractionResult, [ key, value ]) => {
      const isEmptyString = typeof value === 'string' && value.length === 0;
      const isEmptyObject = isObjectEmpty(value as object);
      if (isEmptyString || isEmptyObject) {
        return filteredExtractionResult;
      }
      return Object.assign(filteredExtractionResult, { [key]: value });
    }, {});
  }
}
