import PinGroup from '../../components/pin-group/pin-group';
import styles from './game.module.css';
import useThrow from '../../hooks/use-throw/use-throw';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';
import { gameActions } from '../../store/game.slice';

/* eslint-disable-next-line */
export interface GameProps {}

export function Game(props: GameProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gameActions.startGame());
  }, [dispatch]);

  const { currentPlayer, onPinClinkHandle } = useThrow();

  return (
    <div className={styles['container']}>
      <p>{currentPlayer?.name} is playing</p>
      <PinGroup onClickHandle={onPinClinkHandle} />
    </div>
  );
}

export default Game;
