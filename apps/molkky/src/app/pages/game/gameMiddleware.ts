import { Middleware } from 'redux';
import { gameActions, Player, Throw } from '../../store/game.slice';

const gameMiddleware: Middleware = (store) => {
  return (next) => (action) => {
    if (gameActions.addThrow.match(action)) {
      next(action);
      const gameState = store.getState().game;

      const throws = gameState.throws;
      const players = gameState.players;
      const currentPlayerId = action.payload.playerId;
      const playerThrows = throws
        .filter((t: Throw) => t.playerId === currentPlayerId)
        .map((t: Throw) => t.points);
      const playerTotal = playerThrows.reduce(
        (acc: number, a: number) => acc + a,
        0
      );
      checkForAtRisk(playerThrows, currentPlayerId);
      checkForElimination(
        players,
        playerThrows,
        currentPlayerId,
        action.payload.points
      );
      checkForWinner(playerTotal, currentPlayerId);
      checkForExceeding(playerTotal, currentPlayerId);
    } else {
      next(action);
    }

    function checkForElimination(
      players: Player[],
      playerThrows: number[],
      playerId: string,
      scoredPoints: number
    ) {
      const lastThreeThrowsTotal = playerThrows
        .slice(-3)
        .reduce((acc: number, a: number) => acc + a, 0);
      if (
        playerThrows.length > 2 &&
        lastThreeThrowsTotal === 0 &&
        scoredPoints === 0
      ) {
        store.dispatch(gameActions.eliminatePlayer({ playerId }));
        checkForEnoughPlayers(players, playerId);
      }
    }

    function checkForAtRisk(playerThrows: number[], playerId: string) {
      const lastTwoThrowsTotal = playerThrows
        .slice(-2)
        .reduce((acc: number, a: number) => acc + a, 0);
      if (
        playerThrows.length > 1 &&
        lastTwoThrowsTotal === 0 &&
        action.payload.points === 0
      ) {
        store.dispatch(gameActions.setAtRisk({ playerId }));
      }
    }

    function checkForExceeding(playerTotal: number, playerId: string) {
      if (playerTotal > 50) {
        store.dispatch(
          gameActions.setPlayerScore({
            playerId,
            score: 25,
          })
        );
      }
    }

    function checkForWinner(playerTotal: number, playerId: string) {
      if (playerTotal === 50) {
        store.dispatch(gameActions.setWinner({ playerId }));
      }
    }

    function checkForEnoughPlayers(players: Player[], playerId: string) {
      const activePlayers = players.filter(
        (p: Player) => !p.isEliminated && p.id !== playerId
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
