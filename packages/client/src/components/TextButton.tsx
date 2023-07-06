import { Button } from '@mui/material';
import { FC } from 'react';

interface TextButtonProps {
  label: string;
  variant: typeof TextButtonVariant[keyof typeof TextButtonVariant];
  disabled?: boolean;
  onClick?: () => void;
  fontSize?: number;
}

export const TextButtonVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  CLEAN: 'clean',
} as const;

const cleanButtonStyle = {
  fontSize: 14,
  color: 'text.primary',
  borderRadius: '0px',
  textTransform: 'none',
  opacity: 0.8,
  backgroundSize: '100%',
  '&:hover': {
    opacity: 1,
    textDecoration: 'underline',
  },
};

const textGradientButtonStyle = {
  ...cleanButtonStyle,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const primaryButtonStyle = {
  ...textGradientButtonStyle,
  backgroundImage: 'linear-gradient(147.14deg, #00D0DE 6.95%, #05A660 93.05%)',
};

const secondaryButtonStyle = {
  ...textGradientButtonStyle,
  backgroundImage: 'linear-gradient(147.14deg, #AC5DD9 7.21%, #004FC4 94.47%)',
};

const TextButton: FC<TextButtonProps> = (props) => {
  let buttonStyle;

  switch (props.variant) {
    case TextButtonVariant.PRIMARY:
      buttonStyle = { ...primaryButtonStyle };
      break;
    case TextButtonVariant.SECONDARY:
      buttonStyle = { ...secondaryButtonStyle };
      break;
    case TextButtonVariant.CLEAN:
      buttonStyle = { ...cleanButtonStyle };
      break;
    default:
      buttonStyle = { ...cleanButtonStyle };
  }

  if (props.fontSize) {
    buttonStyle.fontSize = props.fontSize;
  }

  return (
    <Button
      sx={{
        ...buttonStyle,
      }}
      variant="text"
      color="secondary"
      onClick={props.onClick}
      disabled={props.disabled}>
      {props.label}
    </Button>
  );
};

export default TextButton;
