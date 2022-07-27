import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { gameActions } from '../../store/game.slice';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UsePlayerForm {
  playerNumber: number;
  onPlayerNumberChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (names: any) => void;
}

export function usePlayerForm(): UsePlayerForm {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [playerNumber, setPlayerNumber] = useState(0);

  function onPlayerNumberChange(event: ChangeEvent<HTMLInputElement>) {
    setPlayerNumber(+event.target.value);
  }
  const onFormSubmit = (names: any) => {
    Object.values(names).forEach((name) => {
      dispatch(gameActions.addPlayer({ name: '' + name }));
    });
    navigate('/game');
  };
  return { playerNumber, onPlayerNumberChange, onFormSubmit };
}

export default usePlayerForm;
