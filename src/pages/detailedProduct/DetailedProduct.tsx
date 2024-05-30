import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useProducts from '../../hooks/useProduct';
import './DetailedProduct.css';
import ImageModal from '../../modules/modal/modal';

function DetailedProduct(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProducts(id || null);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleClick = () => {
    navigate('/products');
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <section>
      <div>
        <button type="button" onClick={handleClick}>
          Return Back
        </button>
      </div>
      <h2>Product Details</h2>
      <p>Product ID: {product.id}</p>
      <p>Product Name: {product.name}</p>
      <p>Product Description: {product.description}</p>
      <p>
        Product Price:{' '}
        {product.discountPrice ? (
          <>
            <span style={{ textDecoration: 'line-through' }}>
              {product.price}
            </span>
            <span>{product.discountPrice}</span>
          </>
        ) : (
          product.price
        )}
      </p>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="mySwiper"
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
      >
        {product.images?.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Image ${index + 1}`}
              onClick={() => handleImageClick(image)}
              style={{ cursor: 'pointer' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedImage && (
        <ImageModal imageUrl={selectedImage} onClose={handleCloseModal} />
      )}
    </section>
  );
}

export default DetailedProduct;
