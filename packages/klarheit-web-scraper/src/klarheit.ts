import { ArrayExtractor, AttributeExtractor, ObjectExtractor } from './extractors';
import { selectionTypeResolver} from './resolvers';
import {
  ExtractionQuery,
  ExtractionResult,
  Extractor,
  SelectionType
} from './types';
import { isObject } from './utils';

export default class Klarheit implements Extractor {

  private selectedExtractor: AttributeExtractor | ObjectExtractor | ArrayExtractor;

  constructor(private rootNode: Document | HTMLElement, private extractionQuery: ExtractionQuery) {
    this.selectExtractor();
  }

  public extract(): ExtractionResult {
    return this.selectedExtractor.extract();
  }

  private selectExtractor() {
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
