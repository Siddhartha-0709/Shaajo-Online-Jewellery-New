
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import OtpInput from 'react-otp-input';
import { useState } from 'react';
import { Client, Account, ID } from 'appwrite';
import { initializeApp } from 'firebase/app';
import { ref, getDatabase, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom"

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

const Track = () => {
    const [showFieldPhone, setshowFieldPhone] = useState(true);
    const [showFieldOTP, setShowFieldOTP] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [userId, setUserID] = useState('');
    const [otp, setOTP] = useState();
    const [userOrders, setUserOrders] = useState(null);
    const client = new Client();
    client.setEndpoint('https://cloud.appwrite.io/v1').setProject('652ce2104cf056342779');
    const account = new Account(client);
    

    const navigate = useNavigate();


    const handleOTPSend = async () => {
        if (phoneNumber === null) {
            alert('Please Enter your Phone Number to Proceed');
        }
        else {
            setshowFieldPhone(false);
            var phone = '+91' + phoneNumber;
            alert('OTP SENT to ' + phone);
            setShowFieldOTP(true);
            const sessionToken = await account.createPhoneSession(
                ID.unique(),
                phone,
            );
            const userId = sessionToken.userId;
            console.log(userId);
            setUserID(userId);
        }
    }

    const handleOTPverify = async () => {
        const query = ref(database, 'orders');
        onValue(query, (snapshot) => {
            const data = snapshot.val();
            if (snapshot.exists()) {
                const arrayOfObjects = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                // console.log(arrayOfObjects);
                const matchingOrders = arrayOfObjects.filter(order => order.customerContact === '6289368650');
                console.log(matchingOrders);
                setUserOrders(matchingOrders);
                setShowFieldOTP(false);
                setShowOrders(true);
            }
        });
        const session = await account.updatePhoneSession(
            userId,
            otp
        );
        if (session != null) {
            alert('success');

        }
    }
    const handlePhoneChange = (event) => {
        setPhoneNumber(event.target.value);
    }
    const handleViewOrders =(orderItem)=>{
        console.log(orderItem);
        navigate('/detailsorder',{state:orderItem});
    }
    return (
        <>
            <Header />
            {showFieldPhone?(<center>
                <div style={{ width: 400, marginTop: 100, marginBottom: 250 }}>
                    <h1 className="text-2xl font-bold text-gray-800">Track your Orders</h1>
                    <p className="text-gray-600 mt-2">
                        Enter your Phone Number
                    </p>
                    <div className="mt-4">
                        <input
                            type="number"
                            placeholder="Enter Phone Number"
                            className="w-full py-2 px-3 rounded-md border border-gray-300 focus:ring focus:ring-indigo-200"
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                        />
                    </div>
                    <button
                        type="button"
                        className="mt-4 w-full py-2 px-4 rounded-md bg-black text-white text-sm font-semibold shadow-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-black"
                        onClick={handleOTPSend}
                    >
                        Send OTP
                    </button>
                </div>
            </center>):(<></>)}
            {showFieldOTP?(<center>
                <div style={{ width: 400, marginTop: 100, marginBottom: 250 }}>
                    <h1 className="text-2xl font-bold text-gray-800">Track your Orders</h1>
                    <p className="text-gray-600 mt-2">
                        Please enter the OTP sent to your phone number:
                    </p>
                    <center>
                        <div className="mt-4">
                            <OtpInput
                                numInputs={6}
                                value={otp}
                                onChange={setOTP}
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
                        </div>
                    </center>
                    <button
                        type="button"
                        className="mt-4 w-full py-2 px-4 rounded-md bg-black text-white text-sm font-semibold shadow-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-black"
                        onClick={handleOTPverify}
                    >
                        Verify OTP
                    </button>
                    <button style={{ marginLeft: 300, marginTop: 10 }}
                    onClick={handleOTPSend}
                    >
                        Resend OTP
                    </button>
                </div>
            </center>):(<></>)}
            {showOrders?(<center>
                <div style={{ width: 400, marginTop: 100, marginBottom: 250 }}>
                    <div style={{backgroundColor:'#F0F0F0', marginBottom:10}}>
                    <h1 className="text-2xl font-bold text-gray-800">Your Order Details</h1>
                    <p className="text-gray-600 mt-2">
                        Find your Order Details Below
                    </p>
                    </div>
                    {userOrders.map((order) => (
                            <button key={order.id} className="bg-white rounded-lg shadow-lg p-4 mt-3" style={{ height: 400 }}
                            onClick={()=>handleViewOrders(order)}
                            >
                                <img src={order.itemDetails.itemDetails[0].productImage} alt="Product" className="rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
                                <div className="mt-4">
                                    <h3 className="text-xl font-semibold">{order.itemDetails.itemDetails[0].productName} + {order.itemDetails.itemDetails.length - 1} other items</h3>
                                    <p className="text-gray-600">Order Date: {order.delivery.orderedOn}</p> {/* You can replace this with the actual order date */}
                                    <p className="text-gray-600">Estimated Arrival: {order.delivery.estimatedDelivery}</p> {/* You can replace this with the actual estimated arrival date */}
                                    <p className="text-gray-600">Status: {order.delivery.status}</p> {/* You can replace this with the actual estimated arrival date */}
                                </div>
                            </button>
                        ))}
                </div>
            </center>):(<></>)}
            <Footer />
        </>
    );
};

export default Track;
