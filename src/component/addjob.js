import React, { useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { addJob } from "../redux/jobs/jobactions";

const Addjob = ({ modal, toggle }) => {
  // 🔹 Local states for inputs
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [isactive, setIsactive] = useState(false);
  const [type, setType] = useState("");
   const user = useSelector((state) => state.auth.user); 
  // const [resume, setResume] = useState(null);

  const dispatch = useDispatch();

  // 🔹 On Submit Handler
   const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure the user ID is available before dispatching
    if (user && user.id) {
      // Pass userId to the addJob action
      dispatch(addJob({ title, location, salary, isactive, type, userId: user.id }));
    } else {
      console.error("User ID not found. Cannot add job.");
      // Handle this case, maybe show an error message
    }

    // Reset form
    setTitle("");
    setLocation("");
    setSalary("");
    setIsactive(false);
    setType("");

    // Close modal
    toggle();
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
     <ModalHeader toggle={toggle}>     
      Post a Job
     </ModalHeader>
      <ModalBody className="p-4">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              required
              placeholder="Enter job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Location</Label>
            <Input
              type="text"
              required
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Salary</Label>
            <Input
              type="number"
              required
              placeholder="Enter salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>IsActive</Label>
            <Input
              type="select"
              value={isactive}
              onChange={(e) => setIsactive(e.target.value === "true")}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Input>
          </FormGroup>

          <FormGroup>
  <Label for="jobType">Type</Label>
  <Input
    id="jobType"
    type="select"
    required
    value={type}
    onChange={(e) => setType(e.target.value)}
  >
    <option value="">Select Job Type</option>
    <option value="full-time">Full-Time</option>
    <option value="part-time">Part-Time</option>
    <option value="remote">Remote</option>
  </Input>
</FormGroup>


          {/* <FormGroup>
            <Label>Resume</Label>
            <Input
              type="file"
              required
              onChange={(e) => setResume(e.target.files[0])}
            />
          </FormGroup> */}

          <div className="d-flex justify-content-between align-items-center">
            <Button color="danger" onClick={toggle}>
              Cancel
            </Button>
            <Button type="submit" color="secondary">
              Submit
            </Button>
          </div>
        </Form>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </Modal>
  );
};

export default Addjob;

