import React, { useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './App.css';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function ImageListView(props) {

  const [open, setOpen] = React.useState(false);
  const [modalImage, setModalImage] = useState({});
  const [orgImageSize, setOrgImageSize] = useState({});

  const handleOpen = (item) => {  
    console.log(item.imgSrc);
    setModalImage(item);
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  const modalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxwidth: 600,
    bgcolor: '#e3f2fd',
    border: 'none',
    boxShadow: 24,
    p: 4,
    outline: 'none',
  };

  const thmbImgSrc = (tmbImgSrc, imgSrc) => {
    if ( typeof(tmbImgSrc) !== 'undefined') {
      return tmbImgSrc;
    } else {
      return imgSrc;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} >
      <Grid container justifyContent="flex-start" sx={{margin: '10px'}}>
          <Grid item xs={1}>
            <IconButton type="button" sx={{ p: '10px' }} aria-label="back" onClick={props.handleBack} 
                        color={props.backButtonStyle.color} disabled={props.backButtonStyle.disabled}>
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton type="button" sx={{ p: '10px' }} aria-label="next" onClick={props.handleNext}  
                        color={props.nextButtonStyle.color} disabled={props.nextButtonStyle.disabled}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Grid>
      </Grid>
      <Grid container spacing={2} style={{ height: "140px" }}>
        {props.itemListData.map((item) => (
          <Grid item xs={4} md={2} lg={2} key={item.title}  style={{ height: "100%" , textAlign:'center'}}>
            <Tooltip key={item.title} title={item.tags.join(", ")}>
                <img onClick={(event) => handleOpen(item)}
                  src={thmbImgSrc(item.tmbImgSrc, item.imgSrc)}
                  alt={item.title}
                  className="tmbImage"
                /> 
            </Tooltip>
          </Grid>
        ))}
      </Grid>


        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalBoxStyle}>
            <img
              width="100%"
              src={modalImage.imgSrc}
              alt={modalImage.title} 
              onLoad={(event) => {setOrgImageSize({height:event.target.naturalHeight, width:event.target.naturalWidth})}}
            />
            Original Size(height*width) : {orgImageSize.height}*{orgImageSize.width}
          </Box>
        </Modal>




    </Box>
  );
}
