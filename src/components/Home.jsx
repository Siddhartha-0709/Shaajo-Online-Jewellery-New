import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer'
import { useNavigate } from "react-router-dom"
import Header from './Header';
import { initializeApp } from 'firebase/app';
import { ref, getDatabase, onValue } from "firebase/database";
import { Analytics } from '@vercel/analytics/react';
import logo from '../assets/shaajoLOGO.png'
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

function Home() {
    const [allProduct, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    useEffect(() => {
        const query = ref(database, 'products');
        return onValue(query, (snapshot) => {
            const data = snapshot.val();
            if (snapshot.exists()) {
                const arrayOfObjects = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                console.log(arrayOfObjects);
                setProducts(arrayOfObjects);
                setAllProducts(arrayOfObjects);
            }
        });
    }, []);
    const handleCategoryChange = (event) => {
        const value = event.target.value;
        if (selectedCategories.includes(value)) {
            setSelectedCategories(selectedCategories.filter((category) => category !== value));
        } else {
            setSelectedCategories([...selectedCategories, value]);
        }
    };

    const handleColorChange = (event) => {
        const value = event.target.value;
        if (selectedColors.includes(value)) {
            setSelectedColors(selectedColors.filter((color) => color !== value));
        } else {
            setSelectedColors([...selectedColors, value]);
        }
    };
    const handleAddToCart = (product) => {
        setCartCount(cartCount + 1);
        const newCartItem = {
            productName: product.name,
            productPrice: product.price,
            productImage: product.imageUrl,
            productDescription: product.description
        };
        setCartItems([...cartItems, newCartItem]);
    };
    const handleOpenCart = () => {
        navigate('/order', { state: cartItems });
    }
    const handleModifySearch = () => {
        setShowFilters(!showFilters);
        console.log('Categories');
        console.log(selectedCategories);
        console.log('Colors');
        console.log(selectedColors);
        console.log('Product List');
        // console.log(products);
        var filteredProducts = [];
        for (let index = 0; index < products.length; index++) {
            // console.log(products[index].category);
            // console.log(products[index].color);
            // console.log('    ');
            for (let i = 0; i < products[index].category.length; i++) {
                if (selectedCategories.includes(products[index].category[i])) {
                    filteredProducts.push(products[index]);
                    break;
                }
            }
        }
        // console.log(filteredProducts);
        if (filteredProducts.length === 0) {
            for (let index = 0; index < products.length; index++) {
                filteredProducts.push(products[index]);
            }
        }
        var modifiedProducts = [];
        for (let index = 0; index < filteredProducts.length; index++) {
            for (let i = 0; i < filteredProducts[index].color.length; i++) {
                if (selectedColors.includes(products[index].color[i])) {
                    modifiedProducts.push(products[index]);
                    break;
                }
            }
        }
        if (modifiedProducts.length === 0) {
            modifiedProducts = filteredProducts;
        }
        console.log(modifiedProducts)
        setProducts(modifiedProducts);
    };
    const handleReset = () => {
        setSelectedCategories([]);
        setSelectedColors([]);
        setProducts(allProduct);
    }
    const categories = [
        { id: "1", name: "New Arrivals", value: "New Arrivals" },
        { id: "2", name: "Earrings", value: "Earrings" },
        { id: "3", name: "Necklace", value: "Necklace" },
        { id: "4", name: "Others", value: "Others" },
        { id: "5", name: "Full Set", value: "Set" },
        { id: "6", name: "Oxidized", value: "Oxidized" },
        { id: "7", name: "Chemical Beads", value: "Chemical" },
        { id: "8", name: "Pearl", value: "Pearl" },
    ];
    const colors = [
        { id: "1", name: "White", value: "White" },
        { id: "2", name: "Blue", value: "Navy 1Blue" },
        { id: "3", name: "Brown", value: "Brown" },
        { id: "4", name: "Green", value: "Green" },
        { id: "5", name: "Purple", value: "Purple" },
        { id: "6", name: "Orange", value: "Orange" },
        { id: "7", name: "Silver", value: "Silver" },
        { id: "8", name: "Red", value: "Red" },
        { id: "9", name: "Golden", value: "Golden" },
        { id: "10", name: "Yellow", value: "Yellow" },
        { id: "11", name: "Black", value: "Black" },
        { id: "12", name: "Pink", value: "Pink" },
    ];

    const [showFilters, setShowFilters] = useState(false);

    // Add a function to toggle the filters section
    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };
    return (
        <>
            <div className='bg-pink-200 p-8 md:hidden lg:hidden xl:hidden 2xl:hidden' style={{paddingBottom:200}}>
                <div className='pt-20'></div>
                <div className='p-8 flex justify-center' style={{ backgroundColor: '#FFEEF4', borderRadius:200 }}>
                    <img src={logo} style={{ width: 400 }} alt="Shaajo's Creation" />
                </div>
                <h1 className="text-2xl font-bold text-center mt-5">
                    Sparkle | Shine | Shop <br /> <span className="text-pink-600 mt-4">Shaajo's Creation!<br /><br /></span>
                </h1>
                <h2 className="text-lg text-center font-bold">
                    Our dazzling collection is getting ready, <br/> to adorn Your Mobile Screens. 
                </h2>
                <h2 className="text-lg text-center font-bold mt-3">
                    Our futuristic dream-weavers are conjuring a mesmerizing, mind-bending Mobile App, destined to catapult your shopping escapades into the outer realms of seamless awesomeness!
                </h2>
                <h2 className="text-lg text-center mt-8 font-bold">
                    Get your glam on, the bling is just a touch away!
                </h2>
            </div>

            <div className='hidden lg:block'>
                <Header />
                <Analytics />
                <section className="w-full">
                    <div className="mx-auto max-w-7xl px-2 py-1 lg:px-10">
                        <hr className="lg:hidden my-0" />
                        <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
                            <div className="space-y-6 divide-y lg:col-span-3 hidden sm:hidden lg:block">
                                <button
                                    type="button"
                                    className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    onClick={() => handleOpenCart()}
                                >
                                    Open Cart ( {cartCount} )
                                </button>
                                <div className="pt-2">
                                    <h1 className="font-bold text-xl">Apply Filters</h1>
                                    <button onClick={handleReset} style={{ marginLeft: 197, color: "blue" }}>
                                        Reset Filters
                                    </button>
                                    <h3 className="text-lg font-semibold text-gray-900">Category</h3>
                                    <ul className="mt-2 grid grid-cols-2 gap-4">
                                        {categories.map((category) => (
                                            <li key={category.id} className="flex items-center py-2">
                                                <div className="flex items-center">
                                                    <input
                                                        id={category.id}
                                                        name="category[]"
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                                        value={category.value}
                                                        checked={selectedCategories.includes(category.value)}
                                                        onChange={handleCategoryChange}
                                                    />
                                                    <label
                                                        htmlFor={category.id}
                                                        className="ml-3 text-sm font-medium text-gray-900"
                                                    >
                                                        {category.name}
                                                    </label>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-2">
                                    <h3 className="text-lg font-semibold text-gray-900">Color</h3>
                                    <ul className="mt-1 grid grid-cols-2 gap-4">
                                        {colors.map((color) => (
                                            <li key={color.id} className="flex items-center py-1">
                                                <div className="flex items-center">
                                                    <input
                                                        id={color.id}
                                                        name="color[]"
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                                        value={color.value}
                                                        checked={selectedColors.includes(color.value)}
                                                        onChange={handleColorChange}
                                                    />
                                                    <label
                                                        htmlFor={color.id}
                                                        className="ml-3 text-sm font-medium text-gray-900"
                                                    >
                                                        {color.name}
                                                    </label>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button
                                    type="button"
                                    className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    onClick={handleModifySearch}
                                >
                                    Modify Search
                                </button>
                            </div>

                            {showFilters ? (<><div className="space-y-6 divide-y lg:col-span-3 lg:hidden p-4 bg-white border rounded shadow-lg">
                                <div className="mt-4">
                                    <h1 className="font-bold text-xl">Apply Filters</h1>
                                    <button
                                        onClick={handleReset}
                                        className="mt-2 text-blue-600 hover:underline"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Category</h3>
                                    <ul className="mt-2 grid grid-cols-2 gap-4">
                                        {categories.map((category) => (
                                            <li key={category.id} className="flex items-center py-2">
                                                <input
                                                    id={category.id}
                                                    name="category[]"
                                                    type="checkbox"
                                                    className="h-4 w-4 border rounded-sm text-black focus:ring focus:ring-black"
                                                    value={category.value}
                                                    checked={selectedCategories.includes(category.value)}
                                                    onChange={handleCategoryChange}
                                                />
                                                <label
                                                    htmlFor={category.id}
                                                    className="ml-3 text-sm font-medium text-gray-900"
                                                >
                                                    {category.name}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Color</h3>
                                    <ul className="mt-2 grid grid-cols-2 gap-4">
                                        {colors.map((color) => (
                                            <li key={color.id} className="flex items-center py-2">
                                                <input
                                                    id={color.id}
                                                    name="color[]"
                                                    type="checkbox"
                                                    className="h-4 w-4 border rounded-sm text-black focus:ring focus:ring-black"
                                                    value={color.value}
                                                    checked={selectedColors.includes(color.value)}
                                                    onChange={handleColorChange}
                                                />
                                                <label
                                                    htmlFor={color.id}
                                                    className="ml-3 text-sm font-medium text-gray-900"
                                                >
                                                    {color.name}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button
                                    type="button"
                                    className="mt-4 w-full bg-black text-white rounded-sm px-3 py-2 text-sm font-semibold hover:bg-black/80 focus:outline-none focus:ring focus:ring-black"
                                    onClick={handleModifySearch}
                                >
                                    Modify Search
                                </button>
                            </div></>) : null}
                            <div className="rounded-lg border-2 border-dashed px-2 lg:col-span-9 lg:h-full">
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                                    {products.map((product) => (
                                        <div className="rounded-md border" key={product.id}>
                                            <img
                                                className="rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
                                                src={product.imageUrl}
                                                alt="product image"
                                                style={{ marginLeft: 'auto', marginRight: 'auto', height: 230 }}
                                            />
                                            <div className="p-4">
                                                <h1 className="inline-flex items-center text-lg font-semibold">
                                                    {product.name}
                                                </h1>
                                                <p className="mt-3 text-lg font-bold text-gray-600">₹{product.price}</p>

                                                <button
                                                    type="button"
                                                    className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                    onClick={() => handleAddToCart(product)}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}

export default Home;
