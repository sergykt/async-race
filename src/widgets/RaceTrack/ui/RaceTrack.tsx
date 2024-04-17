import { useGetCars } from '../lib/queries';
import { RaceTrackItem } from './RaceTrackItem';
import styles from './RaceTrack.module.scss';

export const RaceTrack = () => {
  const { data = [] } = useGetCars({});

  return (
    <ul className={styles.raceTrack}>
      {data.map(({ id, color, name }) => (
        <RaceTrackItem name={name} color={color} key={id} />
      ))}
    </ul>
  );
};
