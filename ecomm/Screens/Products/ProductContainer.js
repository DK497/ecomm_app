import { Container, Header, Item, Icon, Input } from 'native-base';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView,Dimensions } from 'react-native'
import Banner from '../../shared/Banner';
import CategoryFilter from './CategoryFilter';

import ProductList from './ProductList'
import SearchProduct from './SearchProduct';

var { height } = Dimensions.get('window')
const data = require('../../assets/data/products.json')
const categ = require('../../assets/data/categories.json')
const numColumns = 2;
const ProductContainer = (props) => {

    const [products, setproducts] = useState([])
    const [prodfiltered, setprodfiltered] = useState([])
    const [focus, setfocus] = useState()
    // pcateg contains product of particular category
    const [pcateg, setpcateg] = useState([])
    const [cat, setcat] = useState([])
    const [active, setactive] = useState()
    const [initialstate, setinitialstate] = useState([])

    useEffect(() => {
        setproducts(data);
        setprodfiltered(data);
        setpcateg(data)
        setfocus(false)
        setcat(categ)
        setactive(-1)
        setinitialstate(data)

        // cleanupcode
        return () => {
            setproducts([])
            setprodfiltered([]);
            setpcateg([])
            setfocus()
            setcat([])
            setactive()
            setinitialstate([])
        }
    }, [])

    const searchProduct = (text) => {
        setprodfiltered(
            products.filter(i => i.name.toLowerCase().includes(text.toLowerCase()))
        )
        // console.log(prodfiltered)

    }


    const openList = () => {
        setfocus(true)
    }

    const onBlur = () => {
        setfocus(false)
    }
    // Categories
    const changeCtg = (ctg) => {
       { 
           ctg == 'all' ? [setpcateg(initialstate), setactive(true)] 
           :
            [setpcateg(
                // provide only products with given category
                products.filter(i => i.category.$oid === ctg)),
                  setactive(true)
            ]
        }
    }

    console.log(focus)
    return (
        <Container >
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />

                    <Input placeholder="Search"
                        onFocus={openList}
                        onChangeText={(text) => searchProduct(text)} />
                    {focus == true ? <Icon onPress={onBlur} name='ios-close' /> : null}
                </Item>

            </Header>
            {focus == true ? (
                <SearchProduct navigation={props.navigation}
                prodfiltered={prodfiltered} />
            ) : (
            <ScrollView>
                <View style={{
                    // borderColor:'blue',borderWidth:5
                }}>
                    {/* cat contain categories id and name */}
                    <View style={{ flex: 1, marginTop: 5 }}>
                        <CategoryFilter cat={cat} categfilter={changeCtg}
                            pcateg={pcateg}
                            active={active} setactive={setactive}
                        />
                    </View>
                    <View style={{ flex: 3 }}>
                        <Banner />
                    </View>
                    {console.log(pcateg.length)}
                    {pcateg.length>0?(
                         <View style={styles.listContainer}>
                         {pcateg.map((item) => {
                             return(
                                 <ProductList
                                     navigation={props.navigation}
                                     key={item._id.$oid}
                                     item={item}
                                 />
                             )
                         })}
                     </View>
                    ):
                    // (console.log('heya'),
                        <View style={[styles.cent,{height:height/2}]}>
                            <Text>No product of that caegory</Text>
                        </View>
                    // )

                    }

                    
                </View>
            </ScrollView>

                )}

        </Container>

    )
}

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
      },
      listContainer: {
        height: height,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
      },
      cent: {
          justifyContent: 'center',
          alignItems: 'center'
          
      }


});

export default ProductContainer;
