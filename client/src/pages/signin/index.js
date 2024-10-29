"use client";
import "../../app/globals.css";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import axios from "axios";

export default function SignIn() {
    const [darkMode, setDarkMode] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const body = document.querySelector('body');
        if (darkMode) {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }
    }, [darkMode]);

    const validate = () => {
        const newErrors = {};
        if (!formData.email.includes('@')) newErrors.email = "Invalid email format";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form Data:", formData);  
        }
        try {
            const response = await axios.post("http://localhost:4000/api/v1/signin", formData);
            console.log("Response:", response.data);
            navigate("/home");
        } catch (error){
            console.log("Error:", error);
        }

    };

    const backgroundStyle = darkMode
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900'
        : 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-100';

    return (
        <div className={`flex min-h-screen transition-all duration-500 ${backgroundStyle}`}>
            {/* Left Side */}
            <div className="flex-1 p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
                <motion.h1 
                    className={`text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-blue-600'}`} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.5 }}
                >
                    Welcome Back!
                </motion.h1>
                <motion.h2 
                    className={`text-4xl font-semibold mb-8 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Sign In to Your Account
                </motion.h2>
                <motion.p 
                    className={`max-w-xl text-lg mb-10 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    Access your forms and data with ease.
                </motion.p>
                <div className="flex space-x-4">
                    <motion.button 
                        type="button" 
                        className={`px-8 py-3 rounded-full text-lg border-2 transition duration-300 ${darkMode ? 'bg-blue-600 text-white border-blue-400 hover:bg-blue-700' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'}`} 
                        initial={{ y: 20, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Link href="/signup/signup">Sign Up</Link>
                    </motion.button>
                </div>
            </div>

            {/* Right Side */}
            <motion.div 
                className={`flex-1 p-12 overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-l-[100px] shadow-2xl relative z-10`}
                initial={{ x: 300, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                transition={{ duration: 0.5, delay: 1 }}
            >
                <div className="flex justify-between items-center mb-8">
                    <h2 className={`text-3xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Sign In</h2>
                    <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        {darkMode ? <Sun className="text-yellow-300" /> : <Moon className="text-gray-800" />}
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <motion.div 
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4"
                    >
                        <label htmlFor="email" className={`block font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>E-mail Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-white text-gray-800 border-blue-300 focus:ring-blue-500'}`}
                        />
                        {errors.email && <span className="text-red-500">{errors.email}</span>}
                    </motion.div>

                    {/* Password Field */}
                    <motion.div 
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4"
                    >
                        <label htmlFor="password" className={`block font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-white text-gray-800 border-blue-300 focus:ring-blue-500'}`}
                        />
                        {errors.password && <span className="text-red-500">{errors.password}</span>}
                    </motion.div>

                    <div className="text-center mt-8 text-black">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className={`w-full mt-6 p-3 rounded-full text-white font-semibold transition-all duration-300 ${
                                darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            Sign In
                        </motion.button>
                        <p>
                            Don't have an account?{' '}
                            <Link href="/signup/signup" className="font-semibold underline hover:text-blue-800">Sign Up</Link>
                        </p>
                        <p className="mt-2">OR</p>
                        <p>If you have any problems, contact the technical team.</p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
