import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './ContainerList.module.css';
import { containersSelectors, fetchContainersThunk } from '../../features/container/containersSlice';
import { ContainerListItem } from './ContainerListItem';

export const ContainerList = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.containers.status);
  const error = useAppSelector((state) => state.containers.error);
  const containerList = useAppSelector(containersSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchContainersThunk());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (error !== null) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <>
      {containerList.map((container, index) => (
        <ContainerListItem container={container} index={index} key={index} />
      ))}
    </>
  );
};
