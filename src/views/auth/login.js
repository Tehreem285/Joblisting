import React, { useState } from 'react'
import { Input , Label , Form , FormGroup, Card, Button, Spinner } from 'reactstrap'
import { Link , useNavigate } from 'react-router-dom';
import { login } from '../../redux/auth/authactions'

import { useDispatch , useSelector } from 'react-redux';


const Login = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const dispatch = useDispatch()
 const navigate = useNavigate();
 const {loader} = useSelector((state)=> state.auth);

  return (
    <>
    <div 
  style={{
    backgroundImage: "url('/images/auth.jpg')",  // ✅ your image path
    backgroundSize: "cover",                   // ✅ makes it cover the whole area
    backgroundPosition: "center",              // ✅ keeps image centered
    minHeight: "100vh",                        // ✅ full height of screen
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}
>

    <Card className='p-4' style={{
    width: '25rem'
  }}>
    <h2 className='text-center mb-5'> Login </h2>
       <Form onSubmit={async (e) => {
  e.preventDefault();
  try {
    await dispatch(login({ email, password })); // unwrap will throw if login failed
    setEmail("");
    setPassword("");
    navigate('/'); // ✅ only navigate on success
  } catch (error) {
  }
}}>

  <FormGroup>
    <Label for="exampleEmail">
      Email
    </Label>
    <Input
    required
      placeholder="Email"
      type="email"
      value={email}
      onChange={(e)=> setEmail(e.target.value)}
    />
  </FormGroup>
  <FormGroup>
    <Label for="examplePassword">
      Password
    </Label>
    <Input
    required
      placeholder="Password"
      type="password"
      value={password}
      onChange={(e)=> setPassword(e.target.value)}
    />
  </FormGroup>
  <div className="d-flex justify-content-center align-items-center">
  
   <Button className='mt-5 bg-dark px-3 py-2'>{loader ? <Spinner color='light' size='sm'/> : "Login"}</Button>
   
  </div>
  </Form>
  <p className='text-center mt-4 text-muted'>Don't have account? <Link to='/signup' className='text-decoration-none text-secondary fw-bold '>Signup</Link></p>
  </Card>
    </div>
    </>
  )
}

export default Login
