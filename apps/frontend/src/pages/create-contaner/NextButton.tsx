import Typography from '@mui/material/Typography';
import { LinkStyled } from '../../components/link-styled/LinkStyled';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAppSelector } from '../../store/hooks';
import { containersSelectors } from '../../features/container/containersSlice';

interface NextButtonProps {
  dbContainerId: number | null;
}

export const NextButton = (props: NextButtonProps) => {
  const { dbContainerId } = props;
  const theme = useTheme();
  const container = useAppSelector((state) => containersSelectors.selectByNullableId(state, dbContainerId));

  if (!dbContainerId || !container) {
    return <></>;
  }

  return (
    <>
      <Typography variant='body1' color={theme.palette.primary.main}>
        Container {container.dockerName} created
      </Typography>
      <LinkStyled to={`/container/${dbContainerId}/`}>
        <Button sx={{ marginLeft: '15px' }} variant='contained'>
          go to container
        </Button>
      </LinkStyled>
    </>
  );
};
