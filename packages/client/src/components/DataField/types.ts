import { Ref } from 'react';
import { FieldValues, RegisterOptions } from 'react-hook-form-mui';

export type DataFieldVariants = 'label-left' | 'label-top' | 'label-top-rhf';
export type DataFieldVariantsKeys =
  | 'LABEL_LEFT'
  | 'LABEL_TOP'
  | 'LABEL_TOP_RHF';

export interface DataFieldProps {
  label: string;
  name?: string;
  variant?: DataFieldVariants;
  value?: string;
  autoFocus?: boolean;
  type?: string;
  inputRef?: Ref<HTMLInputElement>;
  validation?: Omit<
    RegisterOptions<FieldValues, string>,
    'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  onChange?: (newValue: string) => void;
}
