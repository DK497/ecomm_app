import React, { useState, useEffect,useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Item, Picker, Toast, Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import FormContainer from '../../../shared/Form/FormContainer'
import Input from '../../../shared/Form/Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EasyButton from '../../../shared/styledcomp/EasyButton'

import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from "axios"
import baseURL from "../../../assets/common/baseUrl"

// Context
import AuthGlobal from "../../../Context/store/AuthGlobal";

import { connect } from 'react-redux';


const countries = require("../../../assets/countries.json");

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}


const Checkout = (props) => {

    const context = useContext(AuthGlobal)

    const [orderItems, setOrderItems] = useState();
    const [address, setAddress] = useState();
    const [address2, setAddress2] = useState();
    const [city, setCity] = useState();
    const [zip, setZip] = useState();
    const [country, setCountry] = useState();
    const [phone, setPhone] = useState();
    const [user, setUser] = useState();//this contains user id
    const [userProfile, setUserProfile] = useState()
    // this contains email and password

    useEffect(() => {

        setOrderItems(props.cartItems)
        console.log('Checkout Screen',context.stateUser)

        if(context.stateUser.isAuthenticated) {
            setUser(context.stateUser.user.userId);
            setUserProfile(context.stateUser.userProfile)
           


        } 
        else {
            props.navigation.navigate("Cart");
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please Login to Checkout",
                text2: ""
            });
        }

        return () => {
            setOrderItems()
        }
    }, [])

    const checkOut = () => {
        let order = {
            city,
            country,
            dateOrdered: Date.now(),
            orderItems,
            phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            status: "3",
            user,
            userProfile,
            zip,
        }

        props.navigation.navigate("Payment", { order: order })
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title={"Shipping Address"}>
                <Input
                    placeholder={"Phone"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input
                    placeholder={"Shipping Address 1"}
                    name={"ShippingAddress1"}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
                <Input
                    placeholder={"Shipping Address 2"}
                    name={"ShippingAddress2"}
                    value={address2}
                    onChangeText={(text) => setAddress2(text)}
                />
                <Input
                    placeholder={"City"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                <Input
                    placeholder={"Zip Code"}
                    name={"zip"}
                    value={zip}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setZip(text)}
                />
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
                        style={{ width: undefined }}
                        selectedValue={country}
                        placeholder="Select your country"
                        placeholderStyle={{ color: '#007aff' }}
                        placeholderIconColor="#007aff"
                        onValueChange={(e) => setCountry(e)}
                    >
                        {countries.map((c) => {
                            return <Picker.Item
                                key={c.code}
                                label={c.name}
                                value={c.name}
                            />
                        })}
                    </Picker>
                </Item>
                <View style={{ width: '80%',alignItems:'center' }}>
                    <EasyButton darkg medium onPress={() => checkOut()}>
                        <Text style={{alignSelf:'center',color:'white'}} >Confirm</Text>
                    </EasyButton>
                   
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    )
}

export default connect(mapStateToProps, null)(Checkout)

const styles = StyleSheet.create({})
