import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";

const Userjobs = () => {
  const jobs = useSelector((state) => state.job.userJobs);
  const user = useSelector((state) => state.auth.user);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // Filter jobs for the logged-in user
  const userJobs = jobs.filter((job) => job.userId === user?.id);

  return (
    <>
      <Button onClick={toggle} outline color="light">
        Click Me
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
                {userJobs.length > 0 ? (
                  userJobs.map((job, index) => (
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

