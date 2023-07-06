import { ActionFlagType, Key, KeyboardController } from './KeyboardController';

describe('KeyboardController', () => {
  const keyboard = new KeyboardController();
  const action = keyboard.getAction();

  it('keydown handler', () => {
    for (const name in Key) {
      keyboard.keyDownHandler(Key[name as keyof typeof Key]);
    }

    for (const key in action) {
      expect(action[key as keyof ActionFlagType]).toBe(true);
    }
  });

  it('keyup handler', () => {
    for (const name in Key) {
      keyboard.keyUpHandler(Key[name as keyof typeof Key]);
    }

    for (const key in action) {
      expect(action[key as keyof ActionFlagType]).toBe(false);
    }
  });
});
