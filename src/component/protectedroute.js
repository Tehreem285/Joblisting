// Protectedroute.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { Navigate } from 'react-router-dom';
import { setUser, setChecking } from '../redux/auth/authslice';

const Protectedroute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const checking = useSelector((state) => state.auth.checking);
  const dispatch = useDispatch();

  useEffect(() => {

      dispatch(setChecking(true));
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(setUser({ id: currentUser.uid, email: currentUser.email }));
      } else {
        dispatch(setUser(null));
      }

      dispatch(setChecking(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (checking) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protectedroute;
