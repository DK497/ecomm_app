import { Container, Header, Item, Icon, Input } from 'native-base';
import React, {  useState,useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView,Dimensions,ActivityIndicator } from 'react-native'
import Banner from '../../shared/Banner';
import CategoryFilter from './CategoryFilter';
import { useFocusEffect } from '@react-navigation/native';


import ProductList from './ProductList'
import SearchProduct from './SearchProduct';

// baseURl
import  baseURL  from "../../assets/common/baseUrl";
import axios  from 'axios'

var { height } = Dimensions.get('window')




// const numColumns = 2;
const ProductContainer = (props) => {

    const [products, setproducts] = useState([])
    const [prodfiltered, setprodfiltered] = useState([])
    const [focus, setfocus] = useState()
    // pcateg contains product of particular category
    const [pcateg, setpcateg] = useState([])
    const [cat, setcat] = useState([])
    const [active, setactive] = useState()
    const [initialstate, setinitialstate] = useState([])
    const [loading, setloading] = useState(true)

    useFocusEffect((
        useCallback(
            () => {
                setfocus(false)
        
                setactive(-1)
                
                
                axios
                .get(`${baseURL}products`)
                .then((res)=>{
                    // console.log("heya")
                    // console.log(res)
                    setproducts(res.data);
                    setprodfiltered(res.data);
                    setpcateg(res.data)
                    setinitialstate(res.data)
                    setloading(false)
                })
                .catch(err=>console.log("Product CONtainer:products APi cal error"))
        
                axios.get(`${baseURL}categories`)
                .then(res=>{setcat(res.data)})
                .catch(err=>console.log("Product CONtainer:categories APi cal error"))
        
        
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
            },
            []
        )
    ))


    const searchProduct = (text) => {
        // changing prodfiltered on search
        setprodfiltered(
            products.filter(i => i.name.toLowerCase().includes(text.toLowerCase()))
        )
        // console.log(prodfiltered)

    }


    const openList = () => {
        // used by search bar
        setfocus(true)
    }

    const onBlur = () => {
        // used by search bar
        setfocus(false)
    }
    // Categories
    const changeCtg = (ctg) => {
       { 
           ctg == 'all' ? [setpcateg(initialstate), setactive(true)] 
           :
            [setpcateg(
                // provide only products with given category
                products.filter(i => i.category._id === ctg)),
                  setactive(true)
            ]
        }
    }

    // console.log("ProductContainer:focus",focus)
    return (
        <>
        {loading===false?(
        <Container style={styles.container} >
            <Header searchBar rounded style={{backgroundColor:'#00003f'}}>
                <Item style={{borderRadius:100}}>
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
            <ScrollView style={{flex:1}} >
                
                    {/* cat contain categories id and name */}
                    <View style={{flex:2}}>
                        {/* category filter */}
                        <CategoryFilter cat={cat} categfilter={changeCtg}
                            pcateg={pcateg}
                            active={active} setactive={setactive}
                        />
                    </View>
                    <View style={{flex:2}} >
                        <Banner />
                    </View>
                    {/* {console.log(pcateg.length)} */}
                    {pcateg.length>0?(
                         <View style={[styles.listContainer,{marginBottom:pcateg.length*100-((pcateg.length)/2)*50}]}>
                         {pcateg.map((item) => {
                             return(
                                 <ProductList
                                     navigation={props.navigation}
                                     key={item._id}
                                     item={item} />
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
                    

                   
                
            </ScrollView>

                )}

        </Container>):(
            <Container style={[styles.cent,{backgroundColor:'#f2f2f2'}]}>
                  <ActivityIndicator size='large' color='red'/>
            </Container>
        )}
        </>
        

    )
}

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
        
      },
      listContainer: {
        height: height,
        // flex: 5,
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
