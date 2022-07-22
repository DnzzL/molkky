import { useDispatch, useSelector } from 'react-redux';
import {
  gameActions,
  Player,
  selectCurrentPlayer,
} from '../../store/game.slice';

export interface UseThrow {
  currentPlayer: Player | undefined;
  onPinClinkHandle: (score: number) => void;
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
  return { currentPlayer, onPinClinkHandle };
}

export default useThrow;
