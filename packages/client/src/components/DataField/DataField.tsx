import { FC, useEffect, useRef } from 'react';

import type { DataFieldProps } from './types';
import DataFieldLeft from './DataFieldLeft';
import DataFieldTop from './DataFieldTop';
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

  return variant === DATA_FIELD_VARIANTS.LABEL_TOP ? (
    <DataFieldTop {...props} inputRef={inputRef} />
  ) : (
    <DataFieldLeft {...props} inputRef={inputRef} />
  );
};

export default DataField;
