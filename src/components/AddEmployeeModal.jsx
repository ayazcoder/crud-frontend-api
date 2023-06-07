import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  styled,
  Typography,
  Paper,
  Modal,
} from "@mui/material";
import EngineeringIcon from "@mui/icons-material/Engineering";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createUser, showUser, userDetails } from "../features/slice/userDetailsSlice";
import { useNavigate } from "react-router-dom";

const styles = {
  "@global": {
    body: {
      backgroundColor: "white",
    },
  },
  paper: {
    marginTop: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: "1px",
    backgroundColor: "black",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "3px",
  },
};
const PaperDiv = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  //  marginTop: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
}));
const Form = styled("form")(({ theme }) => ({
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(3),
  // marginTop: "3px"
}));


export default function AddEmployee({show, setShow, handleFetch}) {
  const handleshow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState({});
  const dispatch = useDispatch();
 
  
  useEffect(() => {
      dispatch(createUser(users));  
  }, []);

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(users));
    handleClose();
    dispatch(userDetails.actions.setHandleFetch(true));

  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
    //   onClick={() => setShow(!show)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <PaperDiv>
          <Avatar sx={styles.avatar}>
            <EngineeringIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Employee
          </Typography>
          <Form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fullName"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                  onChange={getUserData}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="jobPosition"
                  label="Job Position"
                  name="jobPosition"
                  autoComplete="Software Engineer"
                  onChange={getUserData}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={getUserData}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="contactNumber"
                  label="Contact Number"
                  type="text"
                  id="contactNumber"
                  autoComplete="current-number"
                  onChange={getUserData}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="country"
                  label="Country Name"
                  type="text"
                  id="country"
                  onChange={getUserData}
                  autoComplete="country"
                />
              </Grid>
            </Grid>
            <Typography mt={6} component="h1" variant="h5">
            </Typography>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Add Employee
            </Button>
          </Form>
        </PaperDiv>
      </Container>
    </Modal>
  );
}
