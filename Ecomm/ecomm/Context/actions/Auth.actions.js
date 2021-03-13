import jwt_decode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from "react-native-toast-message"
import baseURL from "../../assets/common/baseUrl"

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
    console.log(`user:${user}`)
    
    fetch(`${baseURL}users/login`, {
        method: "POST",
        // to convert object to string
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
            const token = data.token;
            // storing token received with name jwt(can be anything)
            AsyncStorage.setItem("jwt", token)
            const decoded = jwt_decode(token)
            console.log(`decoded:${decoded},original_token:${token}`)
            
            dispatch(setCurrentUser(decoded, user))
        } else { 
            // if we dont have data
           logoutUser(dispatch)
        }
    })
    .catch((err) => {
        // this toast is available on login screen
        Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Please provide correct credentials",
            text2: `${err.name}`
        });
        logoutUser(dispatch)
    });
};

export const getUserProfile = (id) => {
    fetch(`${baseURL}users/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    // returning action object
    return {
        type: SET_CURRENT_USER,
        // payload contains decoded token
        payload: decoded,
        // userProfile has email and password
        userProfile: user
    }
}