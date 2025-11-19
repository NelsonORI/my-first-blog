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
            }else if (response.status === "error"){
                return {
                    status: 'error',
                    message: 'Registration failed'
                }
            }
            return response;
        }catch (error){
            if(error.response && error.response.status === 422){
                return {
                    status: 'validation_error',
                    message: 'Validation failed',
                    errors: error.response.data.errors
                }
            }
            return {
                status: 'error',
                message: 'Something went wrong'
            }
            
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
