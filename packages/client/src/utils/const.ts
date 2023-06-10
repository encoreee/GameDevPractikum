export const ValidationAssertions = {
  onlyCyrillicLatinAndDash: (value: string) =>
    /^[А-ЯËа-яёA-Za-z-]+$/.test(value) ||
    'Only latin, cyrillic and "-" allowed',
  onlyNumbersLatinAndDash: (value: string) =>
    /^[a-zA-Z0-9-_]+$/.test(value) || 'Only latin letters, numbers, and -_',
  firstLetterUpper: (value: string) =>
    /^[A-ZА-ЯË]{1}/.test(value) || 'First letter must be uppercase',
  notOnlyNumbers: (value: string) =>
    !/^[0-9]+$/.test(value) || 'Can`t consist only of numbers',
  atLeastOneNumber: (value: string) =>
    /[0-9]/.test(value) || 'At least one number',
  atLeastOneUppercase: (value: string) =>
    /[A-Z]/.test(value) || 'At least one uppercase letter',
  atLeastOneLowercase: (value: string) =>
    /[a-z]/.test(value) || 'At least one lowercase letter',
  onlyNumbersAndPlus: (value: string) =>
    /^\+{0,1}[0-9]+$/.test(value) || 'Only numbers and "+" allowed',
};

export const AppMessage = {
  UNKNOWN_API_ERROR: 'Unknown API error',
  OAUTH_ERROR: `Couldn't complete oauth. Please, try login/password.`,
};

export const REDIRECT_URI = 'http://localhost:3000';
