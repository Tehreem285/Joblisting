import { createAsyncThunk } from "@reduxjs/toolkit";
import { db , storage , auth } from "../../firebase/firebase"; 
import { setAllJobs , setUserJobs, addJob as addJobToState , removeJob } from "./jobslice";
import { addDoc, collection, serverTimestamp , where , query , getDocs, orderBy , doc, updateDoc , deleteDoc } from "firebase/firestore";
 import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
 import { updateProfile } from "firebase/auth";
import { setProfilePic } from "../auth/authslice";

/**
 * Action to add a new job to Firestore.
 * This function handles data validation and updates the Redux state.
 */
export const addJob = createAsyncThunk(
  "job/addJob",
  async ({ title, location, salary, isactive, type, userId }, thunkAPI) => {
    try {
      if (!title || !location || !salary || isactive === undefined || !type) {
        throw new Error("All fields are required");
      }

      // Save job in Firestore with a timestamp
      const docRef = await addDoc(collection(db, "jobs"), {
        title,
        location,
        salary: Number(salary),
        isactive,
        type,
        userId,
        createdAt: serverTimestamp(),
      });

      // Create a job object with the new Firestore ID
      const newJob = {
        id: docRef.id,
        title: title.toLowerCase(),
        location: location.toLowerCase(),
        salary: Number(salary),
        isactive,        
        type: type.toLowerCase(),
        userId,
      };

      // Dispatch a slice action to update Redux state
      thunkAPI.dispatch(addJobToState(newJob));

      return newJob;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to add job");
    }
  }
);

/**
 * Action to get jobs in real-time using a listener.
 * This is useful for dashboards that need to stay in sync with the database.
 * Note: For filtering and sorting, a one-time fetch (fetchJobs) is generally preferred.
 */
export const getJob = createAsyncThunk(
  "job/getJob",
  async (userId, thunkAPI) => {
    try {
      const jobsRef = collection(db, "jobs");
      const q = query(jobsRef, where("userId", "==", userId), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const jobs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
        thunkAPI.dispatch(setUserJobs(jobs));
      return jobs; 
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch jobs");
    }
  }
);


export const fetchJobs = createAsyncThunk(
  "job/fetchJobs",
  async (filters, thunkAPI) => {
    try {
      const { title, jobType, location, salary, field, order } = filters;

      // if (!userId) return; // Only fetch for logged-in users

      const jobsRef = collection(db, "jobs");
      const constraints = [];

      // ✅ If userId is provided → fetch only that user's jobs
      // if (userId) {
      //   constraints.push(where("userId", "==", userId));
      // }
       // Always filter by user

      // For Firestore limitations with text search, we'll fetch all user jobs
      // and filter on the client side for better text matching
      
      // Only add server-side filters for exact matches and ranges
      if (jobType) constraints.push(where("type", "==", jobType.toLowerCase()));
      if (salary) constraints.push(where("salary", ">=", Number(salary)));

      // Dynamic sorting
      if (field) {
        constraints.push(orderBy(field, order || "asc"));
      } else {
        // Default sorting by creation date
        constraints.push(orderBy("createdAt", "desc"));
      }

      const q = query(jobsRef, ...constraints);
      const snapshot = await getDocs(q);

      let jobs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Client-side filtering for text fields (title, location)
      if (title) {
        const titleLower = title.toLowerCase();
        jobs = jobs.filter(job => 
          job.title && job.title.toLowerCase().includes(titleLower)
        );
      }

      if (location) {
        const locationLower = location.toLowerCase();
        jobs = jobs.filter(job => 
          job.location && job.location.toLowerCase().includes(locationLower)
        );
      }

      thunkAPI.dispatch(setAllJobs(jobs));
      return jobs;
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      return thunkAPI.rejectWithValue("Failed to fetch jobs");
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkAPI) => {
    try {
      const jobRef = doc(db, "jobs", jobId);
      await deleteDoc(jobRef);
      thunkAPI.dispatch(removeJob(jobId));
      return jobId; // ✅ return id so reducer can remove it
    } catch (error) {
      console.error("Delete failed:", error);
      return thunkAPI.rejectWithValue("Failed to delete job");
    }
  }
);


export const uploadProfilePic = createAsyncThunk(
  "job/uploadProfilePic",
  async (file, { rejectWithValue, dispatch }) => {
    try {
      const uid = auth.currentUser.uid;
      const storageRef = ref(storage, `profilePics/${uid}.jpg`);

      // 1. Upload file
      await uploadBytes(storageRef, file);

      // 2. Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      // 3. Save in Firestore
      await updateDoc(doc(db, "users", uid), {
        profilePic: downloadURL,
      });

      await updateProfile(auth.currentUser, {
        photoURL: downloadURL,
      });
      dispatch(setProfilePic(downloadURL));
      return downloadURL;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

