import { GameLoop, GameLoopCallback } from './GameLoop';

describe('GameLoop', () => {
  let update: jest.Mock<GameLoopCallback, number[]>;
  let render: jest.Mock<GameLoopCallback, number[]>;

  beforeEach(() => {
    jest.useFakeTimers({ doNotFake: ['performance'] });

    //perfomance.now() init
    const now = jest.spyOn(performance, 'now').mockImplementation(() => 0);

    update = jest.fn();
    render = jest.fn();

    const gameLoop = new GameLoop(update, render);

    //perfomance.now() 1 frame RFA (1000 / 60 + 1 = miliseconds time per frame + 1ms)
    now.mockImplementation(() => 1000 / 60 + 1);
    gameLoop.start();

    //perfomance.now() 2 frame RFA (1000 / 60 + 1 = miliseconds time per frame + 1ms * number frame)
    now.mockImplementation(() => (1000 / 60 + 1) * 2);

    jest.runOnlyPendingTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('render gameloop call', () => {
    // 2 RAF frames: call 2 times
    expect(render).toHaveBeenCalledTimes(2);
  });
  it('update gameloop call', () => {
    //2 RAF frames: call 2 times
    expect(update).toHaveBeenCalledTimes(2);
  });
});
