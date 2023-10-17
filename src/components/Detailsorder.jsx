import React from 'react'
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Detailsorder() {
    const location = useLocation();
    const orderData = location.state;
    console.log(orderData);
    return (
        <>
            <Header />
            <div className="order-details p-8 bg-white text-black "
            style={{backgroundColor:'#EEEEEE'}}>
                <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                <div className="order-info flex">
                    <div className="customer-info flex-1 mr-8">
                        <h3 className="text-lg font-semibold">Customer Information</h3>
                        <p>Name: {orderData.customerName}</p>
                        <p>Contact: {orderData.customerContact}</p>
                        <p>Email: {orderData.customerEmail}</p>
                    </div>
                    <div className="delivery-info flex-1">
                        <h3 className="text-lg font-semibold">Delivery Information</h3>
                        <p>Address: {orderData.addressDetails.addressLine1}, {orderData.addressDetails.area}, {orderData.addressDetails.city}, {orderData.addressDetails.state} - {orderData.addressDetails.pinCode}</p>
                        <p>Landmark: {orderData.addressDetails.landmark}</p>
                        <p>Delivery Phone: {orderData.addressDetails.deliveryPhone}</p>
                        <p>Ordered On: {orderData.delivery.orderedOn}</p>
                        <p>Estimated Delivery: {orderData.delivery.estimatedDelivery}</p>
                        <p>Status: {orderData.delivery.status}</p>
                    </div>
                </div>
                <div className="items mt-8">
                    <h3 className="text-lg font-semibold mb-4">Ordered Items</h3>
                    {orderData.itemDetails.itemDetails.map((item, index) => (
                        <div key={index} className="item flex mb-4">
                            <div className="item-image w-20 h-20 mr-4">
                                <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                            </div>
                            <div className="item-details flex-1">
                                <h4 className="text-base font-semibold">{item.productName}</h4>
                                <p className="text-sm">Description: {item.productDescription}</p>
                                <p className="text-sm">Price: ₹{item.productPrice}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="payment-info mt-8">
                    <h3 className="text-lg font-semibold">Payment Information</h3>
                    <p>Total Cost: ₹{orderData.itemDetails.totalCost}</p>
                    <p>Payment Mode: {orderData.itemDetails.paymentMode}</p>
                </div>
            </div>
            <Footer />
        </>

    )
}
