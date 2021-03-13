import React from 'react'
import {  createStackNavigator} from "@react-navigation/stack";
import  Cart  from "../Screens/Cart/Cart";
import Checkout from "../Screens/Cart//Checkout/Checkout";
import CheckoutNav from './CheckoutNav';
import Payment from '../Screens/Cart/Checkout/Payment';



const Stack=createStackNavigator()

function MyStack()  {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Cart'
                component={Cart}
                options={{
                    headerShown: false,
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

export default function CartNav(){
    return <MyStack/>
}

