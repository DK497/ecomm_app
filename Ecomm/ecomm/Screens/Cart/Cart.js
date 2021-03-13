import React from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import { Container, Text, Left, Right, H1, ListItem, Thumbnail, Body, Button, Icon,Badge } from "native-base";
import {SwipeListView  } from 'react-native-swipe-list-view';


var { height, width } = Dimensions.get('window')

import { connect } from "react-redux";//to have access to states in store a props

import * as actions from "../../redux/Actions/cartActions";
import CartItem from './CartItem';

const mapStateToProps = (state) => {
    const { cartItems } = state

    return {
        cartItems: cartItems
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        clearItems: () =>dispatch(actions.clearCart()),

        clearSingle:(i)=>dispatch(actions.removeFromCart(i))
        
    }

}


const Cart = (props) => {
    var total = 0

   props.cartItems.forEach(i=>(
       total+=i.product.price
   )  )


    return (
        <>
            {
                props.cartItems.length > 0 ?
                    <Container >
                        <H1 style={{ alignSelf: 'center' }}>
                            Cart </H1>
                        {/* {props.cartItems.map(i => {
                            return ( 
                                // to access an item we must do i.product
                               <CartItem item={i}/>
                            )
                        })} */}
                        <SwipeListView data={props.cartItems} 
                        renderItem={(data)=><CartItem item={data}/>}
                        // to access single item data.item.product
                        renderHiddenItem={data=>(
                            <View style={styles.hiddenContainer}>
                                <TouchableOpacity style={styles.hiddenButton}
                                 onPress={()=>props.clearSingle(data.item)}
                                 >

                                    <Icon name='trash' color='white' size={20}/>
                                </TouchableOpacity>
                            </View>
                        )}
                        
                        disableRightSwipe={true}
                        previewOpenDelay={3000}
                        friction={1000}
                        tension={40}
                        leftOpenValue={75}
                        stopLeftSwipe={75}
                        rightOpenValue={-75}
                             />

                        <View style={styles.bottomContainer}>

                            <Left>
                                <Text style={styles.price}>${total}</Text>
                            </Left>
                           <View style={{justifyContent:'space-between'}}>
                           <Right>
                                <Button iconLeft transparent warning
                                 onPress={props.clearItems}>
                                    <Icon name='beer' />
                                    <Text style={{ color: 'white' }}>Clear</Text>
                                </Button>
                            </Right>
                            <Right>
                                <Button iconLeft dark 
                                onPress={() => props.navigation.navigate('Checkout')}
                                >
                                    <Icon name='cog' />
                                    <Text>Checkout</Text>
                                </Button >
                            </Right>
                           </View>
                        </View>

                    </Container> :
                    <Container style={styles.emptyContainer}>
                        <Text>
                            Look like cart is empty
                    </Text>
                        <Text>
                            Add products to carts to get started
                    </Text>
                    </Container>
            }
        </>
    )
}

const styles = StyleSheet.create({

    emptyContainer: {
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },

    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        elevation: 20,
        justifyContent:"space-evenly",
        alignItems:'center'

    },
    price: {
        fontSize: 18,
        margin: 5,
        color: 'red'
    },
    hiddenContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    hiddenButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 25,
        height: 70,
        width: width / 1.2
    }


})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)


