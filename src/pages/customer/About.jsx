import { useState } from "react";
import { Search, ShoppingCart, User, Menu, MapPin, Phone, Mail, Clock, Award, Users, Target, Heart } from "lucide-react";

const About = () => {
    // Modern Logo Component (same as Home)
    const Logo = () => (
        <div className="flex items-center space-x-2">
            <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">E</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></div>
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 dark:text-white leading-none">EDAR</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-none">CMT</span>
            </div>
        </div>
    );

    const TeamMember = ({ name, role, image, description }) => (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">{name.charAt(0)}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{name}</h3>
            <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">{role}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
        </div>
    );

    const FeatureCard = ({ icon: Icon, title, description }) => (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Location Text Navbar - Centered */}
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 w-full py-2 px-4">
                <div className="max-w-7xl mx-auto flex justify-center items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Store Location: San Miguel Sto Tomas Batangas Philippines</span>
                </div>
            </nav>

            {/* Simple Navigation */}
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <a href="/" className="flex items-center">
                                <Logo />
                            </a>

                            <div className="hidden md:flex ml-10 space-x-8">
                                <a href="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Home</a>
                                <a href="/products" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Products</a>
                                <a href="/about" className="text-gray-900 dark:text-white font-medium">About</a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                <ShoppingCart className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                <User className="w-5 h-5" />
                            </button>
                            <button className="md:hidden p-2 text-gray-500 dark:text-gray-400">
                                <Menu className="w-5 h-5" />
                            </button> */}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        About EDAR CMT
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        We are dedicated to providing exceptional products and outstanding customer service to our community in San Miguel, Sto Tomas, Batangas.
                    </p>
                </div>

                {/* Story Section */}
                <div className="mb-16">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Founded in the heart of Batangas, EDAR CMT started as a small family business with a simple mission: to bring quality products and exceptional service to our local community.
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Over the years, we've grown from a local store to a trusted retailer, but our commitment to our customers and community remains unchanged. We believe in building lasting relationships through honest business practices and genuine care for our customers' needs.
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Today, we continue to evolve and expand our offerings while staying true to our core values of quality, integrity, and community service.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg p-8 text-white">
                                <div className="text-center">
                                    <Award className="w-16 h-16 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">5+ Years</h3>
                                    <p className="text-blue-100">Serving the Community</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Target}
                            title="Quality First"
                            description="We carefully select every product to ensure it meets our high standards for quality and durability."
                        />
                        <FeatureCard
                            icon={Heart}
                            title="Customer Care"
                            description="Your satisfaction is our priority. We're here to help you find exactly what you need."
                        />
                        <FeatureCard
                            icon={Users}
                            title="Community Focus"
                            description="We're proud to be part of the San Miguel community and support local families and businesses."
                        />
                    </div>
                </div>



                {/* Contact Information */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Visit Our Store</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Store Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                                    <div>
                                        <p className="text-gray-900 dark:text-white font-medium">Address</p>
                                        <p className="text-gray-600 dark:text-gray-400">San Miguel, Sto Tomas, Batangas, Philippines</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                                    <div>
                                        <p className="text-gray-900 dark:text-white font-medium">Phone</p>
                                        <p className="text-gray-600 dark:text-gray-400">09165852926
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                                    <div>
                                        <p className="text-gray-900 dark:text-white font-medium">Email</p>
                                        <p className="text-gray-600 dark:text-gray-400">efrending14@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Store Hours</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Monday - Friday</span>
                                    <span className="text-gray-900 dark:text-white">8:00 AM - 75:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Saturday</span>
                                    <span className="text-gray-900 dark:text-white">8:00 AM - 5:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Sunday</span>
                                    <span className="text-gray-900 dark:text-white">8:00 AM - 12:00 PM</span>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    <span className="text-sm text-blue-800 dark:text-blue-200 font-medium">Open Today</span>
                                </div>
                                <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">We're here to serve you!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="mb-4">
                                <Logo />
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Your trusted partner for premium products and exceptional shopping experience.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="/products" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                                        Products
                                    </a>
                                </li>
                                <li>
                                    <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                                        About
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default About;