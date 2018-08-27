import { ArrayExtractionQuery, CSSSelector, ExtractionResult } from '../types';
import { isObjectEmpty, qsaFrom  } from '../utils';
import { Extractor } from './extractor';

export class ArrayExtractor {

  constructor(private rootNode: Document | HTMLElement, private extractionQuery: ArrayExtractionQuery) { }

  public extract(): ExtractionResult {
    const { rootNode, extractionQuery, filterEmptyEntries } = this;
    const { selector, query } = extractionQuery;
    const nodes = qsaFrom(rootNode)(selector as CSSSelector);
    const extractionResult = nodes.reduce((extraction: ExtractionResult, node: HTMLElement): ExtractionResult => {
      const extractor = new Extractor(node, { query });
      return (extraction as object[]).concat(extractor.extract() as object) as ExtractionResult;
    }, []);

    return filterEmptyEntries(extractionResult);
  }

  private filterEmptyEntries(extractionResult: ExtractionResult): ExtractionResult {
    return (extractionResult as object[]).filter((extractionResultEntry) =>
      !isObjectEmpty(extractionResultEntry)) as ExtractionResult;
  }
}
