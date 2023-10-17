import React from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import Header from './Header'
import Footer from './Footer';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import OtpInput from 'react-otp-input';
import { Client, Account, ID } from 'appwrite';
import { initializeApp } from 'firebase/app';
import { ref, getDatabase, push } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAK_RWW5YNc6_nCDkJVURDFOmy9lxWyHYE",
    authDomain: "shaajo-online-jewellery-a2f57.firebaseapp.com",
    databaseURL: "https://shaajo-online-jewellery-a2f57-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "shaajo-online-jewellery-a2f57",
    storageBucket: "shaajo-online-jewellery-a2f57.appspot.com",
    messagingSenderId: "807746544905",
    appId: "1:807746544905:web:3b2a819c107ef939121fd8",
    measurementId: "G-SXK37FL64C"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
function Delivery() {
    const location = useLocation();
    const productData = location.state;
    const navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState(null);
    const [email, setEmail] = useState();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [area, setArea] = useState('');
    const [landmark, setLandmark] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [deliveryPhone, setDeliveryPhone] = useState('');

    const [otp, setOTP] = useState('');
    const [formOpen, setFormOpen] = useState(true);
    const [userId, setUserID] = useState('');
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('');


    const client = new Client();
    client.setEndpoint('https://cloud.appwrite.io/v1').setProject('652ce2104cf056342779');
    console.log(productData);
    function calculateSubtotal(productData) {
        let totalCost = 0;
        for (const product of productData) {
            totalCost += Number(product.productPrice);
        }
        return totalCost;
    }
    const account = new Account(client);
    const handleOTPRequest = async () => {
        if (phoneNumber === null) {
            alert('Please Enter your Phone Number to Proceed');
        }
        else {
            var phone = '+91' + phoneNumber;
            setFormOpen(false);
            alert('OTP SENT to ' + phone);
            const sessionToken = await account.createPhoneSession(
                ID.unique(),
                phone,
            );
            const userId = sessionToken.userId;
            console.log(userId);
            setUserID(userId);
        }
    }
    const handleVerify = async () => {
        const session = await account.updatePhoneSession(
            userId,
            otp
        );
        if (session != null) {
            console.log('Login Successful');
            console.log(session);
            setPhoneVerified(true);
            setFormOpen(true);
        }
    };
    function getCurrentDate() {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        
        return `${day}/${month}/${year}`;
      }
      function getCurrentDatePlus10Days() {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 10);
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        
        return `${day}/${month}/${year}`;
      }
    const handleCheckOut = async (e) => {
        e.preventDefault();
        if (phoneVerified === true) {
            const ordersRef = ref(database, 'orders');
            try {
                var currDate= getCurrentDate();
                var deliveryDate = getCurrentDatePlus10Days();
                console.log(productData);
                var totalAmount = calculateSubtotal(productData);
                console.log(totalAmount)
                await push(ordersRef, {
                    customerName: name,
                    customerContact: phoneNumber,
                    customerEmail: email,
                    addressDetails: {
                        addressLine1: address,
                        area: area,
                        city: city,
                        state: state,
                        pinCode: postalCode,
                        landmark: landmark,
                        deliveryPhone: deliveryPhone
                    },
                    itemDetails: {
                        paymentMode: selectedPaymentOption,
                        totalCost: totalAmount,
                        itemDetails: productData
                    },
                    delivery:{
                        orderedOn: currDate,
                        estimatedDelivery:  deliveryDate ,
                        status:'Order Placed'
                    }
                }).then(() => {
                    navigate('/checkout');
                });
            }
            catch (error) {
                console.error('Error writing to Firebase:', error);
            }
        }
        else {
            alert('Please verify your phone number');
        }
    }
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePhoneChange = (event) => {
        setPhoneNumber(event.target.value);
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }
    const handleAreaChange = (event) => {
        setArea(event.target.value);
    }
    const handleLandmarkChange = (event) => {
        setLandmark(event.target.value);
    }
    const handlePinChange = (event) => {
        setPostalCode(event.target.value);
    }
    const handleStateChange = (event) => {
        setState(event.target.value);
    }
    const handleCityChange = (event) => {
        setCity(event.target.value);
    }
    const handleDeliveryPhoneChange = (event) => {
        setDeliveryPhone(event.target.value);
    }
    console.log(productData);
    return (
        <>
            <Header />
            {(formOpen) ? (<div className="mx-auto my-4 max-w-4xl md:my-6">
                <div className='bg-gray-200 p-8 '>
                    <h1 className='font-bold text-2xl'>Delivery and Payment Information</h1>
                </div>
                <div className="overflow-hidden  rounded-xl shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="px-5 py-6 text-gray-900 md:px-8">
                            <div className="flow-root">
                                <div className="-my-6 divide-y divide-gray-200">
                                    <div className="py-6">
                                        <form>
                                            <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                                                <div>
                                                    <h3
                                                        id="contact-info-heading"
                                                        className="text-lg font-semibold text-gray-900"
                                                    >
                                                        Contact information
                                                    </h3>

                                                    <div className="mt-4 w-full">
                                                        <label
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                                                            htmlFor="name"
                                                        >
                                                            Full Name
                                                        </label>
                                                        <input
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                                                            type="text"
                                                            placeholder="Enter your name"
                                                            id="name"
                                                            value={name}
                                                            onChange={handleNameChange}
                                                            required></input>
                                                        <label
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            htmlFor="number"
                                                        >
                                                            Phone Number
                                                        </label>
                                                        <input
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                                                            type="number"
                                                            placeholder="Enter your phone number"
                                                            id="name"
                                                            pattern="^\d{10}$"
                                                            title="Please enter a 10-digit phone number"
                                                            required
                                                            value={phoneNumber}
                                                            onChange={handlePhoneChange}
                                                        />
                                                        <label
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            htmlFor="email"
                                                        >
                                                            Email
                                                        </label>
                                                        <input
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                                                            type="email"
                                                            placeholder="Enter your email address"
                                                            id="email"
                                                            value={email}
                                                            onChange={handleEmailChange}
                                                            required
                                                        />
                                                        {phoneVerified ? (<><div class="mt-2 bg-yellow-100 border-l-4 border-green-500 p-4">
                                                            <div class="flex items-center">
                                                                <div class="p-2">
                                                                    <svg class="h-6 w-6 text-green-500" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 10l2 2 4-4"></path>
                                                                    </svg>
                                                                </div>
                                                                <div class="ml-2">
                                                                    <p class="text-green-500 text-lg font-semibold">Phone Number Verified</p>
                                                                    <p class="text-gray-700">You can now proceed with your payment.</p>
                                                                </div>
                                                            </div>
                                                        </div></>) : (<><div class="mt-2 bg-yellow-100 border-l-4 border-yellow-500 p-4">
                                                            <div class="flex items-center">
                                                                <div class="p-2">
                                                                    <svg class="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16v-4m0-6h.01"></path>
                                                                    </svg>
                                                                </div>
                                                                <div class="ml-2">
                                                                    <p class="text-red-500 text-lg font-semibold">Please Note:</p>
                                                                    <p class="text-gray-700">You cannot proceed with payment unless your phone number is verified.</p>
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="mt-3 w-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                                onClick={handleOTPRequest}
                                                            >
                                                                Verify Phone Number
                                                            </button>
                                                        </div></>)}
                                                    </div>

                                                </div>
                                                <hr className="my-8" />

                                                <div className="mt-10">
                                                    <h3 className="text-lg font-semibold text-gray-900">Shipping address</h3>

                                                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                                                        <div className="sm:col-span-3">
                                                            <label
                                                                htmlFor="address"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Address
                                                            </label>
                                                            <div className="mt-1 mb-3">
                                                                <input
                                                                    type="text"
                                                                    id="address"
                                                                    name="address"
                                                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    value={address}
                                                                    onChange={handleAddressChange}
                                                                    required
                                                                />
                                                            </div>
                                                            <label
                                                                htmlFor="address"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Area, Colony, Street
                                                            </label>
                                                            <div className="mt-1 mb-3">
                                                                <input
                                                                    type="text"
                                                                    id="address"
                                                                    name="area"
                                                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    value={area}
                                                                    onChange={handleAreaChange}
                                                                    required
                                                                />
                                                            </div>
                                                            <label
                                                                htmlFor="address"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Landmark
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="text"
                                                                    id="address"
                                                                    name="landmark"
                                                                    autoComplete="street-address"
                                                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    value={landmark}
                                                                    onChange={handleLandmarkChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label
                                                                htmlFor="city"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                City
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="text"
                                                                    id="city"
                                                                    name="city"
                                                                    autoComplete="address-level2"
                                                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    value={city}
                                                                    onChange={handleCityChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label
                                                                htmlFor="region"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                State / Province
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="text"
                                                                    id="region"
                                                                    name="region"
                                                                    autoComplete="address-level1"
                                                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    value={state}
                                                                    onChange={handleStateChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label
                                                                htmlFor="postal-code"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Postal code
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="number"
                                                                    id="postal-code"
                                                                    name="postal-code"
                                                                    autoComplete="postal-code"
                                                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    value={postalCode}
                                                                    onChange={handlePinChange}
                                                                    pattern="\d{6}"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='mt-3'>
                                                        <label
                                                            htmlFor="postal-code"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Phone Number
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="number"
                                                                name="deliveryPIN"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                value={deliveryPhone}
                                                                onChange={handleDeliveryPhoneChange}
                                                                pattern="\d{10}"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Product List */}
                        <div className="bg-gray-100 px-5 py-6 md:px-8">
                            <div className="flow-root">
                                <ul className="-my-7 divide-y divide-gray-200">
                                    {productData.map((product) => (
                                        <li className="flex items-stretch justify-between space-x-5 py-7">
                                            <div className="flex flex-1 items-stretch">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={product.productImage}
                                                        alt={product.productName}
                                                        className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                                                    />
                                                </div>
                                                <div className="ml-5 flex flex-col justify-between">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-bold">{product.productName}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ml-auto flex flex-col items-end justify-between">
                                                <p className="text-right text-sm font-bold text-gray-900">
                                                    ₹{product.productPrice}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <hr className="mt-6 border-gray-200" />
                            <form action="#" className="mt-6">
                                <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                                    <div className="flex-grow">
                                        <select
                                            className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            id="paymentOptions"
                                            defaultValue="Cash on Delivery"
                                            onChange={(e) => setSelectedPaymentOption(e.target.value)}
                                            value={selectedPaymentOption}
                                            required
                                        >
                                            <option value="" disabled hidden>
                                                Select Payment Option
                                            </option>
                                            <option value="cashOnDelivery">Cash on Delivery</option>
                                            <option value="razorPay">RazorPay</option>
                                            <option value="billDesk">Bill Desk</option>
                                        </select>

                                    </div>

                                </div>
                            </form>
                            <ul className="mt-6 space-y-3">
                                <li className="flex items-center justify-between text-gray-600">
                                    <p className="text-sm font-medium">Sub total</p>
                                    <p className="text-sm font-medium">₹{calculateSubtotal(productData)}</p>
                                </li>
                                <li className="flex items-center justify-between text-gray-900">
                                    <p className="text-sm font-medium ">Total</p>
                                    <p className="text-sm font-bold ">₹{calculateSubtotal(productData)}</p>
                                </li>
                            </ul>
                            <div className="mt-2 flex justify-end border-t border-gray-200 pt-6">
                                <button
                                    type="button"
                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    onClick={handleCheckOut}
                                >
                                    Make payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>) : (<div className="mx-auto my-4 max-w-md md:my-6 rounded-lg">
                <div className="bg-white shadow-lg rounded-lg">
                    <div className='bg-gray-200 p-8 '>
                        <h1 className='font-bold text-2xl'>Phone Number Verification</h1>
                    </div>
                    <p className="text-gray-600 mb-4 pl-8">Please enter the OTP sent to your phone number:</p>
                    <div className="relative mb-6" style={{ paddingLeft: 70 }}>
                        <OtpInput
                            value={otp}
                            onChange={setOTP}
                            numInputs={6}
                            renderSeparator={<span> </span>}
                            inputType="tel"
                            containerStyle={{ display: 'unset' }}
                            inputStyle={{
                                width: "3rem",
                                height: "3.5rem",
                                border: "1px solid #000",
                                borderRadius: "0.5rem", // Add rounded corners
                                fontSize: "1.25rem",
                                textAlign: "center",
                            }}
                            renderInput={(props) => <input {...props} className='otp-input'

                            />}
                        />
                        <button className='text-black' style={{ marginLeft: 226 }} onClick={handleOTPRequest}>Resend OTP</button>
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="mt-3 w-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            onClick={handleVerify}
                        >
                            Verify OTP
                        </button>
                    </div>
                </div>
            </div>)}



            <Footer />
        </>
    )
}

export default Delivery