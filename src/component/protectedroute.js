// Protectedroute.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';   // ✅ import db
import { doc, getDoc } from 'firebase/firestore'; // ✅ import Firestore functions
import { Navigate } from 'react-router-dom';
import { setUser, setChecking } from '../redux/auth/authslice';

const Protectedroute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const checking = useSelector((state) => state.auth.checking);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setChecking(true));

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // ✅ fetch user profile from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        let userData = {};
        if (userDoc.exists()) {
          userData = userDoc.data();
        }

        dispatch(setUser({
          id: currentUser.uid,
          email: currentUser.email,
          name: userData.name,
          profilePic: userData.profilePic || null,  // ✅ get profilePic safely
        }));
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
