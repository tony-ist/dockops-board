import { Container } from '../../generated-sources/backend-api';
import { StatusIndicator } from './StatusIndicator';

interface ContainerStatusIndicatorProps {
  container: Container;
}

export const ContainerStatusIndicator = ({ container }: ContainerStatusIndicatorProps) => {
  return <StatusIndicator isOn={container.dockerState === 'running'} />;
};
