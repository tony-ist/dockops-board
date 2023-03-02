import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchContainerListThunk } from '../../features/container/containerListSlice';
import styles from './ContainerList.module.css';

export function ContainerList() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.containerList.status);
  const containerList = useAppSelector((state) => state.containerList.containerList);
  const error = useAppSelector((state) => state.containerList.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContainerListThunk());
    }
  }, [dispatch, status]);

  if (error !== null) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div>
      {containerList.map((container, index) => (
        <div key={index}>{container.image}</div>
      ))}
    </div>
  );
}
