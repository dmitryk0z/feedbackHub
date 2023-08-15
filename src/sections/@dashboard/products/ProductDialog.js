import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// @mui
import { Dialog, DialogContent, IconButton, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CloseIcon from '@mui/icons-material/Close';
// Amplify
import { API, graphqlOperation } from 'aws-amplify';
import { updateReview, createReview, deleteReview } from '../../../graphql/mutations';
// hooks
import { useFetchUserData } from '../../../hooks/useFetchUserData';
// sections
import UserReviewSection from './UserReviewSection';
import OtherReviewsSection from './OtherReviewsSection';

// ----------------------------------------------------------------------

ProductDialog.propTypes = {
  product: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default function ProductDialog({ product, open, onClose }) {
  const { image, name } = product;
  const [Reviews, setReviews] = useState(product.Reviews);
  const { user } = useFetchUserData();
  const [editMode, setEditMode] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [userReviewContent, setUserReviewContent] = useState('');

  useEffect(() => {
    // Find the review that matches the current user's ID
    const userReview = Reviews.find((review) => review.createdBy === user?.sub);

    if (userReview) {
      setUserReview(userReview);
      setRating(userReview.rating);
      setUserReviewContent(userReview.content);
    } else {
      setUserReview(null);
      setRating(0);
      setUserReviewContent('');
    }
  }, [user, Reviews]);

  const handleRatingChange = async (event, newRating) => {
    setRating(newRating);
    if (userReview) {
      // If the user has already reviewed the product, update their rating in the database
      const updatedReview = { ...userReview, rating: newRating };
      try {
        await API.graphql(
          graphqlOperation(updateReview, {
            input: {
              id: userReview.id,
              rating: newRating,
            },
          })
        );
        setUserReview(updatedReview);
      } catch (error) {
        console.error('Error updating review:', error);
      }
    } else {
      // If there's no existing review, add a new review to the database with the given rating
      const newReview = {
        productID: product.id,
        content: '',
        rating: newRating,
        createdBy: user.sub,
        userFirstName: user.given_name,
        userLastName: user.family_name,
      };
      try {
        const createdReview = await API.graphql(
          graphqlOperation(createReview, {
            input: newReview,
          })
        );
        setUserReview(createdReview.data.createReview);
      } catch (error) {
        console.error('Error creating review:', error);
      }
    }
  };

  const handleUserReviewContentChange = (event) => {
    setUserReviewContent(event.target.value);
  };

  const handleSaveUserReview = async () => {
    if (userReview) {
      // If the user has already reviewed the product, update their review content in the database
      userReview.content = userReviewContent;
      try {
        await API.graphql(
          graphqlOperation(updateReview, {
            input: {
              id: userReview.id,
              content: userReviewContent,
            },
          })
        );
      } catch (error) {
        console.error('Error updating review:', error);
      }
    } else {
      // If the user has not reviewed the product, add a new review to the database with the content
      const newReview = {
        productID: product.id,
        content: userReviewContent,
        rating,
        createdBy: user.sub,
        userFirstName: user.given_name,
        userLastName: user.family_name,
      };
      try {
        const createdReview = await API.graphql(
          graphqlOperation(createReview, {
            input: newReview,
          })
        );
        setUserReview(createdReview.data.createReview);
      } catch (error) {
        console.error('Error creating review:', error);
      }
    }
    setEditMode(false);
  };

  const handleEditReview = () => {
    // Enable edit mode for the user's review
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    // Discard changes and exit edit mode
    setUserReviewContent(userReview ? userReview.content : '');
    setEditMode(false);
  };

  const handleCreateReview = () => {
    // Enter edit mode to create a new review
    setUserReviewContent('');
    setEditMode(true);
  };

  const handleDeleteReview = async () => {
    if (userReview) {
      try {
        // Delete the user's review
        await API.graphql(
          graphqlOperation(deleteReview, {
            input: {
              id: userReview.id,
            },
          })
        );
        // Clear the user's review and exit edit mode
        const updatedReviews = Reviews.filter((review) => review.id !== userReview.id);
        setUserReview(null);
        setRating(0);
        setUserReviewContent('');
        setEditMode(false);
        setReviews(updatedReviews);
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: '',
          borderBottom: 1,
          borderColor: '#dde1e7',
        }}
      >
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ backgroundColor: '#f5f6fa' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {/* Render the UserReviewSection component */}
            <UserReviewSection
              image={image}
              name={name}
              Reviews={Reviews}
              userReview={userReview}
              editMode={editMode}
              rating={rating}
              handleRatingChange={handleRatingChange}
              userReviewContent={userReviewContent}
              handleUserReviewContentChange={handleUserReviewContentChange}
              handleSaveUserReview={handleSaveUserReview}
              handleEditReview={handleEditReview}
              handleCancelEdit={handleCancelEdit}
              handleCreateReview={handleCreateReview}
              handleDeleteReviewContent={handleDeleteReview}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Render the OtherReviewsSection component */}
            <OtherReviewsSection Reviews={Reviews} user={user} />
          </Grid>
        </Grid>
      </DialogContent>
      <Box sx={{ height: '30px', backgroundColor: '', borderTop: 1, borderColor: '#dde1e7' }} />
    </Dialog>
  );
}
