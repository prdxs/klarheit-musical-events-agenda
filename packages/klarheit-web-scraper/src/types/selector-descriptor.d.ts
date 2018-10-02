import { CSSSelector } from './css-selector';
import { SelectionType } from './selection-type';

export type SelectorDescriptor = CSSSelector | [ CSSSelector, SelectionType.Single ] | [ CSSSelector, SelectionType.Multiple ];
