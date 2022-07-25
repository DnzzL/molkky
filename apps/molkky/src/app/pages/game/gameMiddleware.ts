import { Middleware } from 'redux';
import { gameActions, Player, Throw } from '../../store/game.slice';

const gameMiddleware: Middleware = (store) => {
  return (next) => (action) => {
    if (gameActions.addThrow.match(action)) {
      next(action);
      const gameState = store.getState().game;

      const throws = gameState.throws;
      const players = gameState.players;
      const playerThrows = throws
        .filter((t: Throw) => t.playerId === action.payload.playerId)
        .map((t: Throw) => t.points);
      checkForAtRisk(playerThrows);
      checkForElimination(players, playerThrows);
    } else {
      next(action);
    }

    function checkForElimination(players: Player[], playerThrows: any) {
      const lastThreeThrowsTotal = playerThrows
        .slice(-3)
        .reduce((acc: number, a: number) => acc + a, 0);
      if (
        playerThrows.length > 2 &&
        lastThreeThrowsTotal === 0 &&
        action.payload.points === 0
      ) {
        store.dispatch(
          gameActions.eliminatePlayer({ playerId: action.payload.playerId })
        );
        checkForWinner(players);
      }
    }

    function checkForAtRisk(playerThrows: any) {
      const lastTwoThrowsTotal = playerThrows
        .slice(-2)
        .reduce((acc: number, a: number) => acc + a, 0);
      if (
        playerThrows.length > 1 &&
        lastTwoThrowsTotal === 0 &&
        action.payload.points === 0
      ) {
        store.dispatch(
          gameActions.setAtRisk({ playerId: action.payload.playerId })
        );
      }
    }

    function checkForWinner(players: Player[]) {
      const activePlayers = players.filter(
        (p: Player) => !p.isEliminated && p.id !== action.payload.playerId
      );
      if (activePlayers.length === 1) {
        store.dispatch(
          gameActions.setWinner({ playerId: activePlayers[0].id })
        );
      }
    }
  };
};

export default gameMiddleware;
