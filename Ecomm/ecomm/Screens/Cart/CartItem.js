import React, { useState } from 'react'
import { StyleSheet,  View } from 'react-native'
import { Container, Text, Left, Right, H1, ListItem, Thumbnail, Body , Icon, Badge } from "native-base"
import EasyButton from '../../shared/styledcomp/EasyButton'

const CartItem = (props) => {
    const data = props.item.item.product
    const [quantity, setquantity] = useState(props.item.item.quantity)
    return (
        <ListItem style={styles.listItem}
            key={Math.random()} avatar>
            <Left>
                <Thumbnail source={{ uri: data.image ? data.image : 'https://www.freepngimg.com/download/motorcycle/12-motorbiker-on-motorcycle-png-image-man-on-motorcycle-png-image.png' }}
                />
            </Left>
            <Body style={styles.body}>
                <Left>
                    <Text>{data.name}</Text>
                </Left>
                <Right>
                    <Text>{data.price}</Text>
                </Right>
                {/* <Right>
                   <EasyButton small primary onPress={()=>setquantity(quantity+1)}>
                       <Text>Click</Text>
                   </EasyButton>
                </Right> */}
            </Body>
        </ListItem>
    )
}

export default CartItem

const styles = StyleSheet.create({
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
})
