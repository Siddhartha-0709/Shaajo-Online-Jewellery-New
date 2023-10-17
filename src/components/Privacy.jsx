import React from 'react'
import Header from './Header'
import Footer from './Footer'
import poster from '../assets/poster1.png'

function Privacy() {
    return (
        <>
            <Header />
            <div class="mx-auto max-w-7xl">
                <div class="mx-auto max-w-7xl py-12 ">
                    <div class="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
                        <div class="flex items-center justify-center">
                            <div class="px-2 md:px-12">
                                <p class="text-2xl font-bold text-gray-900 md:text-4xl mb-2">
                                    Terms and Conditions
                                </p>
                                <p class="font-bold text-gray-900 text-lg">
                                    General Terms
                                </p>
                                <ul class="list-disc">
                                    <li>
                                        You must be at least 18 years old or have the permission of a parent or guardian to use our website and make purchases.
                                    </li>
                                    <li>
                                        We strive to provide accurate and up-to-date information about our products, prices, and services. However, we cannot guarantee the absence of errors or omissions and reserve the right to correct any inaccuracies without prior notice.
                                    </li>
                                </ul>

                                <p class="font-bold text-gray-900 text-lg">
                                    Product Terms
                                </p>

                                <ul class="list-disc">
                                    <li>
                                        We make every effort to provide detailed and accurate descriptions of our jewelry, including materials used, dimensions, and other relevant information. However, please note that colors and textures may appear slightly different in person due to variations in computer monitors or other factors.
                                    </li>
                                    <li>
                                        Our inventory is subject to availability, and certain products may be limited in quantity. We strive to promptly update the website to reflect stock changes, but we cannot guarantee the availability of any particular item.
                                    </li>
                                </ul>


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

export default Privacy