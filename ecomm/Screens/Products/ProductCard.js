import React from 'react'
import { StyleSheet, Text, View,Image,Dimensions, Button } from 'react-native'

// connecting to redux store
import { connect } from "react-redux";
import * as actions from "../../redux/Actions/cartActions";

// to get dimension of window
var {width}=Dimensions.get("window");

const mapDispatchToProps=(dispatch)=>{
    return{
        addItemToCart:(product)=>{
            dispatch(actions.addToCart({quantity:1,product}))
        }
    }

}

const ProductCard = (props) => {
    const {name,price,image,countInStock}=props;
    return (
        <View style={styles.container}>
            <Image style={styles.image}
              resizeMode='contain'
        source={{uri:image?image:'https://www.freepngimg.com/download/motorcycle/12-motorbiker-on-motorcycle-png-image-man-on-motorcycle-png-image.png'}}
        />
            <View style={styles.card}>
            <Text style={styles.title}>
                {name.length > 15 ? name.substring(0, 12)
                    + '...' : name
                }
            </Text>
            <Text style={styles.price}>
                Rs{price}
            </Text>
            {countInStock>0?
            <View style={{marginBottom:60,alignSelf:'center'}}>
                <Button title={'Add'} color={'green'}
                  onPress={()=>{
                      props.addItemToCart(props)
                  }}/>
            </View>
            :
            <Text style={{marginTop:20}}>Currently</Text>}

            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        width: width / 2 -20,
        height: width / 1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 5,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white',
        // borderWidth:5,
        // borderColor:'red'
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45
    },
    card: {
        marginTop:80,
        height: width / 2 - 20 - 90,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10
    },
     title: {

        fontWeight: "bold",
        fontSize: 14,
        alignSelf:'center'
    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginTop: 10,
        alignSelf:'center'
    }
})


export default connect(null,mapDispatchToProps)(ProductCard)