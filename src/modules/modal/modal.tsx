import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Image } from '@commercetools/platform-sdk';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  maxWidth: '90%',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  breakpoints: {
    768: {
      top: 0,
    },
  },
};

interface ImageModalProps {
  imageUrls: Image[];
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrls, onClose }) => {
  return (
    <Modal
      open={!!imageUrls.length}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'gray',
            zIndex: '5',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          style={{ maxHeight: '70vh', height: 'auto' }}
        >
          {imageUrls.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <Box
                component="img"
                src={imageUrl.url}
                alt={`Product Image ${index + 1}`}
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '60vh',
                  objectFit: 'contain',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Modal>
  );
};

export default ImageModal;
