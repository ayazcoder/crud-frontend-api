import { useSelector } from 'react-redux';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Card, CardContent, styled } from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:"30px"
};

export default function MyModal({_id ,open, setOpen}) {

  const allUsers = useSelector((state) => state.app.users)
  const singleUser = allUsers.filter((element) => element._id === _id)
  
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const CustomCard = styled(Card)(({ theme }) => ({
    // margin: theme.spacing(2),
    width:400,
  }));
  const Image = styled("img")(({ theme }) => ({}));
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        onClick={()=>setOpen(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display={"flex"} alignItems={"center"}  mt={5} justifyContent={"center"}><Typography variant="h4" color="initial">Employee Details</Typography></Box>
        {singleUser && singleUser.map((data)=><>
          
          <CustomCard sx={{ maxWidth: 400, maxHeight: 500, borderRadius:"30px" }}>
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
                     
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" textAlign={"center"} sx={{color:"blue",textTransform:"capitalize", fontWeight:"bold"}}>
                       Name: {data.name}
                      </Typography>
                      <Typography variant="h6" color="text.secondary"  textAlign={"center"}  sx={{fontWeight:"bold", textTransform:"capitalize"}}>
                        Position: {data.jobPosition}
                      </Typography>
                      <Typography gutterBottom variant="h6" color="text.secondary"  textAlign={"center"} component="div"  sx={{fontWeight:"bold"}}>
                        Email: {data.email}
                      </Typography>
                      <Typography variant="h6" color="text.secondary"  textAlign={"center"}  sx={{ fontWeight:"bold"}}>
                        Contact No: {data.contactNumber}
                      </Typography>
                      <Typography variant="h6" color="text.secondary"  textAlign={"center"}  sx={{fontWeight:"bold", textTransform:"capitalize"}}>
                        Country: {data.country}
                      </Typography>
                    </CardContent>
                  
                  </CustomCard>
                  
        </>)}
        </Box>
      </Modal>
    </>
  );
}