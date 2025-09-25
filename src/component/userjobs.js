import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table , Button } from "reactstrap";
import { FaArrowLeft } from "react-icons/fa";
import { getJob , deleteJob } from "../redux/jobs/jobactions";

const Userjobs = () => {
  const jobs = useSelector((state) => state.job.userJobs);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id) {
      dispatch(getJob(user.id)); // ✅ only fetch current user’s jobs
    }
  }, [dispatch, user]);

  return (
    <div className="p-4 bg-light">
      <h3 className="mb-4 mt-2 text-center">My Jobs</h3>
      <div className="bg-secondary p-3 rounded shadow">
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Is Active</th>
              <th>Type</th>
              <th>Action</th>
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
                  <td>
            <Button
              color="danger"
              size="sm"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this job?")) {
                  dispatch(deleteJob(job.id));
                }
              }}
            >
              <FaTimes />
            </Button>
          </td>
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

       <div className="d-flex justify-content-end mt-4">
  <Link to="/" className="btn btn-secondary d-flex align-items-center">
    <FaArrowLeft className="me-2" /> Go Back
  </Link>
</div>

    </div>
  );
};

export default Userjobs;
