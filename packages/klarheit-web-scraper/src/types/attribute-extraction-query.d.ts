import { CSSSelector } from './css-selector';
import { AttributeName } from './attribute-name';

export type AttributeExtractionQuery = CSSSelector | [ CSSSelector, AttributeName ];
