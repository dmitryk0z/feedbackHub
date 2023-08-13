import PropTypes from 'prop-types';
// @mui
import { Box, Typography, Rating, Divider } from '@mui/material';

// ----------------------------------------------------------------------

OtherReviewsSection.propTypes = {
  Reviews: PropTypes.array,
  user: PropTypes.object,
};

export default function OtherReviewsSection({ Reviews, user }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" color="text.secondary">
        What Other People Think:
      </Typography>
      <Divider sx={{ mt: 1, mb: 1 }} />
      {/* Render other users' reviews */}
      {Reviews.map((review) => {
        if (user && review.createdBy === user.sub) {
          // Skip rendering the user's own review in the list of other reviews
          return null;
        }

        return (
          <Box sx={{ backgroundColor: 'white', p: 2, my: 2, borderRadius: 4 }} key={review.id}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {`${review?.userFirstName} ${review?.userLastName}`}
              </Typography>
              <Rating value={review.rating} precision={1} readOnly />
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ px: 1, wordWrap: 'break-word', maxHeight: '150px' }}
            >
              {review.content}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
