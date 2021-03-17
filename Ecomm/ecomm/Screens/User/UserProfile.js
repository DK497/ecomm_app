import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { Container, Left, Right } from "native-base"
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage'

// import OrderCard from "../../Shared/OrderCard"

import axios from "axios"
import baseURL from "../../assets/common/baseUrl"

import AuthGlobal from "../../Context/store/AuthGlobal"
import { logoutUser } from "../../Context/actions/Auth.actions"
import { useEffect } from 'react/cjs/react.development';
import EasyButton from '../../shared/styledcomp/EasyButton';

const UserProfile = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()
    const [orders, setOrders] = useState()

    useFocusEffect(
        useCallback(() => {
            if (
                context.stateUser.isAuthenticated === false ||
                context.stateUser.isAuthenticated === null
            ) {
                props.navigation.navigate("Login")
            }

            AsyncStorage.getItem("jwt")
                .then((res) => {
                    // .userId came from backend
                    // console.log(`id:${context.stateUser.user.userId}`)
                    // console.log(`response:${res}`)
                    // ..user.sub gives id
                    axios
                        .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                            headers: { Authorization: `Bearer ${res}` },
                        })
                        .then((res) => {
                            // console.log(`from UserProfile useEffect`)
                            setUserProfile(res.data)
                        })
                        .catch(err => console.log('error '))
                })
                .catch((error) => console.log('error is threr'))

            // axios
            // .get(`${baseURL}orders`)
            // .then((x) => {
            //     const data = x.data;
            //     console.log(data)
            //     const userOrders = data.filter(
            //         (order) => order.user._id === context.stateUser.user.sub
            //     );
            //     setOrders(userOrders);
            // })
            // .catch((error) => console.log(error))

            return () => {
                setUserProfile();
                setOrders();
            }

        }, [context.stateUser.isAuthenticated]))

    return (
        <Container style={styles.container}>

            <ScrollView contentContainerStyle={styles.subContainer}>

                <Text style={{ fontSize: 30 }}>
                    Hello {userProfile ? userProfile.name : ""}
                </Text>

                <View style={{ marginTop: 20 }}>
                    <Text style={{ margin: 10 }}>
                        Email: {userProfile ? userProfile.email : ""}
                    </Text>
                    <Text style={{ margin: 10 }}>
                        Phone: {userProfile ? userProfile.phone : ""}
                    </Text>
                </View>

                <View style={{ marginTop: 80,flexDirection:'row' }}>
                
                        <EasyButton primary medium
                            onPress={() => logoutUser(context.dispatch)} >
                                <Text>Sign Out</Text>
                        </EasyButton>
                   
                   

                        <EasyButton secondary medium
                            onPress={() => props.navigation.navigate('Checkout')}
                        >

                            <Text>Checkout</Text>
                        </EasyButton >
                  

                </View>

                {/* <View style={styles.order}>

                    <Text style={{ fontSize: 20 }}>My Orders</Text>
                    <View>
                        {orders ? (
                            orders.map((x) => {
                                return <OrderCard key={x.id} {...x} />;
                            })
                        ) : (
                            <View style={styles.order}>
                                <Text>You have no orders</Text>
                            </View>
                        )}
                    </View>
                </View> */}


            </ScrollView>

        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    subContainer: {
        alignItems: "center",
        marginTop: 60
    },
    order: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60
    }
})

export default UserProfile;

// import React from 'react'
// import { StyleSheet, Text, View } from 'react-native'

// const UserProfile = () => {
//     return (
//         <View>
//             <Text>UserProfile</Text>
//         </View>
//     )
// }

// export default UserProfile

// const styles = StyleSheet.create({})
