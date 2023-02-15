import { Button as MUIButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
  button: {
    minWidth: 100,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 2
  }
});

export const Button = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { buttonType, variant, children, title, onClick, ...prop } = props;

  return (
    <MUIButton
      {...prop}
      ref={ref}
      variant={buttonType === 'primary' ? 'contained' : 'outlined'}
      type={variant}
      className={classes.button}
      color='primary'
      onClick={onClick}
    >
      {children}
      <span style={{ margin: 0, scale: '-moz-initial' }}>{title}</span>
    </MUIButton>
  );
});
