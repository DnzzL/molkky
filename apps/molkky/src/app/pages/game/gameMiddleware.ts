import { Middleware } from 'redux';
import { gameActions, Throw } from '../../store/game.slice';

const gameMiddleware: Middleware = (store) => {
  return (next) => (action) => {
    if (gameActions.addThrow.match(action)) {
      const gameState = store.getState().game;
      const throws = gameState.throws;
      const playerThrows = throws.filter(
        (t: Throw) => t.playerId === action.payload.playerId
      );
      const lastTwoThrowsTotal = playerThrows
        .slice(-2)
        .map((t: Throw) => t.points)
        .reduce((acc: number, a: number) => acc + a, 0);
      if (playerThrows.length > 1 && lastTwoThrowsTotal === 0) {
        store.dispatch(gameActions.setAtRisk({ id: action.payload.playerId }));
      }
      next(action);
      const lastThreeThrowsTotal = playerThrows
        .slice(-3)
        .map((t: Throw) => t.points)
        .reduce((acc: number, a: number) => acc + a, 0);
      if (playerThrows.length > 2 && lastThreeThrowsTotal === 0) {
        store.dispatch(
          gameActions.eliminatePlayer({ id: action.payload.playerId })
        );
      }
    } else {
      next(action);
    }
  };
};

export default gameMiddleware;
