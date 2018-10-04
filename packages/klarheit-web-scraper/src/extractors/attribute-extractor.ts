import { AttributeExtractionQuery, AttributeName, ExtractionResult, Extractor } from '../types';
import { qsFrom } from '../utils';

export class AttributeExtractor implements Extractor {

  private static getDefaultAttributeName(node: HTMLElement): AttributeName {
    switch (node.tagName) {
      case 'IMG':
        return 'src';
      default:
        return 'innerText';
    }
  }

  constructor(private rootNode: Document | HTMLElement, private extractionQuery: AttributeExtractionQuery) { }

  public extract(): ExtractionResult {
    const { rootNode, extractionQuery } = this;
    const { getDefaultAttributeName } = AttributeExtractor;
    const { selector, query } = extractionQuery;
    const node = selector ? qsFrom(rootNode)(selector) : rootNode;

    if (query) {
      return (node && node[query]) || '';
    } else {
      return (node && node[getDefaultAttributeName(node)]) || '';
    }
  }
}
