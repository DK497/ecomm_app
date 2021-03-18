import React, { useState, useCallback } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Linking,Button } from 'react-native'
import PaymentView from './PaymentView'
import axios from 'axios';
import baseURL from '../../../assets/common/baseUrl';
import EasyButton from '../../../shared/styledcomp/EasyButton';
import Toast from "react-native-toast-message"
// settin up redux
import { connect } from 'react-redux'
import * as actions from '../../../redux/Actions/cartActions'


const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart())
    }
}
const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return <Button title={children} onPress={handlePress} />;
};
const PaymentScreen = (props) => {
    // to get complete detail of order
    // console.log("paymentscreen:", props.order)
    // to get detail of products
    // console.log("paymentscreen1:", props.order.orderItems)
    // console.log(`${props.order.shippingAddress1} ${props.order.shippingAddress2}`)

    const [response, setResponse] = useState()
    const [makePayment, setMakePayment] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState('')
    const [complete, setcomplete] = useState(false)
    const [receipt, setreceipt] = useState('')

    // obtaining total of orders
    const total = props.order.orderItems.map(i => i.product.price).reduce((i, j) => i + j, 0)
    // console.log("paymentscreen3:", total)

    const cartInfo = {
        id: '5eruyt35eggr76476236523t3',
        description: 'Easy Cart order',
        amount: total
    }

    const onCheckStatus = async (paymentResponse) => {
        setPaymentStatus('Please wait while confirming your payment!')
        // payment response is sent by stripe api
        setResponse(paymentResponse)

        // converting stringified response to JSOn
        let jsonResponse = JSON.parse(paymentResponse);

        // perform operation to check payment status
        try {

            const stripeResponse = await axios.post(`${baseURL}payment`, {
                // email should be a valid one
                email: 'dhananjaik497@gmail.com',
                product: cartInfo,
                authToken: jsonResponse
            })

            if (stripeResponse) {
                // stripResponse is sent by server
                // console.log('Data:', stripeResponse.data);
                // console.log('download link:', stripeResponse.data.receipt_url)
                const { paid } = stripeResponse.data;
                setcomplete(paid)
                setreceipt(stripeResponse.data.receipt_url)
                // console.log('PAID:', paid,typeof(paid))
                // paid is boolean type
                if (paid === true) {
                    setPaymentStatus('Payment Success')
                } else {
                    setPaymentStatus('Payment failed due to issue1')
                }

            } else {
                setPaymentStatus(' Payment failed due to issue2')
            }


        } catch (error) {

            console.log(error)
            setPaymentStatus(' Payment failed due to issue3')

        }

    }
    const confirmOrder = () => {

        const order = props.order;

        console.log('Paymentscreen order:', order)

        axios
            .post(`${baseURL}orders`, order)
            .then((res) => {

                if (res.status == 200 || res.status == 201) {
                    // console.log("SUcc")
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Order Completed",
                        text2: "",
                    })
                    setTimeout(() => {
                        props.clearCart();
                        props.navigation.navigate("Cart")
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: `Error:${error.name}`,
                })
            })


    }


    const paymentUI = () => {

        if (!makePayment) {
            // 1st screen to show
            return (
                <View style={{
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center', height: 300,
                    marginTop: 50, backgroundColor: 'grey'
                }}>

                    <Text style={{ fontSize: 25, margin: 10, color: 'white' }}> Make Payment </Text>
                    <Text style={{ fontSize: 16, margin: 10, color: 'white' }}>
                        Email: {props.order.userProfile.email} </Text>
                    <Text style={{ fontSize: 16, margin: 10, color: 'white' }}>
                        Product To be ordered:
                            {props.order.orderItems.map(i => <Text>{i.product.name}, </Text>)}

                    </Text>
                    <Text style={{ fontSize: 16, margin: 10, color: 'white' }}>
                        Payable Amount: {cartInfo.amount} </Text>

                    <TouchableOpacity style={{
                        height: 60, width: 300, backgroundColor: '#FF5733',
                        borderRadius: 30, justifyContent: 'center',
                        alignItems: 'center'
                    }}
                        onPress={() => { setMakePayment(true) }}
                    >
                        <Text style={{ color: '#FFF', fontSize: 20 }}>
                            Proceed To Pay
                        </Text>

                    </TouchableOpacity>


                </View>
            )




        }
        else {

            if (response !== undefined) {
                // when payment successful  
                return <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 300, marginTop: 50 }}>
                    <Text style={{ fontSize: 25, margin: 10 }}> {paymentStatus} </Text>
                    {complete === true ?
                        <View style={{alignItems:'center'}}>
                            <OpenURLButton url={receipt}>Download Receipt First</OpenURLButton>
                            <EasyButton primary medium
                                onPress={() => confirmOrder()}>
                                <Text>Place order</Text>
                            </EasyButton>
                          
                        </View> :
                        <EasyButton secondary medium
                            onPress={() => props.navigation.navigate('Cart')}>
                            <Text>
                                Press to try Again
                            </Text>
                        </EasyButton>}
                    <Text style={{ fontSize: 16, margin: 10 }}> {response} </Text>
                </View>

            } else {
                // show to make payment
                return <PaymentView onCheckStatus={onCheckStatus} product={cartInfo.description} amount={cartInfo.amount}

                    city={props.order.zip} address={`${props.order.shippingAddress1} ${props.order.shippingAddress2}`}
                    zip={props.order.zip}
                />

            }

        }

    }


    return (
        <View style={styles.container}>
            {paymentUI()}
        </View>)
}


const styles = StyleSheet.create({

    container:
    {
        flex: 1,

    },
    navigation:
    {
        flex: 2,
        backgroundColor: 'red'
    },
    body:
    {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    footer:
    {
        flex: 1,
        backgroundColor: 'cyan'
    }
})

export default connect(null, mapDispatchToProps)(PaymentScreen);