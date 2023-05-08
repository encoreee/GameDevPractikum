export enum Key {
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  FIRE = ' ',
}

export type ActionFlagType = Record<keyof typeof Key, boolean>;

export class KeyboardController {
  private action: ActionFlagType = {
    FIRE: false,
    LEFT: false,
    RIGHT: false,
  };

  private keysForeEach(key: string, flag: boolean) {
    switch (key) {
      case Key.FIRE:
        this.action.FIRE = flag;
        break;
      case Key.LEFT:
        this.action.LEFT = flag;
        break;
      case Key.RIGHT:
        this.action.RIGHT = flag;
        break;
    }
  }

  public keyDownHandler(key: string) {
    this.keysForeEach(key, true);
  }

  public keyUpHandler(key: string) {
    this.keysForeEach(key, false);
  }

  getAction() {
    return this.action;
  }
}
