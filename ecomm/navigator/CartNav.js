import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {  createStackNavigator} from "@react-navigation/stack";
import  Cart  from "../Screens/Cart/Cart";
import Checkout from "../Screens/Cart/Checkout";
import ProductContainer from '../Screens/Products/ProductContainer';
import SingleProduct from '../Screens/Products/SingleProduct';



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
                component={Checkout}
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

