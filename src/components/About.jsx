import React from 'react'
import Header from './Header'
import Footer from './Footer'
import poster from '../assets/poster1.png'

export default function About() {
    return (
        <>
            <Header />
            <div class="mx-auto max-w-7xl">
                <div class="mx-auto max-w-7xl py-12 ">
                    <div class="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
                        <div class="flex items-center justify-center">
                            <div class="px-2 md:px-12">
                                <p class="text-2xl font-bold text-gray-900 md:text-4xl">
                                    Get to Know Us!
                                </p>
                                <p class="mt-4 text-lg text-gray-600">
                                    Welcome to Shaajo's Creation, where exquisite craftsmanship and timeless elegance come together. Established in 2020, we have quickly risen to become a leading purveyor of stunning jewellery pieces that capture the essence of beauty and sophistication. At our brand, we specialize in creating captivating necklaces, bangles, earrings, and the ever-popular chokers, meticulously handcrafted with a combination of beads and string.
                                </p>
                                <p class="mt-4 text-lg text-gray-600">
                                We invite you to immerse yourself in the world of chockers and discover the perfect piece that resonates with your unique style and personality. With every necklace, bangle, earring, and choker, we aspire to be a part of your most cherished memories, helping you create a lasting impression wherever you go. Welcome to our world of timeless beauty and exquisite craftsmanship.
                                </p>
                            </div>
                        </div>
                        <img
                            alt="Contact us"
                            class="hidden max-h-full w-full rounded-lg object-cover lg:block"
                            src={poster}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
