import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useProducts from '../../hooks/useProduct';

function DetailedProduct(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProducts(id || null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/products');
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
        <button type="submit" onClick={handleClick}>
          Return Back
        </button>
      </div>
      <h2>Product Details</h2>
      <p>Product ID: {product.id}</p>
      <p>Product Name: {product.name}</p>
      <p>Product Description: {product.description}</p>
      {product.images && product.images.length > 0 ? (
        <Swiper
          navigation
          pagination={{ clickable: true }}
          className="mySwiper"
          spaceBetween={50}
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
