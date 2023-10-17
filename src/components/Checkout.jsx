import React from 'react'
import Header from './Header'
import Footer from './Footer'
import success from '../assets/success.gif'
import { Link } from 'react-router-dom'
function Checkout() {
  return (
    <>
      <Header/>
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className=" p-8 rounded-lg shadow-lg text-center"
      style={{backgroundColor:'#ECEEED'}}
      >
        <img
          src={success}
          alt="Order Complete"
          className="w-50 h-50 mx-auto mb-4"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Order Successfully Placed !
        </h1>
        <p className="text-gray-600 mb-8">
          Your order details will be emailed to you within the next 24 hours.
        </p>
        <Link
          to="/"
          className="bg-black text-white rounded-full px-4 py-2 inline-block font-semibold hover:bg-gray-800 transition duration-300 ease-in-out"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
      <Footer/>
    </>
    )
}

export default Checkout