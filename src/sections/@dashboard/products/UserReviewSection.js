import PropTypes from 'prop-types';
// @mui
import { Box, Typography, Rating, TextField, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const DialogImage = styled('img')({
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
});

// ----------------------------------------------------------------------

UserReviewSection.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  editMode: PropTypes.bool,
  rating: PropTypes.number,
  handleRatingChange: PropTypes.func,
  userReviewContent: PropTypes.string,
  handleUserReviewContentChange: PropTypes.func,
  handleSaveUserReview: PropTypes.func,
  handleEditReview: PropTypes.func,
  handleCancelEdit: PropTypes.func,
  handleCreateReview: PropTypes.func,
  handleDeleteReviewContent: PropTypes.func,
};

export default function UserReviewSection({
  image,
  name,
  editMode,
  rating,
  handleRatingChange,
  userReviewContent,
  handleUserReviewContentChange,
  handleSaveUserReview,
  handleEditReview,
  handleCancelEdit,
  handleCreateReview,
  handleDeleteReviewContent,
}) {
  return (
    <Box>
      <DialogImage alt={name} src={image} />
      <Typography variant="h3" color="text.secondary" sx={{ mt: 2}}>
          {name}
        </Typography>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" color="text.secondary">
          Your Review and Rating:
        </Typography>
        <Rating value={rating} precision={1} onChange={handleRatingChange} />
      </Box>
      {/* Render the user's own review */}
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Box sx={{ backgroundColor: 'white', p: 3, my: 2, borderRadius: 4 }}>
        {editMode ? (
          <>
            <TextField
              value={userReviewContent}
              onChange={handleUserReviewContentChange}
              multiline
              fullWidth
              InputProps={{
                sx: {
                  fontSize: 'body2.fontSize',
                  color: 'text.primary',
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: 'pointer', fontSize: 'small', textDecoration: 'underline', mr: 1 }}
                onClick={handleSaveUserReview}
              >
                Save
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: 'pointer', fontSize: 'small', textDecoration: 'underline' }}
                onClick={handleCancelEdit}
              >
                Cancel
              </Typography>
            </Box>
          </>
        ) : userReviewContent ? (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ wordWrap: 'break-word', maxHeight: '150px' }}>
              {userReviewContent}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: 'pointer', fontSize: 'small', textDecoration: 'underline', mr: 1 }}
                onClick={handleEditReview}
              >
                Edit
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: 'pointer', fontSize: 'small', textDecoration: 'underline' }}
                onClick={handleDeleteReviewContent}
              >
                Delete
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                You have not written a review yet...
              </Typography>
              <Typography
                variant="subtitle2"
                color="primary"
                sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={handleCreateReview}
              >
                Create Review
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
