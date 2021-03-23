import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { Left, Right, Container, H1, Button } from "native-base";

// redux
import { connect } from "react-redux";
import * as actions from "../../redux/Actions/cartActions";

import Toast from 'react-native-toast-message';
import EasyButton from '../../shared/styledcomp/EasyButton';

import TrafficLight from '../../shared/styledcomp/TrafficLight';



const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => {
            dispatch(actions.addToCart({ quantity: 1, product }))
        }
    }

}

const SingleProduct = (props) => {
    // route.params.item accessing data passed fom one screen
    const [item, setitem] = useState(props.route.params.item);

    // state storing component renderable
    const [availability, setavailability] = useState(null)
    const [availabilitytext, setavailabilitytext] = useState('')

    useEffect(() => {
        if (props.route.params.item.countInStock == 0) {
            setavailability(<TrafficLight unavailable></TrafficLight>);
            setavailabilitytext("Unvailable")
        } else if (props.route.params.item.countInStock <= 5) {
            setavailability(<TrafficLight limited></TrafficLight>);
            setavailabilitytext("Limited Stock")
        } else {
            setavailability(<TrafficLight available></TrafficLight>);
            setavailabilitytext("Available")
        }

        return () => {
            setavailability(null);
            setavailabilitytext("");
        }
    }, [])
    return (
        <Container style={styles.container}>

            <ScrollView style={{ marginBottom: 80, padding: 5 }}>

                <View>

                    <Image
                        source={{
                            uri: item.image ? item.image
                                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                        }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <H1 style={styles.contentHeader}>{item.name}</H1>
                    <Text style={styles.contentText}>{item.brand}</Text>
                </View>
                <View style={styles.availabilityContainer}>
                    <View style={styles.availability}>
                        <Text style={{ marginRight: 10 }}>
                            Availability: {availabilitytext}
                        </Text>
                        {availability}
                    </View>
                    <Text>{item.description}</Text>
                </View>

            </ScrollView>
            <View style={styles.bottomContainer}>
                <Left>
                    <Text style={styles.price}>$ {item.price}</Text>
                </Left>
                <Right>

                    <EasyButton primary medium onPress={() => {
                        props.addItemToCart(item)
                        Toast.show({
                            topOffset: 100,
                            type: "success",
                            text1: `${item.name} added to cart`,
                            text2: "Press here to goto cart",
                            //   onPress:()=>{

                            //   }
                        })
                    }}>
                        <Text style={{ color: 'white' }}> Click  here </Text>
                    </EasyButton>
                </Right>
            </View>



        </Container>
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%'
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 150
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: 'red'
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center"
    },
    availability: {
        flexDirection: 'row',
        marginBottom: 10,
    }
})

export default connect(null, mapDispatchToProps)(SingleProduct);

