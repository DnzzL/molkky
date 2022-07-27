import styles from './home-page.module.css';
import { useForm } from 'react-hook-form';
import usePlayerForm from '../../hooks/use-player-form/use-player-form';

/* eslint-disable-next-line */
export interface HomePageProps {}

export function HomePage(props: HomePageProps) {
  const { playerNumber, onPlayerNumberChange, onFormSubmit } = usePlayerForm();
  const { register, handleSubmit } = useForm();

  function range(length: number) {
    return Array.from({ length }, (_, i) => i);
  }
  const playerNumberRange = range(playerNumber);

  return (
    <div className={styles['container']}>
      <h1>Players</h1>

      <input
        type="number"
        min="0"
        value={playerNumber}
        onChange={(e) => onPlayerNumberChange(e)}
      />

      <form onSubmit={handleSubmit(onFormSubmit)}>
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
