import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PaymentScreen from './PaymentScreen'

const StripeGate = (props) => {
    const Order=props.route.params
   console.log(Order.order)
    return (
        <PaymentScreen order={Order.order} navigation={props.navigation}/>
    )
}

export default StripeGate


