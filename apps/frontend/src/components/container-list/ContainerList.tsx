import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './ContainerList.module.css';
import { containersSelectors, fetchContainersThunk } from '../../features/container/containersSlice';
import { store } from '../../store/store';

export function ContainerList() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.containers.status);
  const error = useAppSelector((state) => state.containers.error);
  const containerList = containersSelectors.selectAll(store.getState());

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContainersThunk({}));
    }
  }, [dispatch, status]);

  if (error !== null) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div>
      {containerList.map((container, index) => (
        <div key={index}>
          <div>{container.id}</div>
          <div>{container.dockerId}</div>
          <div>{container.image}</div>
        </div>
      ))}
    </div>
  );
}
