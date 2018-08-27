export type CSSSelector = string;

export type AttributeName = string;

export const enum SelectionType {
  Single = 'SINGLE',
  Multiple = 'MULTIPLE'
}

export type ExtractionQuery = AttributeExtractionQuery | ObjectExtractionQuery | ArrayExtractionQuery;

export type AttributeExtractionQuery = CSSSelector | [ CSSSelector, AttributeName ];

export interface ObjectExtractionQuery {
  selector?: CSSSelector | [ CSSSelector, SelectionType.Single ];
  query: ExtractionQueryDescriptor;
}

export interface ArrayExtractionQuery {
  selector: CSSSelector | [ CSSSelector, SelectionType.Multiple ];
  query: ExtractionQueryDescriptor;
}

export type SelectorDescriptor = CSSSelector | [ CSSSelector, SelectionType.Single ] | [ CSSSelector, SelectionType.Multiple ];

export interface ExtractionQueryDescriptor {
  [key: string]: ExtractionQuery;
}

export type ExtractionResult = AttributeExtractionResult | ObjectExtractionResult | ArrayExtractionResult;

export type AttributeExtractionResult = string;

export interface ObjectExtractionResult {
  [key: string]: ExtractionResult;
}

export type ArrayExtractionResult = ObjectExtractionResult[];
