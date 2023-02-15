import { ButtonBase } from '@mui/material';
import { styled } from '@mui/styles';

const Image = styled('img')({
  margin: 'auto',
  maxHeight: '100%',
  maxWidth: '100%',
  display: 'block',
  objectFit: 'contain'
});

export function ClickableImage(props) {
  return (
    <ButtonBase onClick={props.onClick}>
      <Image {...props} />
    </ButtonBase>
  );
}
