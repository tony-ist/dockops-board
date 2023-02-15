import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchContainerList } from '../../features/container-list/containerListSlice';
import styles from './ContainerList.module.css';

function ContainerList() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.containerList.status);
  const containerList = useAppSelector((state) => state.containerList.containerList);
  const error = useAppSelector((state) => state.containerList.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContainerList());
    }
  });

  if (error !== null) {
    return <div className={styles.error}>{error}</div>;
  }

  return containerList.map((container, index) => <div key={index}>{container.image}</div>);
}

export default ContainerList;
