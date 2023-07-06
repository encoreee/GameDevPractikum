import { FC, useEffect, useRef } from 'react';
import type { DataFieldProps } from './types';
import DataFieldLeft from './DataFieldLeft';
import DataFieldTop from './DataFieldTop';
import DataFieldTopRHF from './DataFieldTopRHF';
import { DATA_FIELD_VARIANTS } from './const';

const DataField: FC<DataFieldProps> = ({
  variant = DATA_FIELD_VARIANTS.LABEL_LEFT,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.autoFocus) {
      inputRef.current?.focus();
    }
  }, []);

  let resultDatafield = null;

  switch (variant) {
    case DATA_FIELD_VARIANTS.LABEL_TOP:
      resultDatafield = <DataFieldTop {...props} inputRef={inputRef} />;
      break;
    case DATA_FIELD_VARIANTS.LABEL_LEFT:
      resultDatafield = <DataFieldLeft {...props} inputRef={inputRef} />;
      break;
    case DATA_FIELD_VARIANTS.LABEL_TOP_RHF:
      resultDatafield = <DataFieldTopRHF {...props} inputRef={inputRef} />;
      break;
    default:
      resultDatafield = <DataFieldLeft {...props} inputRef={inputRef} />;
      break;
  }

  return resultDatafield;
};

export default DataField;
