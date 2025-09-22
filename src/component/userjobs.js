import React, { useState , useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";
import { getJob } from "../redux/jobs/jobactions";

const Userjobs = () => {
  const jobs = useSelector((state) => state.job.allJobs);
  const user = useSelector((state) => state.auth.user);
 const dispatch = useDispatch()

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
  if (user?.id) {
    dispatch(getJob(user.id)); // ✅ only fetch current user’s jobs
  }
}, [dispatch, user]);

  return (
    <>
      <Button onClick={toggle} outline color="light">
       My Jobs
      </Button>
      <Modal isOpen={modal} toggle={toggle} fullscreen>
        <ModalHeader toggle={toggle}>My Jobs</ModalHeader>
        <ModalBody>
          <div className="p-3 bg-secondary">
            <Table light hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Salary</th>
                  <th>IsActive</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {jobs.length > 0 ? (
                  jobs.map((job, index) => (
                    <tr key={job.id}>
                      <td>{index + 1}</td>
                      <td>{job.title}</td>
                      <td>{job.location}</td>
                      <td>{job.salary}</td>
                      <td>{job.isactive ? "Yes" : "No"}</td>
                      <td>{job.type}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No jobs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Userjobs;

