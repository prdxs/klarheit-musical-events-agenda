import { selectionTypeResolver} from '../resolvers/selection-type-resolver';
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
    const { rootNode } = this;
    const extractionQuery = this.extractionQuery = selectionTypeResolver(this.extractionQuery);

    if (extractionQuery.type === SelectionType.Multiple) {
      this.selectedExtractor = new ArrayExtractor(rootNode, extractionQuery);
    } else if (isObject(extractionQuery.query)) {
      this.selectedExtractor = new ObjectExtractor(rootNode, extractionQuery);
    } else {
      this.selectedExtractor = new AttributeExtractor(rootNode, extractionQuery);
    }
  }
}
