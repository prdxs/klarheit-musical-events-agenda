import { selectorResolver } from '../resolvers/selector-resolver';
import {
  ArrayExtractionQuery,
  ExtractionQuery,
  ExtractionResult,
  ObjectExtractionQuery,
  SelectionType
} from '../types';
import { isObject } from '../utils';
import { ArrayExtractor } from './array-extractor';
import { AttributeExtractor } from './attribute-extractor';
import { ObjectExtractor } from './object-extractor';

export class Extractor {

  private selectedExtractor: AttributeExtractor | ObjectExtractor | ArrayExtractor;

  constructor(private rootNode: Document | HTMLElement, private extractionQuery: ExtractionQuery) {
    this.selectExtractor();
  }

  public extract(): ExtractionResult {
    return this.selectedExtractor.extract();
  }

  private selectExtractor() {
    // TODO use typescript validators
    const { rootNode, extractionQuery } = this;

    if (typeof extractionQuery === 'string' || Array.isArray(extractionQuery)) {
      this.selectedExtractor = new AttributeExtractor(rootNode, extractionQuery);
    } else if (isObject(extractionQuery)) {
      const [ cssSelector, selectionType ] = selectorResolver(extractionQuery.selector);

      extractionQuery.selector = cssSelector;

      if (selectionType === SelectionType.Single) {
        this.selectedExtractor = new ObjectExtractor(rootNode, extractionQuery as ObjectExtractionQuery);
      } else if (selectionType === SelectionType.Multiple) {
        this.selectedExtractor = new ArrayExtractor(rootNode, extractionQuery as ArrayExtractionQuery);
      }
    }
  }
}
