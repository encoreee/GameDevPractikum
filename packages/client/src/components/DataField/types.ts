import { Ref } from 'react';

export type DataFieldVariants = 'label-left' | 'label-top';
export type DataFieldVariantsKeys = 'LABEL_LEFT' | 'LABEL_TOP';

export interface DataFieldProps {
  label: string;
  variant?: DataFieldVariants;
  value?: string;
  autoFocus?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  onChange?: (newValue: string) => void;
}
