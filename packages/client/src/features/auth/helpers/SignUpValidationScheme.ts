import { ValidationAssertions } from '../../../utils/const';

const {
  onlyCyrillicLatinAndDash,
  onlyNumbersLatinAndDash,
  onlyNumbersAndPlus,
  notOnlyNumbers,
  firstLetterUpper,
  atLeastOneNumber,
  atLeastOneUppercase,
  atLeastOneLowercase,
} = ValidationAssertions;

export const ValidationScheme = {
  name: {
    required: true,
    maxLength: {
      value: 40,
      message: 'Maximum 40 characters',
    },
    validate: {
      onlyCyrillicLatinAndDash,
      firstLetterUpper,
    },
  },
  surname: {
    required: true,
    maxLength: {
      value: 40,
      message: 'Maximum 40 characters',
    },
    validate: {
      onlyCyrillicLatinAndDash,
      firstLetterUpper,
    },
  },
  login: {
    required: true,
    minLength: {
      value: 3,
      message: 'Minimum 3 characters',
    },
    maxLength: {
      value: 20,
      message: 'Maximum 20 characters',
    },
    validate: {
      onlyNumbersLatinAndDash,
      notOnlyNumbers,
    },
  },
  phoneNumber: {
    required: true,
    minLength: {
      value: 10,
      message: 'Minimum 10 digits',
    },
    maxLength: {
      value: 15,
      message: 'Maximum 15 digits',
    },
    validate: {
      onlyNumbersAndPlus,
    },
  },
  password: {
    required: true,
    minLength: {
      value: 8,
      message: 'Minimum 8 characters',
    },
    maxLength: {
      value: 40,
      message: 'Maximum 40 characters',
    },
    validate: {
      atLeastOneLowercase,
      atLeastOneUppercase,
      atLeastOneNumber,
    },
  },
};
