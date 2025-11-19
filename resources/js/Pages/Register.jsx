import BaseLayout from "../Layout/BaseLayout";
import { useAuth } from "../Context/Context";
import React, { useState } from "react";
import api from "../api";
import { router } from "@inertiajs/react";

export default function RegisterPage(){
    const { registerUser } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await registerUser(username, email, password);
        if (result.status === 'success') {
            router.visit('/login')
            // Optionally redirect to login or home page
        } else {
            alert('Registration failed. Please try again.');
        }
    }
    return (
            <div className="container mx-auto">
                <h1>Register Page</h1>
                <form className="flex-col" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Register</button>
                </form>
            </div>
    );
};

RegisterPage.layout = page => <BaseLayout children={page} />;
