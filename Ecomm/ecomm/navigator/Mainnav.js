import React,{useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from 'react-native-vector-icons/FontAwesome';

//Stacks 
import HomeNav from './Homenav';
import CartNav from './CartNav';
import CartIcon from '../shared/CartIcon';
import UserNav from './UserNav';
import AdminNav from './AdminNav';

// contextapi
import  AuthGlobal  from '../Context/store/AuthGlobal';

const Tab = createBottomTabNavigator();

function MyTabs() {

const context=useContext(AuthGlobal)

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
                    <View>
                        <Icon name="shopping-cart" color={color}
                            style={{ position: 'relative' }} size={30} />
                        <CartIcon />
                    </View>



                ),
            }}
        />
        {context.stateUser.user.isAdmin==true?
        <Tab.Screen
        name="Admin"
        component={AdminNav}
        options={{
            tabBarIcon: ({ color }) => (
                <Icon name="cog" color={color} size={30} />
            ),
        }}
    />
        :null
        }
        
        <Tab.Screen
            name="User"
            component={UserNav}
            options={{
                tabBarIcon: ({ color }) => (
                    <Icon name="user" color={color} size={30} />
                ),
            }}
        />
    </Tab.Navigator>)
}

const Mainnav = () => {
    return (
        <MyTabs/>
    )
}

export default Mainnav


