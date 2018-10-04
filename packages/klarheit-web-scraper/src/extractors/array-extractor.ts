import { ArrayExtractionQuery, AttributeExtractionQuery, ExtractionResult, ObjectExtractionQuery } from '../types';
import { isObjectEmpty, qsaFrom  } from '../utils';
import { Extractor } from './extractor';

export class ArrayExtractor {

  private static filterEmptyEntries(extractionResult: ExtractionResult): ExtractionResult {
    return (extractionResult as any[]).filter((extractionResultEntry) => {
      const isEmptyObject = isObjectEmpty(extractionResultEntry);
      const isEmptyString = typeof extractionResultEntry === 'string' && extractionResultEntry.length === 0;

      return !isEmptyObject && !isEmptyString;
    }) as ExtractionResult;
  }

  constructor(private rootNode: Document | HTMLElement, private extractionQuery: ArrayExtractionQuery) { }

  public extract(): ExtractionResult {
    const { rootNode, extractionQuery } = this;
    const { filterEmptyEntries } = ArrayExtractor;
    const { selector, query } = extractionQuery;
    const nodes = qsaFrom(rootNode)(selector);
    const extractionResult = nodes.reduce((extraction: ExtractionResult, node: HTMLElement): ExtractionResult => {
      const extractor = new Extractor(node, { query } as AttributeExtractionQuery | ObjectExtractionQuery);
      return (extraction as any[]).concat(extractor.extract() as any) as ExtractionResult;
    }, []);

    return filterEmptyEntries(extractionResult);
  }
}
