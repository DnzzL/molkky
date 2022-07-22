import styles from './home-page.module.css';
import { useForm } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { gameActions } from '../../store/game.slice';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface HomePageProps {}

export function HomePage(props: HomePageProps) {
  const [playerNumber, setPlayerNumber] = useState(0);
  function range(length: number) {
    return Array.from({ length }, (_, i) => i);
  }
  const playerNumberRange = range(playerNumber);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onPlayerNumberChange(event: ChangeEvent<HTMLInputElement>) {
    setPlayerNumber(+event.target.value);
  }

  const onSubmit = (names: any) => {
    Object.values(names).forEach((name) => {
      dispatch(gameActions.addPlayer({ name: '' + name }));
    });
    navigate('/game');
  };

  const { register, handleSubmit } = useForm();

  return (
    <div className={styles['container']}>
      <h1>Players</h1>

      <input
        type="number"
        defaultValue={0}
        value={playerNumber}
        onChange={(e) => onPlayerNumberChange(e)}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        {playerNumberRange.map((i) => {
          return (
            <input
              key={i}
              defaultValue={`player ${i + 1}`}
              {...register(`player ${i + 1}`)}
            />
          );
        })}
        <input type="submit" value="Start" />
      </form>
    </div>
  );
}

export default HomePage;
