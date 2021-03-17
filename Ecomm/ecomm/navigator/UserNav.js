import React from "react"
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../Screens/User\/Login'
import Register from '../Screens/User/Register'
import UserProfile from '../Screens/User/UserProfile'
import CheckoutNav from './CheckoutNav';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
           
             <Stack.Screen 
                name="Register"
                component={Register}
                options={{
                    headerShown: false
                }}
            />
             <Stack.Screen 
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
             <Stack.Screen 
                name="User Profile"
                component={UserProfile}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name='Checkout'
                component={CheckoutNav}
                options={{
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    )
}

export default function UserNav() {
    return <MyStack />
}