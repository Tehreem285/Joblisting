import React, {useState} from 'react'
import { Input , Label , Form , FormGroup, Card, Button , Spinner } from 'reactstrap'
import { signup } from '../../redux/auth/authactions'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux';


const Signup = () => {
  const {signuploader} = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  return (
    <>
    <div 
  style={{             // ✅ keeps image centered
    minHeight: "100vh",                        // ✅ full height of screen
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}
>
      
    <Card className='p-4' style={{
        width: '25rem'
      }}>
    <h2 className='text-center mb-5'>Signup</h2>
      <Form onSubmit={async (e) => {
        e.preventDefault();
          await dispatch(signup({name , email , password})).unwrap();
          setEmail("");
          setPassword("");
          navigate("/login");
      }}>
  <FormGroup>
    <Label for="exampleName">
         Email
       </Label>
       <Input
       required
         placeholder="Name"
         type="text"
         value={name}
         onChange={(e)=> setName(e.target.value)}
       />
     </FormGroup>
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
 <Button className='mt-5 bg-dark px-3 py-2'>
   {signuploader ? <Spinner color='light' size='sm'/> : "Signup" }
   </Button>
  </div>
  </Form>
    <p className='text-center mt-4 text-muted'>Already have account? <Link to='/login' className='text-decoration-none text-secondary fw-bold '>Login</Link></p>
    </Card>
    </div>
    </>
  )
}

export default Signup
