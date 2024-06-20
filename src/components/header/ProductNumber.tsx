import React, { useContext, useEffect, useState } from 'react';
import './header.css';

import { UserContext } from '../../context/userContext';

function ProductNumber(): React.JSX.Element {
  const { cart } = useContext(UserContext);
  const [numItem, setNumItem] = useState(cart?.lineItems.length);

  useEffect(() => {
    setNumItem(cart?.lineItems.length);
  }, [cart]);

  return numItem ? <span className="basket-items-num">{numItem}</span> : <></>;
}

export default ProductNumber;
