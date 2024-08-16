import { useState } from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import BannerZero from './banner-0.jpg';
import BannerOne from './banner-1.jpg';
import BannerTwo from './banner-2.jpg';

function BannerIndicator({ index, active, onClick }) {
  return (
      <Button
          onClick={() => onClick(index)}
          sx={{
            backgroundColor: active ? 'primary.main' : 'grey.500',
            '&:hover': {
              backgroundColor: active ? 'primary.dark' : 'grey.700',
            },
            width: 12,
            height: 12,
            borderRadius: '50%',
            minWidth: 0,
            margin: 0.5,
          }}
      />
  );
}

function BannerImage({ image, active }) {
  return (
      <Box
          sx={{
            display: active ? 'block' : 'none',
            position: 'relative',
            height: 460,
            overflow: 'hidden',
          }}
      >
        <Box
            component="img"
            src={image}
            alt=""
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
        />
        <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: 1,
              borderRadius: 1,
            }}
        >
          <Typography variant="h5">Tienda Virtual</Typography>
          <Typography variant="body2">Algunos de nuestros mejores productos.</Typography>
        </Box>
      </Box>
  );
}

function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [BannerZero, BannerOne, BannerTwo];

  return (
      <Container sx={{ marginTop: 7 }}>
        <Grid container justifyContent="center" spacing={1}>
          {images.map((_, index) => (
              <Grid item key={index}>
                <BannerIndicator
                    index={index}
                    active={index === activeIndex}
                    onClick={setActiveIndex}
                />
              </Grid>
          ))}
        </Grid>
        {images.map((image, index) => (
            <BannerImage key={index} image={image} active={index === activeIndex} />
        ))}
      </Container>
  );
}

export default Banner;