import PinGroup from '../../components/pin-group/pin-group';
import styles from './game.module.css';
import useThrow from '../../hooks/use-throw/use-throw';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { gameActions, selectWinner } from '../../store/game.slice';

/* eslint-disable-next-line */
export interface GameProps {}

export function Game(props: GameProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gameActions.startGame());
  }, [dispatch]);

  const { currentPlayer, onPinClinkHandle } = useThrow();

  const winner = useSelector(selectWinner);
  useEffect(() => {
    if (winner !== '') {
      console.log(`${winner} has won!`);
    }
  }, [winner]);

  return (
    <div className={styles['container']}>
      <p>{currentPlayer?.name} is playing</p>
      <PinGroup onClickHandle={onPinClinkHandle} />
    </div>
  );
}

export default Game;
