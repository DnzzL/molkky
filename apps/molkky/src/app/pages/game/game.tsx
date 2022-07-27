import PinGroup from '../../components/pin-group/pin-group';
import useThrow from '../../hooks/use-throw/use-throw';
import styles from './game.module.css';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  gameActions,
  Player,
  selectPlayers,
  selectThrows,
  selectWinner,
  Throw,
} from '../../store/game.slice';
import useGameStart from '../../hooks/use-game-start/use-game-start';

/* eslint-disable-next-line */
export interface GameProps {}

export function Game(props: GameProps) {
  const { onClickRestart, onClickReset } = useGameStart();
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
          <button onClick={onUndoThrow}>Undo</button>
        </div>
      ) : (
        <>
          <p>{winner} has won!</p>
          <button onClick={onClickRestart}>Restart</button>
          <button onClick={onClickReset}>Reset</button>
        </>
      )}
      <div>
        {players.map((p: Player) => {
          return <li key={p.id}>{`${p.name}: ${p.score}`}</li>;
        })}
      </div>
    </div>
  );
}

export default Game;
