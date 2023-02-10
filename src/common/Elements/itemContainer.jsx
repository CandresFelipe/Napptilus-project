import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export function ItemContainer({ imageURL, brand, model, price, onClick }) {
  return (
    <Card sx={{ maxWidth: 345 }} onClick={onClick}>
      <CardMedia
        component='img'
        height='194'
        image={imageURL}
        alt='phone image'
        sx={{ objectFit: 'contain', padding: '0.5em' }}
      />
      <CardContent sx={{ padding: '0.1em' }}>
        <Typography variant='h6' color='CaptionText'>
          {`${brand} - ${model}`}
        </Typography>
        <Typography variant='h7' color='CaptionText'>
          {`${price} Euros`}
        </Typography>
      </CardContent>
    </Card>
  );
}
