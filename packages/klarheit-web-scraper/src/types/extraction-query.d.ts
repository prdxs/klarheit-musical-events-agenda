import { AttributeExtractionQuery } from './attribute-extraction-query';
import { ObjectExtractionQuery } from './object-extraction-query';
import { ArrayExtractionQuery } from './array-extraction-query';

export type ExtractionQuery = AttributeExtractionQuery | ObjectExtractionQuery | ArrayExtractionQuery;
