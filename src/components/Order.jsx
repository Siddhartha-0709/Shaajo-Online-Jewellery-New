import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import Header from './Header';
import Footer from './Footer';

function Order() {
  const location = useLocation();
  const initialProductData = location.state; 
  
  function calculateSubtotal(productData) {
    let totalCost = 0;
    for (const product of productData) {
      totalCost += Number(product.productPrice);
    }
    return totalCost;
  }
  const navigate = useNavigate();
  const [productData, setProductData] = useState(initialProductData);
  const handleRemoveProduct = (productName) => {
    const updatedProductData = productData.filter(
      (product) => product.productName !== productName
    );
    setProductData(updatedProductData);
  };
  const handleBuyNow = ()=>{
    navigate('/delivery',{state:productData})
  }
  return (
    <>
      <Header/>
      <div className="mx-auto my-4 max-w-4xl md:my-6">
        <div className="overflow-hidden rounded-xl border border-gray-100 shadow">
          <div className="">
            <div className="px-5 py-6 md:border-r md:border-r-gray-200 md:px-8">
              <div className="flow-root">
                {productData.map((product) => (
                  <li className="flex items-stretch justify-between space-x-5 py-7" key={product.productName}>
                    <div className="flex flex-1 items-stretch">
                      <div className="flex-shrink-0">
                        <img
                          className="h-40 w-30 rounded-lg border border-gray-200 object-contain"
                          src={product.productImage}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-5 flex flex-col justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">
                            {product.productName}
                          </p>
                          <p className="mt-1.5 text-sm font-medium text-gray-600">
                            {product.productDescription}
                          </p>
                        </div>
                        <p className="mt-4 text-sm font-medium text-gray-500">x 1</p>
                      </div>
                    </div>
                    <div className="ml-auto flex flex-col items-end justify-between">
                      <p className="text-right text-sm font-bold text-gray-900">
                        ₹{product.productPrice}
                      </p>
                      <button
                        type="button"
                        className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        onClick={() => handleRemoveProduct(product.productName)}
                      >
                        <span className="sr-only">Remove</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
                <hr className="mt-6 border-gray-200" />
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center justify-between">
                    <p className="text-sm font-medium">Total Product Price:</p>
                    <p className="text-sm font-medium">₹{calculateSubtotal(productData)}</p>
                  </li>
                </ul>
              </div>
              <div className="flex justify-end"> {/* Use flex and justify-end to align the button to the right */}
                <button
                  type="button"
                  className="mt-4 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Order;
