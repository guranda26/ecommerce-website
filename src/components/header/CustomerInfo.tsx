import React, { useState, useEffect } from 'react';
import { getCustomerById } from '../../../sdk/customerApi';
import { ICustomer } from '../../Interfaces/CustomerInterface';

interface CustomerInfoProps {
  customerId: string;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customerId }) => {
  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!customerId) {
      setError('No Customer ID provided.');
      return;
    }

    getCustomerById(customerId)
      .then((customer) => {
        if (!customer.firstName || !customer.lastName || !customer.email) {
          setError('Some customer details are missing.');
          return;
        }
        setCustomer(customer);
        setError(null);
      })
      .catch((err) => {
        console.error('Failed to fetch customer:', err);
        setError('Failed to fetch customer data');
        setCustomer(null);
      });
  }, [customerId]);

  if (!customerId) return <div>Please provide a customer ID.</div>;
  if (error) return <div>Error: {error}</div>;
  if (!customer) return <div>Loading...</div>;

  return (
    <div>
      <h1>Customer Details</h1>
      <div>
        Name: {customer.firstName || 'Not provided'}{' '}
        {customer.lastName || 'Not provided'}
      </div>
      <div>Email: {customer.email || 'Not provided'}</div>
    </div>
  );
};

export default CustomerInfo;
