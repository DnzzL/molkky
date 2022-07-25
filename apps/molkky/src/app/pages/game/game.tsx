import PinGroup from '../../components/pin-group/pin-group';
import styles from './game.module.css';
import useThrow from '../../hooks/use-throw/use-throw';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import {
  gameActions,
  Player,
  selectPlayers,
  selectThrows,
  selectWinner,
  Throw,
} from '../../store/game.slice';

/* eslint-disable-next-line */
export interface GameProps {}

export function Game(props: GameProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gameActions.startGame());
  }, [dispatch]);

  const { currentPlayer, onPinClinkHandle, onUndoThrow } = useThrow();
  const winner = useSelector(selectWinner);
  const throws = useSelector(selectThrows);
  const players = useSelector(selectPlayers);

  return (
    <div className={styles['container']}>
      {winner === '' ? (
        <div>
          <p>{currentPlayer?.name} is playing</p>
          <PinGroup onClickHandle={onPinClinkHandle} />
          <button onClick={() => onUndoThrow()}>Undo</button>
        </div>
      ) : (
        <p>{winner} has won!</p>
      )}
      <div>
        {throws.map((t: Throw, idx: number) => {
          const player = players.find((p: Player) => p.id === t.playerId);
          return <li key={idx}>{`${player?.name} last throw:${t.points}`}</li>;
        })}
      </div>
    </div>
  );
}

export default Game;
