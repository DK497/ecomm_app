import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Content, Left, Body, ListItem, Thumbnail, Text } from 'native-base';

var {width}=Dimensions.get('window')

const SearchProduct = (props) => {
    const {prodfiltered}=props
    return (
        <Content style={{width:width}}>
            {prodfiltered.length>0?(

                prodfiltered.map(i=>{
                    return(<ListItem onPress={()=>props.navigation.navigate('Product Detail',{item:i})}
                    key={i.id} avatar>
                        <Left>
                            <Thumbnail source={{uri:i.image?i.image:'https://bitsofco.de/content/images/2018/12/broken-1.png'}}/>
                        </Left>
                        <Body>
                            <Text>{i.name}</Text>
                            <Text note>{i.description}</Text>
                        </Body>

                    </ListItem>
                )})
            ):(
                <View style={styles.cen}>
                    <Text style={{alignSelf:'center'}}>
                        No products match found
                    </Text>
                </View>
            )}
        </Content>
    )
}

const styles = StyleSheet.create({
    cen:{
        justifyContent:'center'
    }
})

export default SearchProduct


