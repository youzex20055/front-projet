import React, { useState } from "react";
import "./payment.css";

const Payment = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1-');
    }

    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 4);
    }

    if (name === 'zipCode') {
      value = value.replace(/\D/g, '').slice(0, 6);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const isFormValid = Object.values(formData).every(value => value.trim() !== '');
    const isCardValid = /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(formData.cardNumber);
    const currentYear = new Date().getFullYear();
    const isDateValid = parseInt(formData.expYear) >= currentYear && /^(0[1-9]|1[0-2])$/.test(formData.expMonth);
    const isCvvValid = /^\d{3,4}$/.test(formData.cvv);

    if (!isFormValid) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (!isCardValid) {
      setErrorMessage('Invalid card number format');
      return;
    }

    if (!isDateValid) {
      setErrorMessage('Invalid expiry date');
      return;
    }

    if (!isCvvValid) {
      setErrorMessage('Invalid CVV');
      return;
    }

    setSuccessMessage('Payment processed successfully!');
    console.log('Form data:', formData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {errorMessage && <div className="message error">{errorMessage}</div>}
        {successMessage && <div className="message success">{successMessage}</div>}

        <div className="row">
          <div className="col">
            <h3 className="title">Billing Address</h3>
            <div className="inputBox">
              <span>Full Name :</span>
              <input type="text" name="fullName" placeholder="YOUSSEF HDILISSE" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="inputBox">
              <span>Email :</span>
              <input type="email" name="email" placeholder="example@example.com" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="inputBox">
              <span>Address :</span>
              <input type="text" name="address" placeholder="Room - Street - Locality" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="inputBox">
              <span>City :</span>
              <input type="text" name="city" placeholder="Safi" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="flex">
              <div className="inputBox">
                <span>State :</span>
                <input type="text" name="state" placeholder="Safi-Marrakech" value={formData.state} onChange={handleChange} required />
              </div>
              <div className="inputBox">
                <span>Zip Code :</span>
                <input type="text" name="zipCode" placeholder="123 456" value={formData.zipCode} onChange={handleChange} maxLength="6" required />
              </div>
            </div>
          </div>
          <div className="col">
            <h3 className="title">Payment</h3>
            <div className="inputBox">
              <span>Cards Accepted :</span>
              <img src="/assets/products/payments.png" alt="Payment Methods" />
            </div>
            <div className="inputBox">
              <span>Name on Card :</span>
              <input type="text" name="cardName" placeholder="Mr. Youssef" value={formData.cardName} onChange={handleChange} required />
            </div>
            <div className="inputBox">
              <span>Credit Card Number :</span>
              <input type="text" name="cardNumber" placeholder="1111-2222-3333-4444" value={formData.cardNumber} onChange={handleChange} maxLength="19" required />
            </div>
            <div className="inputBox">
              <span>Exp Month :</span>
              <input type="text" name="expMonth" placeholder="MM" value={formData.expMonth} onChange={handleChange} maxLength="2" pattern="^(0[1-9]|1[0-2])$" required />
            </div>
            <div className="flex">
              <div className="inputBox">
                <span>Exp Year :</span>
                <input type="text" name="expYear" placeholder="YYYY" value={formData.expYear} onChange={handleChange} maxLength="4" pattern="^20[2-9][0-9]$" required />
              </div>
              <div className="inputBox">
                <span>CVV :</span>
                <input type="text" name="cvv" placeholder="1234" value={formData.cvv} onChange={handleChange} maxLength="4" required />
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="submit-btn">
          Proceed to Checkout
        </button>
      </form>
    </div>
  );
};

export default Payment;
