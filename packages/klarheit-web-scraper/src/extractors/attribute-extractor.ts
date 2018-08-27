import { AttributeExtractionQuery, AttributeName, ExtractionResult, Extractor } from '../types';
import { qsFrom } from '../utils';

export class AttributeExtractor implements Extractor {

  constructor(private rootNode: Document | HTMLElement, private extractionQuery: AttributeExtractionQuery) { }

  public extract(): ExtractionResult {
    const { rootNode, extractionQuery, getDefaultAttributeName } = this;
    const qs = qsFrom(rootNode);

    if (Array.isArray(extractionQuery)) {
      const [ cssSelector, attributeName ] = extractionQuery;
      const node = qs(cssSelector);
      return (node && node[attributeName]) || '';
    } else {
      const node = qs(extractionQuery);
      return (node && node[getDefaultAttributeName(node)]) || '';
    }
  }

  private getDefaultAttributeName(node: HTMLElement): AttributeName {
    switch (node.tagName) {
      case 'IMG':
        return 'src';
      default:
        return 'innerText';
    }
  }
}
