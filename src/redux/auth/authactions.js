import { createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut} from "firebase/auth";
import {db , auth} from "../../firebase/firebase";
import {setUser , setLoader} from "./authslice";
import {setDoc , doc , getDoc} from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const signup = createAsyncThunk(
    "auth/signup",
    async ({email , password} , {dispatch}) => {
        try {
           dispatch(setLoader(true)) 
           const user = await createUserWithEmailAndPassword(auth , email ,password);
           if (user) {
        await setDoc(doc(db, "users", user.user.uid), { email , profilePic: null });
        dispatch(setUser({
          id: user.user.uid,    
          email: email,
          profilePic : null,
        }));
      
            dispatch(setLoader(false));
            toast.success("✅ User registered successfully!");
            
           }
        } catch (error) {
          toast.error("Signup failed: " + error.message); 
            console.log(error.message);
        }
    }
)

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoader(true));
      const user = await signInWithEmailAndPassword(auth, email, password);
      const userdoc = await getDoc(doc(db, "users", user.user.uid));
     if (userdoc.exists()) {
        const userData = userdoc.data();  // ✅ get Firestore user data

        dispatch(setUser({
          id: user.user.uid,
          email: user.user.email,
          profilePic: userData.profilePic || null,  // ✅ now safe
        }));
 dispatch(setLoader(false)); // ✅ stop loader
                toast.success(" Login successful!"); // ✅ toast
      } else {
        dispatch(setLoader(false));
                toast.error(" User record not found in Firestore");
        return rejectWithValue("User record not found in Firestore");
      }
    } catch (error) {
      dispatch(setLoader(false));
            toast.error("Login failed: " + error.message);
      return rejectWithValue(error.message); // ✅ return error to component
    }
  }
);



export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await signOut(auth);
      dispatch(setUser(null)); // ✅ clear redux user state
      toast.info(" Logged out successfully");
    } catch (error) {
       toast.error(" Logout failed: " + error.message); 
      console.log(error.message);
    }
  }
);