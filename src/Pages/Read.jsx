import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaWpexplorer } from "react-icons/fa";
import { deleteUser, showUser } from "../features/slice/userDetailsSlice";
import { useNavigate } from "react-router-dom";
import MyModal from "../components/CustomModal";
import AddEmployee from "../components/AddEmployeeModal";
import {
  CardContent,
  Card,
  Typography,
  Button,
  Box,
  styled,
  Grid,
} from "@mui/material";

const Read = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [_id, setId] = useState();
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);

  const { users, loading, handleFetch, searchData } = useSelector(
    (state) => state.app
  );

  useEffect(() => {
    dispatch(showUser());
  }, [handleFetch]);

  if (loading) {
    <Box display="flex" justifyContent="center" alignItems="center" py={2}>
      <Typography variant="h3">Loading....</Typography>
    </Box>;
  }
  const CustomCard = styled(Card)(({ theme }) => ({
    margin: theme.spacing(2),
  }));
  const Image = styled("img")(({ theme }) => ({}));
  return (
    <>
      <Box>
        {open && <MyModal _id={_id} open={open} setOpen={setOpen} />}
        {show && (
          <AddEmployee
            show={show}
            setShow={setShow}
            handleFetch={handleFetch}
          />
        )}

        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          py={2}
        >
          <Typography variant="h3">All Employees Data</Typography>
          <Button
            variant="contained"
            sx={{ mt: 6 }}
            onClick={() => setShow(true)}
          >
            Add Employee
          </Button>
        </Box>
        <div className="row  p-5 d-flex justify-content-center align-items-center">
          {users &&
            users
              .filter((ele) => {
                if (searchData.length === 0) {
                  return ele;
                } else {
                  return (
                    ele.name.toLowerCase().includes(searchData.toLowerCase()) ||
                    ele.jobPosition
                      .toLowerCase()
                      .includes(searchData.toLowerCase()) ||
                    ele.email
                      .toLowerCase()
                      .includes(searchData.toLowerCase()) ||
                    ele.contactNumber
                      .toLowerCase()
                      .includes(searchData.toLowerCase()) ||
                    ele.country.toLowerCase().includes(searchData.toLowerCase())
                  );
                }
              })
              .map((data) => (
                <>
                  <CustomCard sx={{ maxWidth: 345, maxHeight: 600, borderRadius:"30px" }}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Image
                        src="https://www.shutterstock.com/image-vector/people-icon-vector-person-sing-260nw-707883430.jpg"
                        alt="Image"
                        sx={{
                          width: 200, // Customize the width
                          height: 200, // Customize the height
                          borderRadius: "60%", // Add border radius
                          // Add any other custom styles you want
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Grid container>
                        <Grid xs={12} sx={6}>
                          <Typography gutterBottom variant="h5" textAlign={"center"} component="div" sx={{textTransform:"capitalize"}}>
                            {data.name}
                          </Typography>
                        </Grid>
                        <Grid xs={12} sx={6}>
                          <Typography variant="h6" textAlign={"center"} color="text.secondary" sx={{textTransform:"capitalize"}}>
                            {data.jobPosition}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      mb={3}
                    >
                      <Button size="small">
                        <FaWpexplorer
                          size={30}
                          onClick={() => [setId(data._id), setOpen(true)]}
                        />
                      </Button>
                      <Button size="small">
                        <AiFillDelete
                          size={30}
                          onClick={() => dispatch(deleteUser(data._id))}
                        />
                      </Button>
                      <Button
                        size="small"
                        onClick={() => navigate(`/edit/${data._id}`)}
                      >
                        <AiFillEdit size={30} />
                      </Button>
                    </Box>
                  </CustomCard>
                </>
              ))}
        </div>
      </Box>
    </>
  );
};

export default Read;
