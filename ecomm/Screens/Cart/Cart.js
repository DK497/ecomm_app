import React from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import { Container, Text, Left, Right, H1, ListItem, Thumbnail, Body, Button, Icon } from "native-base";

var { height, width } = Dimensions.get('window')

import { connect } from "react-redux";//to have access to states in store a props

const mapStateToProps = (state) => {
    const { cartItems } = state

    return {
        cartItems: cartItems
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
                        {props.cartItems.map(i => {
                            return (
                                <ListItem style={styles.listItem}
                                    key={Math.random()} avatar>
                                    <Left>
                                        <Thumbnail source={{ uri: i.product.image ? i.product.image : 'https://www.freepngimg.com/download/motorcycle/12-motorbiker-on-motorcycle-png-image-man-on-motorcycle-png-image.png' }}
                                        />
                                    </Left>
                                    <Body style={styles.body}>
                                        <Left>
                                            <Text>{i.product.name}</Text>
                                        </Left>
                                        <Right>
                                            <Text>{i.product.price}</Text>
                                        </Right>
                                    </Body>
                                </ListItem>
                            )
                        })}
                        <View style={styles.bottomContainer}>

                            <Left>
                                <Text style={styles.price}>${total}</Text>
                            </Left>
                           <View style={{justifyContent:'space-between'}}>
                           <Right>
                                <Button iconLeft transparent warning>
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
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
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

export default connect(mapStateToProps, null)(Cart)


