import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { ref, getDatabase, push } from "firebase/database";
import { ref as sref, getStorage } from "firebase/storage";
import { uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { render } from "react-dom";
import {
    Dots,
    Levels,
    Sentry,
    Spinner,
    Squares,
    Digital,
    Bounce,
    Windmill
} from "react-activity";
import "react-activity/dist/library.css";
import Header from './Header';
import Footer from './Footer';

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
export const storage = getStorage(app);

export default function Upload() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState([]);
    const [productColor, setProductColor] = useState([]);
    const [productCategory, setProductCategory] = useState([]);
    const [productImage, setProductImage] = useState();
    const [url, setUrl] = useState('');
    const [progress, setProgrss] = useState(false);
    const colors = ['White', 'Navy 1Blue', 'Brown', 'Green', 'Purple', 'Orange', 'Metallic Silver', 'Red', 'Golden', 'Pink', 'Silver', 'Yellow', 'Black'];
    const categories = ['New Arrivals', 'Earrings', 'Necklace', 'Others', 'Set', 'Oxidized'];
    const [pwd, setPwd] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pwd === 'shaajo') {
            const productsRef = ref(database, 'products');
            const storageRef = sref(storage, productImage.name);
            const uploadTask = uploadBytesResumable(storageRef, productImage);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    var progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgrss(true);
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setUrl(url);
                        console.log(url);
                        push(productsRef, {
                            name: productName,
                            price: productPrice,
                            description: productDescription,
                            color: productColor,
                            category: productCategory,
                            imageUrl: url,
                        }).then(() => {
                            alert('Upload Complete');
                            setProgrss(false);
                        });
                        setProductName('');
                        setProductPrice('');
                        setProductDescription([]);
                        setProductColor([]);
                        setProductCategory([]);
                        setProductImage(null);
                    });
                }
            );
        }
        else{
            alert('wrong password');
        }
    };


    return (
        <>
            <Header />
            <div className="max-w-md mx-auto mt-8 p-6 rounded-md shadow-md" style={{ backgroundColor: "#FBECB2" }}>
                <h1 className="text-2xl font-bold mb-4">Upload a Product</h1>
                {progress ? (<div>
                    <h1 className='font-bold'>Uploading, Please Wait</h1>
                    <Dots size={60} />
                </div>) : <>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="productName" className='font-bold'>Admin Password</label>
                            <input
                                type="text"
                                id="productName"
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                                className="w-full border rounded-md px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="productName" className='font-bold'>Product Name</label>
                            <input
                                type="text"
                                id="productName"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="w-full border rounded-md px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="productPrice" className='font-bold'>Product Price</label>
                            <input
                                type="number"
                                id="productPrice"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                                className="w-full border rounded-md px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="productDescription" className='font-bold'>Product Description</label>
                            <input
                                type="text"
                                id="productDescription"
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                className="w-full border rounded-md px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="productImage" className='font-bold'>Product Image</label>
                            <input
                                type="file"
                                id="productImage"
                                onChange={(e) => setProductImage(e.target.files[0])}
                                className="w-full"
                            />
                            {productImage && (
                                <img
                                    src={URL.createObjectURL(productImage)}
                                    alt="Product Preview"
                                    className="mt-2 max-w-md"
                                />
                            )}
                        </div>
                        <div className="mb-4">
                            <label className='font-bold'>Product Color</label>
                            <div>
                                {colors.map((color) => (
                                    <label key={color} className="block cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value={color}
                                            checked={productColor.includes(color)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setProductColor([...productColor, color]);
                                                } else {
                                                    setProductColor(productColor.filter((c) => c !== color));
                                                }
                                            }}
                                            className="mr-2"
                                        />
                                        {color}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className='font-bold'>Product Category</label>
                            <div>
                                {categories.map((category) => (
                                    <label key={category} className="block cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value={category}
                                            checked={productCategory.includes(category)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setProductCategory([...productCategory, category]);
                                                } else {
                                                    setProductCategory(
                                                        productCategory.filter((c) => c !== category)
                                                    );
                                                }
                                            }}
                                            className="mr-2"
                                        />
                                        {category}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded-md px-4 py-2 hover-bg-blue-700"
                            onClick={handleSubmit}
                        >
                            Upload Product
                        </button>
                    </form>
                </>}

            </div>
            <Footer />
        </>
    );
}