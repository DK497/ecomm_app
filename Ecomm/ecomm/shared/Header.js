import React from "react"
import { StyleSheet, Image, SafeAreaView, View,Text } from "react-native"


const Header = () => {
    return(
        <SafeAreaView style={styles.header}>
            <Image
                source={require("../assets/Logo.png")}
                resizeMode="contain"
                style={{ height: 50,marginTop:10 }}
            />
           
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "center",
        // padding: ,
        backgroundColor:'#00003f'
    }
})

export default Header;