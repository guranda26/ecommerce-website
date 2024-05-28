import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../../sdk/productApi';
import { Product } from 'src/Interfaces/CustomerInterface';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import './DetailedProduct.css';

// const swiper = new Swiper('.swiper', {
//   modules: [Navigation, Pagination],
// });
function DetailedProduct(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/products');
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productDetails = await getProductById(id!);
        setProduct(productDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Error fetching product details.');
        setLoading(false);
      }
    }

    if (id) {
      void fetchProduct();
    } else {
      setError('No product ID provided.');
      setLoading(false);
    }
  }, [id]);

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
        <button type="submit" onClick={handleClick}>
          Return Back
        </button>
      </div>
      <h2>Product Details</h2>
      <p>Product ID: {product.id}</p>
      <p>Product Name: {product.name}</p>
      <p>Product Description: {product.description}</p>
      {/* <img
        src={product.imageUrl}
        alt={product.name}
        style={{ width: '200px', height: '200px' }}
      /> */}
      {/* {product.images && product.images.length > 1 ? (
        <ImageSlider images={product.images} />
      ) : (
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: '200px', height: '200px' }}
        />
      )} */}
      {product.images && product.images.length > 0 ? (
        <Swiper
          navigation
          pagination={{ clickable: true }}
          className="mySwiper"
          spaceBetween={50}
          // slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`${product.name} image ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: '200px', height: '200px' }}
        />
      )}
    </section>
  );
}

export default DetailedProduct;
