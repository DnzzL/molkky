import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { gameActions, selectPlayers } from '../../store/game.slice';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseGameStart {
  onClickRestart: () => void;
  onClickReset: () => void;
}

export function useGameStart(): UseGameStart {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const players = useSelector(selectPlayers);

  useEffect(() => {
    dispatch(gameActions.startGame());
  }, [dispatch]);

  useEffect(() => {
    if (players.length === 0) {
      navigate('/');
    }
  }, [players, navigate]);

  function onClickRestart() {
    dispatch(gameActions.startGame());
  }

  function onClickReset() {
    navigate('/');
  }
  return { onClickRestart, onClickReset };
}

export default useGameStart;
