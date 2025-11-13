import BaseLayout from "../Layout/BaseLayout";
import React from "react";
import { useAuth } from "../Context/Context.jsx";

export default function Homepage(){
    const { user } = useAuth();
    if(!user){
        return(
            <BaseLayout>
                <h2>Welcome to the Homepage Guest</h2>
            </BaseLayout>
        );
    }
    return (
        <BaseLayout>
            <h2>Welcome to the Homepage {user.name}</h2> 
        </BaseLayout>
    );
} 