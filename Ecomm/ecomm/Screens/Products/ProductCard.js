import React from 'react'
import { StyleSheet, Text, View,Image,Dimensions, Button } from 'react-native'

import EasyButton from '../../shared/styledcomp/EasyButton';

// connecting to redux store
import { connect } from "react-redux";
import * as actions from "../../redux/Actions/cartActions";

import Toast from 'react-native-toast-message';

// to get dimension of window
var {width}=Dimensions.get("window");

const mapDispatchToProps=(dispatch)=>{
    // the dispatch keyword implements in reducer
    // all functions need to be called using dispatch as action objects is always returmned
    // which need to be mapped to reducer to change state
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
              resizeMode='center'
        source={{uri:image?image:'https://bitsofco.de/content/images/2018/12/broken-1.png'}}
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
                <EasyButton primary medium
                  onPress={()=>{
                      props.addItemToCart(props)
                        Toast.show({
                          topOffset:100,
                          type:"success",
                          text1:`${name} added to cart`,
                          text2:"Press here to goto cart",
                        //   onPress:()=>{
                              
                        //   }
                        })

                  }}>
                      <Text style={{color:"white"}}>Add</Text>
                      </EasyButton>  
            </View>
            :
            <Text style={{marginTop:20}}>Currently Unavailable</Text>}

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