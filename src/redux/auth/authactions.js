import { createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut} from "firebase/auth";
import {db , auth} from "../../firebase/firebase";
import {setUser , setSignuploader , setLoginloader} from "./authslice";
import {setDoc , doc , getDoc} from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const signup = createAsyncThunk(
    "auth/signup",
    async ({name ,email , password} , {dispatch , rejectWithValue}) => {
        try {
           dispatch(setSignuploader(true)) 
           const user = await createUserWithEmailAndPassword(auth , email ,password);
           if (user) {
        await setDoc(doc(db, "users", user.user.uid), { name , email , profilePic: null });
        dispatch(setUser({
          id: user.user.uid,
          name : name,    
          email: email,
          profilePic : null,
        }));
      
            dispatch(setSignuploader(false));
            toast.success("✅ User registered successfully!");
            
          }
        } catch (error) {
          dispatch(setSignuploader(false));

             let message;
  if (error.code === "auth/email-already-in-use") {
    message = " This email is already registered.";
  } else if (error.code === "auth/invalid-email") {
    message = " Invalid email format.";
  } else if (error.code === "auth/weak-password") {
    message = " Password is too weak.";
  } else {
    message = "Signup failed: " + error.message;
  }

  toast.error(message);
 console.log(error.message);
}
        }
)

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoginloader(true));
      const user = await signInWithEmailAndPassword(auth, email, password);
      const userdoc = await getDoc(doc(db, "users", user.user.uid));
     if (userdoc.exists()) {
        const userData = userdoc.data();  // ✅ get Firestore user data

        dispatch(setUser({
          id: user.user.uid,
          email: user.user.email,
          name: userData.name,
          profilePic: userData.profilePic || null,  // ✅ now safe
        }));
 dispatch(setLoginloader(false)); // ✅ stop loader
                toast.success(" Login successful!"); // ✅ toast
      } else {
        dispatch(setLoginloader(false));
                toast.error(" User record not found in Firestore");
      }
    } catch (error) {
      dispatch(setLoginloader(false));

        let message;
      if (error.code === "auth/user-not-found") {
        message = " No account found with this email.";
      } else if (error.code === "auth/invalid-credential") {
    message = " Invalid email or password.";
      } 
      else {
        message = "Login failed: " + error.message;
      }
      toast.error(message);
    }
  }
);



export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await signOut(auth);
      dispatch(setUser(null)); 
      toast.info(" Logged out successfully");
    } catch (error) {
       toast.error(" Logout failed: " + error.message); 
      console.log(error.message);
    }
  }
);