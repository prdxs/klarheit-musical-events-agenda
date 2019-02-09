import Mole from '..';
import { CSSSelector, ExtractionResult, Extractor, ObjectExtractionQuery } from '../types';
import { isObjectEmpty, qsFrom } from '../utils';

export class ObjectExtractor implements Extractor {

  private static filterEmptyEntries(extractionResult: ExtractionResult): ExtractionResult {
    return Object.entries(extractionResult).reduce((filteredExtractionResult, [ key, value ]) => {
      const isEmptyString = typeof value === 'string' && value.length === 0;
      const isEmptyObject = isObjectEmpty(value);
      if (isEmptyString || isEmptyObject) {
        return filteredExtractionResult;
      }
      return Object.assign(filteredExtractionResult, { [key]: value });
    }, {});
  }

  constructor(private rootNode: Document | HTMLElement, private extractionQuery: ObjectExtractionQuery) { }

  public extract(): ExtractionResult {
    const { rootNode, extractionQuery } = this;
    const { filterEmptyEntries } = ObjectExtractor;
    const { selector, query } = extractionQuery;
    const node = selector ? qsFrom(rootNode)(selector as CSSSelector) : rootNode;
    const extractionResult = Object.entries(query).reduce((extraction, [key, innerExtractionQuery]): object => {
      const extractor = new Mole(node, innerExtractionQuery);
      return Object.assign(extraction, { [key]: extractor.extract() });
    }, {});

    return filterEmptyEntries(extractionResult);
  }
}
