import React ,{useState} from "react";
import BaseLayout from "../Layout/BaseLayout.jsx";
import { router } from "@inertiajs/react";
import { useAuth } from "../Context/Context.jsx";

export default function LoginPage(){
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(username, password);
        console.log(result);
        if (result.status === 'success'){
            router.visit('/');
        } else {
            alert('Login failed. Please check your credentials.');
            console.log(result.status);

        }
    }

    return (
            <div className="container mx-auto border p-4">
                <h1>Login Page</h1>
                <form className="flex-col" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="loginname" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="loginpassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button  type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Login</button>                      
                </form>
            </div>
    )
}

LoginPage.layout = page => <BaseLayout children={page} />;