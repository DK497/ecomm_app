import React, { useState, useCallback } from "react"
import { View, FlatList, Text } from "react-native"
import axios from "axios"
import baseURL from "../../assets/common/baseUrl"
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage'

import OrderCard from "../../shared/OrderCard"


const Orders = (props) => {

    const [orderList, setOrderList] = useState();
    const [token, setToken] = useState();

    useFocusEffect(
        useCallback(



            () => {

                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res);
                    })
                    .catch((error) => console.log(error));


                getOrders();
                return () => {
                    setOrderList();
                }
            },
            [],
        )
    )


    const getOrders = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
            .get(`${baseURL}orders`,config)
            .then((res) => {
                setOrderList(res.data);
            })
            .catch((error) => console.log(error))
    }

    return (
        <View>
            
            <FlatList
                data={orderList}
                renderItem={({ item }) => (
                    // <Text>{item.city}</Text>
                    <OrderCard navigation={props.navigation} {...item} editMode={true}/>
                )}
                keyExtractor={(item) => item._id}
            />
        </View>
    )
}

export default Orders;