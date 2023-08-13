import { useState, useEffect } from 'react';
// Amplify
import { Auth } from 'aws-amplify';

// ----------------------------------------------------------------------

// Custom hook for fetching user data
export function useFetchUserData() { 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        const { attributes } = currentUser;
        setUser(attributes);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return { user };
}
