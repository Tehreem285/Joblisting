import React, { useState, useEffect } from "react";
import { Link }  from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import {
  Table,
  Button,
  Input,
  Collapse,
  Row,
  Col,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  CardImg,
  CardImgOverlay,
  Card,
  CardTitle,
  CardText,
} from "reactstrap";
import "./joblistings.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, uploadProfilePic } from "../redux/jobs/jobactions";
import Addjob from "../component/addjob";
import Userjobs from "../component/userjobs";
import { logout } from "../redux/auth/authactions";
import { setProfilePic } from "../redux/auth/authslice"; // ✅ import slice action

const Joblistings = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.job.allJobs);
  const user = useSelector((state) => state.auth.user);

  // Local state for instant preview of uploaded pic
  const [imageurl, setImageurl] = useState(null);

  // Filter states
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [salary, setSalary] = useState("");

  // Sorting states
  const [field, setField] = useState("");
  const [order, setOrder] = useState("asc");

  // Modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

 const [isOpen, setIsOpen] = useState(false);
const toggleNavbar = () => setIsOpen(!isOpen);
  
  // ✅ Profile Pic Upload Handler
  const handleProfilePicUpload = async (e) => {
    if (e.target.files[0]) {
      try {
        // Upload to Firebase
        const downloadURL = await dispatch(
          uploadProfilePic(e.target.files[0])
        ).unwrap();

        // Update local preview
        setImageurl(downloadURL);

        // Update Redux (so it persists globally)
        dispatch(setProfilePic(downloadURL));
      } catch (error) {
        console.error("Profile pic upload failed:", error);
      }
    }
  };

  // Apply filters
  const applyFilters = () => {
    if (!user?.id) return;
    dispatch(
      fetchJobs({
        userId: user.id,
        title: title || undefined,
        jobType: jobType || undefined,
        location: location || undefined,
        status: status || undefined,
        salary: salary || undefined,
        field: field || undefined,
        order: order || undefined,
      })
    );
  };

  const hasFilters =
    title !== "" ||
    jobType !== "" ||
    location !== "" ||
    status !== "" ||
    salary !== "" ||
    field !== "" ||
    order !== "asc";

  // Reset filters
  const resetFilters = () => {
    setTitle("");
    setJobType("");
    setLocation("");
    setStatus("");
    setSalary("");
    setField("");
    setOrder("asc");

    dispatch(fetchJobs({}));
  };

  // Initial fetch when component mounts
  useEffect(() => {
    dispatch(fetchJobs({}));
  }, [dispatch]);

  return (
    <>
      <div className="px-5 bg-dark py-2 ">
        <Navbar color="dark" dark >
  <NavbarBrand href="/" className="me-auto text-light">
    <h4>JobsHub!</h4>
  </NavbarBrand>

  {/* ✅ Profile picture always visible */}
  <div className="d-flex align-items-center me-3">
    <input
      type="file"
      id="profilePic"
      accept="image/*"
      style={{ display: "none" }}
      onChange={handleProfilePicUpload}
    />

    <label
      htmlFor="profilePic"
      style={{ cursor: "pointer", margin: 0 }}
    >
      {imageurl || user?.profilePic ? (
        <img
          src={imageurl || user?.profilePic}
          alt="Profile"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ) : (
        <FaUserCircle size={40} color="gray" />
      )}
    </label>
  </div>

  {/* Navbar toggler */}
  <NavbarToggler onClick={toggleNavbar} className="me-2" />

  {/* ✅ Collapsible menu (only Logout inside) */}
  <Collapse isOpen={isOpen} navbar>
    <Nav navbar className="ms-auto">
      <NavItem>
      <NavLink tag={Link} to="/userjobs"> 
       My Jobs
      </NavLink>
    </NavItem>

      <NavItem>
        <NavLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout());
          }}
          className="text-danger"
        >
          Logout
        </NavLink>
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>

      </div>

      {/* Background Card Section */}
      <div>
        <Card inverse>
          <div style={{ position: "relative" }}>
            <CardImg
              alt="Card image cap"
              src="/images/hero.jpg"
              style={{
                height: 600,
                width: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                opacity: 0.5,
              }}
            ></div>
            <CardImgOverlay>
              <CardTitle className="text-center mt-5 pt-4">
                <h1>Welcome to JobsHub!</h1>
              </CardTitle>
              <CardText className="mt-3">
                <h5 className="text-center">
                  Building this page for practice purpose. Main focus is to make
                  grip on firebase concepts.
                </h5>
              </CardText>
              {/* <CardText>
                <div className="d-flex justify-content-center mt-5">
                  <Userjobs />
                </div>
              </CardText> */}
              <CardText>
                <div className="d-flex justify-content-center mt-4">
                  <Button
                    onClick={toggle}
                    outline
                    color="light"
                    className="fw-bold px-3 py-2 "
                  >
                    Post a Job
                  </Button>
                </div>
              </CardText>
              <CardText>
                <div className="p-3 m-5 p-5">
                  {/* Filters */}
                  <Row className="mt-4 g-2">
                    <Col md="4">
                      <Input
                        type="text"
                        placeholder="Search Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Col>
                    <Col md="4">
                      <Input
                        type="select"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                      >
                        <option value="">Job Type</option>
                        <option value="full-time">Full-Time</option>
                        <option value="part-time">Part-Time</option>
                        <option value="remote">Remote</option>
                      </Input>
                    </Col>
                    <Col md="4">
                      <Input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </Col>
                    <Col md="4">
                      <Input
                        type="number"
                        placeholder="Min Salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                      />
                    </Col>
                    <Col md="4">
                      <Input
                        type="select"
                        value={field}
                        onChange={(e) => setField(e.target.value)}
                      >
                        <option value="">Sort by Field</option>
                        <option value="title">Title</option>
                        <option value="salary">Salary</option>
                      </Input>
                    </Col>
                    <Col md="4">
                      <Input
                        type="select"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                      >
                        <option value="">Sort by</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                      </Input>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <Button
                      onClick={applyFilters}
                      outline
                      color="light"
                      disabled={!hasFilters}
                      className="fw-bold px-3 py-2 mb-3"
                    >
                      Apply Filter
                    </Button>
                    <Button
                      onClick={resetFilters}
                      outline
                      color="light"
                      disabled={!hasFilters}
                      className="fw-bold px-3 py-2 mb-3"
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </CardText>
            </CardImgOverlay>
          </div>
        </Card>
      </div>

      {/* Job Table */}
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
      {/* <div className="d-flex justify-content-end mt-3 gap-2">
    <Button outline color="light" className="fw-bold">
      <FaArrowLeft className="me-2" /> Previous
    </Button>
    <Button outline color="light" className="fw-bold">
      Next <FaArrowRight className="ms-2" />
    </Button>
  </div> */}
      </div>


      <Addjob modal={modal} toggle={toggle} />
    </>
  );
};

export default Joblistings;
