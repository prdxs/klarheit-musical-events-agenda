import { AttributeExtractionResult } from './attribute-extraction-result';
import { ObjectExtractionResult } from './object-extraction-result';
import { ArrayExtractionResult } from './array-extraction-result';

export type ExtractionResult = AttributeExtractionResult | ObjectExtractionResult | ArrayExtractionResult;
