import React from 'react'
import Header from './Header'
import Footer from './Footer'
import poster from '../assets/poster1.png'
export default function Contact() {
    return (
        <>
            <Header />
            <div class="mx-auto max-w-7xl px-4">
                <div class="mx-auto max-w-7xl py-12 md:py-24">
                    <div class="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
                        <div class="flex items-center justify-center">
                            <div class="px-2 md:px-12">
                                <p class="text-2xl font-bold text-gray-900 md:text-4xl">
                                    Get in touch
                                </p>
                                <p class="mt-4 text-lg text-gray-600">
                                    Our friendly team would love to hear from you.
                                </p>
                                <form action="" class="mt-8 space-y-4">
                                    <div class="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                                        <div class="grid w-full  items-center gap-1.5">
                                            <label
                                                class="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                for="first_name"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                                type="text"
                                                id="first_name"
                                                placeholder="First Name"
                                            />
                                        </div>
                                        <div class="grid w-full  items-center gap-1.5">
                                            <label
                                                class="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                for="last_name"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                                type="text"
                                                id="last_name"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>
                                    <div class="grid w-full  items-center gap-1.5">
                                        <label
                                            class="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            for="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="text"
                                            id="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div class="grid w-full  items-center gap-1.5">
                                        <label
                                            class="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            for="phone_number"
                                        >
                                            Phone number
                                        </label>
                                        <input
                                            class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="tel"
                                            id="phone_number"
                                            placeholder="Phone number"
                                        />
                                    </div>
                                    <div class="grid w-full  items-center gap-1.5">
                                        <label
                                            class="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            for="message"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            id="message"
                                            placeholder="Leave us a message"
                                            cols="3"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="button"
                                        class="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                        Send Message
                                    </button>
                                </form>
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
