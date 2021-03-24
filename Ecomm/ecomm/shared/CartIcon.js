import React from 'react'
import { StyleSheet} from 'react-native'
import { Badge, Text } from "native-base";

import { connect } from "react-redux";//to have access to states in store a props

const mapStateToProps = (state) => {
    const { cartItems } = state

    return {
        cartItems: cartItems
    }
}

const CartIcon = (props) => {
    return (
        <>
      {props.cartItems.length ? (
        <Badge style={styles.badge}>
          <Text style={styles.text}>{props.cartItems.length}</Text>
        </Badge>
      ) : null}
    </>
    )
}


export default connect(mapStateToProps)(CartIcon);

const styles = StyleSheet.create({
    badge: {
        width: 25,
        position: "absolute",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        top: -8,
        right: -15,
      },
      text: {
        fontSize: 12,
        width: 100,
        fontWeight: "bold",
      },
})
