import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser, userDetails } from "../features/slice/userDetailsSlice";
import {
  Typography,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Button,
} from "@mui/material";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.app);
  const [UpdatedData, setUpdatedData] = useState({
    name: "",
    jobPosition: "",
    email: "",
    contactNumber: "",
    country: "",
  });
  const dispatch = useDispatch();

  const getUserData = (e) => {
    // setUpdatedData({ ...UpdatedData, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setUpdatedData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  console.log("-------------UpdateData -----------------------", UpdatedData);
  console.log(users);
  console.log("------------------------------------");

  useEffect(() => {
    console.log("use effect");
    if (id && users.length > 0) {
      const singleUser = users.filter((element) => element._id === id);
      setUpdatedData(singleUser[0]);
      // dispatch(userDetails.actions.setHandleFetch(true));
    }
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    // console.log("dod")
    dispatch(updateUser(UpdatedData));
    dispatch(userDetails.actions.setHandleFetch(true));
    navigate("/");
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography
          variant="h4"
          mt={3}
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
        >
          Edit my Data
        </Typography>
        <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
          <Grid container spacing={2}>
            <CssBaseline />
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                value={UpdatedData.name || ""}
                onChange={getUserData}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="jobPosition"
                variant="outlined"
                required
                fullWidth
                id="jobPosition"
                label="Job Position"
                value={UpdatedData.jobPosition || ""}
                onChange={getUserData}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                value={UpdatedData.email || ""}
                onChange={getUserData}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="contactNumber"
                variant="outlined"
                required
                fullWidth
                id="contactNumber"
                label="Contact Number"
                value={UpdatedData.contactNumber || ""}
                onChange={getUserData}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="country"
                variant="outlined"
                required
                fullWidth
                id="country"
                label="Country"
                value={UpdatedData.country || ""}
                onChange={getUserData}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 5 }}
            color="primary"
          >
            Add Employee
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Edit;
