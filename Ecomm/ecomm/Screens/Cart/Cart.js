import React, { useContext } from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import {
    Container, Text, Left, Right, H1, H2, 
    Icon} from "native-base";
import { SwipeListView } from 'react-native-swipe-list-view';


var { height, width } = Dimensions.get('window')

// Redux
import { connect } from "react-redux";//to have access to states in store a props
import * as actions from "../../redux/Actions/cartActions";

import CartItem from './CartItem';
import EasyButton from '../../shared/styledcomp/EasyButton';

// Context
import AuthGlobal from "../../Context/store/AuthGlobal";

const mapStateToProps = (state) => {
    const { cartItems } = state
    console.log('CArt:',state)

    return {
        cartItems: cartItems
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        clearItems: () => dispatch(actions.clearCart()),

        clearSingle: (i) => dispatch(actions.removeFromCart(i))

    }

}


const Cart = (props) => {

    const context = useContext(AuthGlobal)

    var total = 0

    props.cartItems.forEach(i => (
        total += i.product.price
    ))
//  console.log("CArt",context.stateUser)

    return (
        <>
            {
                props.cartItems.length > 0 ?
                    <Container >
                        <H1 style={{
                            alignSelf: 'center',marginTop:'2.5%',
                            height: 40
                        }}>
                            Cart </H1>
                        {/* {props.cartItems.map(i => {
                            return ( 
                                // to access an item we must do i.product
                               <CartItem item={i}/>
                            )
                        })} */}
                        <View style={{
                            margin: 10, backgroundColor: '#304b75',
                            borderBottomStartRadius: 50, borderBottomEndRadius: 50
                        }}>

                            <H2 style={{ alignSelf: 'center', color: 'white' }}>
                                Login to checkout Cart products
                        </H2>

                        </View>
                        <SwipeListView data={props.cartItems}
                            renderItem={(data) => <CartItem item={data} />}
                            // to access single item data.item.product
                            renderHiddenItem={data => (
                                <View style={styles.hiddenContainer}>
                                    <TouchableOpacity style={styles.hiddenButton}
                                        onPress={() => props.clearSingle(data.item)}
                                    >

                                        <Icon name='trash' color='white' size={20} />
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
                        <View></View>
                        <View style={styles.bottomContainer}>

                            <Left>
                                <Text style={styles.price}>${total}</Text>
                            </Left>


                            <Right>

                                <EasyButton danger medium
                                    onPress={props.clearItems}>

                                    <Text style={{ color: 'white' }}>Clear</Text>
                                </EasyButton>

                            </Right>
                            <Right>
                                {context.stateUser.isAuthenticated ?
                        (         <EasyButton primary medium
                                    onPress={() => props.navigation.navigate('Checkout')}>

                                    <Text>Checkout</Text>
                                </EasyButton >) : 
                                // nested navigation
                                (<EasyButton secondary medium
                                    onPress={() => props.navigation.navigate('User',{ screen: 'Login' })}
                                >

                                    <Text>Login</Text>
                                </EasyButton >)}

                            </Right>



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
        justifyContent: 'space-between',
        alignItems: 'center'

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


