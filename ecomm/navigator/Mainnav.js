import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from 'react-native-vector-icons/FontAwesome';

//Stacks 
import HomeNav from './Homenav';
import CartNav from './CartNav';

const Tab = createBottomTabNavigator();

const Mainnav = () => {
    return (
        <Tab.Navigator initialRouteName="Home"
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                //   colorise active icon with color
                activeTintColor: "#e91e63",
            }}>
            <Tab.Screen
                name="Home"
                component={HomeNav}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" style={{ position: 'relative' }}
                            color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartNav}
                options={{
                    tabBarIcon: ({ color }) => (

                        <Icon name="shopping-cart" color={color}
                            style={{ position: 'relative' }} size={30} />


                    ),
                }}
            />
            <Tab.Screen
                name="Admin"
                component={HomeNav}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="cog" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="User"
                component={HomeNav}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="user" color={color} size={30} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default Mainnav


