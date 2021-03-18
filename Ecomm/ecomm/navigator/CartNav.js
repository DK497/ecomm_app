import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Cart from "../Screens/Cart/Cart";
import CheckoutNav from './CheckoutNav';
import StripeGate from '../Screens/Cart/Checkout/StripeGate';




const Stack = createStackNavigator()

function MyStack() {
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
            <Stack.Screen

                name='StripeGate'
                component={StripeGate}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function CartNav() {
    return <MyStack />
}

