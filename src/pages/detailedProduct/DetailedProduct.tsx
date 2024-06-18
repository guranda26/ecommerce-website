import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import useProducts from '../../hooks/useProduct';
import './DetailedProduct.css';
import ImageModal from '../../modules/modal/modal';
import { routes } from '../../modules/routes';
import BasketButton from '../../components/basket/BasketButton';
import PriceContent from '../../components/priceFunction/PriceContent';
import AvailableQuantity from '../../components/quantityProduct/AvailableQuantity';
import { UserContext } from '../../context/userContext';
import useProducts from '../../hooks/useProduct';

function DetailedProduct(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { apiRoot } = useContext(UserContext);
  const { product, loading, error } = useProducts(id || null, apiRoot!);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleClick = () => {
    navigate(routes.catalog);
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    <section className="detailed-product">
      <article className="product-content">
        <div className="product-img">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, EffectFade]}
            effect="fade"
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className="mySwiper"
            spaceBetween={50}
            slidesPerView={1}
          >
            {product.masterVariant.images?.map((image, index) => (
              <SwiperSlide key={index} className="swiper-img">
                <img
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  onClick={handleImageClick}
                  style={{ cursor: 'pointer' }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {isModalOpen && product.masterVariant.images && (
            <ImageModal
              imageUrls={product.masterVariant.images}
              onClose={handleCloseModal}
            />
          )}
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name['en-US']}</h3>

          <div className="price-basket">
            <div className="price-basket-content">
              <span className="price-basket-label">Price:</span>
              <PriceContent product={product} />
            </div>

            <div className="price-basket-content">
              <span className="price-basket-label">Available Products:</span>
              <AvailableQuantity product={product} />
            </div>
            <div className="price-basket-content">
              <BasketButton product={product} />
            </div>
          </div>

          <table className="delivery-return-info">
            <tbody>
              <tr>
                <th>Delivery Information</th>
                <th>Return Policy</th>
              </tr>
              <tr>
                <td>
                  If you are not satisfied with your purchase, you can return it
                  within 30 days for a full refund.
                </td>
                <td>
                  We offer free delivery on all orders over $50. Standard
                  delivery times are 3-5 business days.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
      <table className="description-table">
        <tbody>
          <tr>
            <th className="description-heading">Description of the product:</th>
            <td className="product-description">
              {product.description!['en-US']}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="return-btn">
        <button type="button" onClick={handleClick} className="button">
          Return Back
        </button>
      </div>
    </section>
  );
}

export default DetailedProduct;
