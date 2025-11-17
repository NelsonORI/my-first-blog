import { createContext,  useContext, useState} from "react";
import api from "../api.jsx";
const AuthContext = createContext(null); 

//The consumer allows all components to access the contents of the context
export const useAuth = () => {
    return useContext(AuthContext);
};

//The provider wraps around components that need access to the context.Making it available to all child components
export const AuthProvider = ({children, initialUser}) => {
    const [user, setUser] = useState(initialUser);

    const login = async (username, password) => {
        try{
            const response = await api.post('/login', {
                loginname: username,
                loginpassword:password
            });
            
            if (response.data.status === 'success'){
                setUser(response.data.user);
                return {
                    status: 'success',
                    message: 'Login successful'
                };
            }
            
            return response;
        }catch (error){
            return {
                data: {
                    status: 'error',
                    message: 'Login failed'
                },
                status: 'error',
                message: 'Login failed'
            }
        }

    };

    const registerUser = async (username, email, password) => {
        try{
            const response = await api.post('/register', {
                name:username,
                email:email,
                password:password
            })
            if(response.status === "success"){
                return {
                    status: 'success',
                    message: 'Registration successful'
                };
            }
            return response;
        }catch (error){
            console.error('Registration failed:', error);
        }
    };

    const value = {
        user,
        login,
        registerUser
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
};
