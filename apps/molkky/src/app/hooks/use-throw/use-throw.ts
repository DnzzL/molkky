import { useDispatch, useSelector } from 'react-redux';
import {
  gameActions,
  Player,
  selectCurrentPlayer,
} from '../../store/game.slice';

export interface UseThrow {
  currentPlayer: Player | undefined;
  onPinClinkHandle: (score: number) => void;
  onUndoThrow: () => void;
}

export function useThrow(): UseThrow {
  const currentPlayer = useSelector(selectCurrentPlayer);
  const dispatch = useDispatch();

  function onPinClinkHandle(score: number) {
    currentPlayer &&
      dispatch(
        gameActions.addThrow({ playerId: currentPlayer.id, points: score })
      );
  }

  function onUndoThrow() {
    dispatch(gameActions.undoThrow());
  }
  return { currentPlayer, onPinClinkHandle, onUndoThrow };
}

export default useThrow;
