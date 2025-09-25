import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './views/auth/login';
import Signup from './views/auth/signup';
import Joblistings  from './views/joblistings';
import Protectedroute from './component/protectedroute';
import Userjobs from './component/userjobs';
import { ToastContainer } from "react-toastify"; // ✅ import ToastContainer
import "react-toastify/dist/ReactToastify.css";  // ✅ import css

function App() {
  return (
    <Router>
        <Routes> 
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/' element={
            <Protectedroute>
              <Joblistings/>

            </Protectedroute>
          }/> 
          <Route
          path="/userjobs"
          element={
            <Protectedroute>
              <Userjobs />
            </Protectedroute>
          }
        />
        </Routes>

        {/* ✅ Toast container should be here */}
        <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
}

export default App;
