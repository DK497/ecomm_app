import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';

import ProductCard from './ProductCard'

var { width } = Dimensions.get("window");

const ProductList = (props) => {
    const { item } = props;
    return (

        <TouchableOpacity style={{
            width: '50%'
               //  borderColor:'black',borderWidth:5
        }}
            onPress={() => props.navigation.navigate('Product Detail', { item: item })}
             >
            {/* passing to SingleProduct */}
            <View style={{
                width: width / 2.1,
                backgroundColor: 'gainsboro',
                // borderColor:'yellow',borderWidth:5
            }} >
                <ProductCard {...item} />
            </View>
        </TouchableOpacity>


    )
}

export default ProductList;