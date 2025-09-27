import React, { useEffect } from "react";
import { FaTimes, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "reactstrap";
import { getJob, deleteJob } from "../redux/jobs/jobactions";

const Userjobs = () => {
  const jobs = useSelector((state) => state.job.userJobs);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id) {
      dispatch(getJob(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="p-4 bg-light min-vh-100">
      {/* Header Section */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <Link
          to="/"
          className="btn btn-dark d-flex align-items-center shadow-sm"
        >
          <FaArrowLeft className="me-2 text-white" /> Go Back
        </Link>
        <h3 className="text-dark fw-bold">My Jobs</h3>
        <div></div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-3 rounded shadow border">
        <Table hover responsive className="align-middle">
          <thead className="table-secondary">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Is Active</th>
              <th>Type</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <tr key={job.id}>
                  <td>{index + 1}</td>
                  <td className="fw-semibold">{job.title}</td>
                  <td>{job.location}</td>
                  <td>{job.salary}</td>
                  <td>
                    <span
                      className={`badge ${
                        job.isactive ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {job.isactive ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>{job.type}</td>
                  <td className="text-center">
                    <Button
                      color="outline-danger"
                      size="sm"
                      className="rounded"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this job?"
                          )
                        ) {
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
                <td colSpan="7" className="text-center text-muted">
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Userjobs;
