import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// @mui
import { Box, Card, Link, Typography, Stack, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
// sections
import ProductDialog from './ProductDialog';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ProductCard({ product }) {
  const { image, name, Reviews } = product;
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const totalRatings = Reviews.length;
        const averageRating =
          totalRatings > 0 ? Reviews.reduce((sum, review) => sum + review.rating, 0) / totalRatings : 0;
        setAverageRating(averageRating);
        setTotalReviews(totalRatings);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [Reviews]);

  return (
    <>
      <Card onClick={handleOpen} style={{ cursor: 'pointer' }}>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <StyledProductImg alt={name} src={image} />
        </Box>
        <Stack spacing={2} sx={{ p: 3 }}>
          <Link color="inherit" underline="hover">
            <Typography variant="subtitle1" noWrap>
              {name}
            </Typography>
          </Link>
          <Stack>
            <Typography variant="body2" color="text.secondary">
              Total Reviews: {totalReviews}
            </Typography>
            <Rating value={averageRating} precision={1} readOnly emptyIcon={<StarBorderIcon fontSize="inherit" />} />
          </Stack>
        </Stack>
      </Card>
      <ProductDialog product={product} open={open} onClose={handleClose} />
    </>
  );
}
