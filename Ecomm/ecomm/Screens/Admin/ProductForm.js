import React, { useState, useEffect } from "react"
import {
    View, Text, Image, StyleSheet, TouchableOpacity,  Platform, ScrollView} 
    from "react-native"
import { Item, Picker } from "native-base"
import FormContainer from "../../shared/Form/FormContainer"
import Input from "../../shared/Form/Input"
import EasyButton from "../../shared/styledcomp/EasyButton"
import Error from "../../shared/Error"
import Icon from "react-native-vector-icons/FontAwesome"
import Toast from "react-native-toast-message"
import AsyncStorage from "@react-native-async-storage/async-storage"
import baseURL from '../../assets/common/baseUrl'
import axios from "axios"

import ImagePicker1 from "./ImagePicker1"

import mime from 'mime';

const ProductForm = (props) => {

    const [pickerValue, setPickerValue] = useState();
    const [brand, setBrand] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();

    const [image, setImage] = useState();

    const [description, setDescription] = useState();

    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);

    const [token, setToken] = useState();
    const [err, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [rating, setRating] = useState(0);
    const [isFeatured, setIsFeature] = useState(false);
    const [richDescription, setRichDescription] = useState();
    const [numReviews, setNumReviews] = useState(0);
    const [item, setItem] = useState(null);

    useEffect(() => {
        // checking item props passed through navigation frm ListItem

        if(!props.route.params) {
            setItem(null);
        } 
        else {
            setItem(props.route.params.item);
            setBrand(props.route.params.item.brand);
            setName(props.route.params.item.name);
            setPrice(props.route.params.item.price.toString());
            setDescription(props.route.params.item.description);
            
            setImage(props.route.params.item.image);
            setCategory(props.route.params.item.category._id);
            setCountInStock(props.route.params.item.countInStock.toString());
        }

        // getting token for auth
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => alert('Error:', error.name))

        // Categories
        axios
            .get(`${baseURL}categories`)
            .then((res) => {setCategories(res.data)
                        //    console(categories)
                        })
            .catch((error) => alert("Error to load categories"));






        return () => {
            setCategories([])
        }
    }, [])

    const getimage = (value) => setImage(value)

    // console.log("hey")
    // console.log(item)
    const addProduct = () => {
        
        if (
            name == "" ||
            brand == "" ||
            price == "" ||
            description == "" ||
            category == "" ||
            countInStock == ""
        ) {
            setError("Dont leave any box empty")
        }

        

        let formData = new FormData();
        console.log(image)
        // console.log(mime.getType(image))

        // const newImageUri = "file:///" + image.split("file:/").join("");
        
        formData.append("image", {
            uri: image,
            type: mime.getType(image),
            name: image.split("/").pop()
        });

        formData.append("name", name);
        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("descr", description);
        formData.append("category", category);
        formData.append("countInStock", countInStock);
        formData.append("richDesc", richDescription);
        formData.append("rating", rating);
        formData.append("numReviews", numReviews);
        formData.append("isFeatured", isFeatured);

        // configuring header to correctl pass form data
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }
         
       
        if (item !== null) {
            axios
                .put(`${baseURL}products/${item._id}`, formData, config)
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Product successfuly updated",
                            text2: ""
                        });
                        setTimeout(() => {
                            props.navigation.navigate("Products");
                        }, 500)
                    }
                })
                .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: `Error:${error.name}`
                    })
                })
        } 
        else {
            axios
                .post(`${baseURL}products`, formData, config)
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "New Product added",
                            text2: ""
                        });
                        setTimeout(() => {
                            props.navigation.navigate("Products");
                        }, 500)
                    }
                })
                .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: `${error}`
                    })
                })
        } 
    }

    return (
        <ScrollView>
            <FormContainer title="Add Product">
                <View style={styles.imageContainer}>

                    <ImagePicker1 defaultimg={image}
                    img={(value) => getimage(value)} />

                </View>


                <View style={styles.label}>
                    <Text style={{ textDecorationLine: "underline" }}>Brand</Text>
                </View>
                <Input
                    placeholder="Brand"
                    name="brand"
                    id="brand"
                    value={brand}
                    onChangeText={(text) => setBrand(text)}
                />

                <View style={styles.label}>
                    <Text style={{ textDecorationLine: "underline" }}>Name</Text>
                </View>
                <Input
                    placeholder="Name"
                    name="name"
                    id="name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <View style={styles.label}>
                    <Text style={{ textDecorationLine: "underline" }}>Price</Text>
                </View>
                <Input
                    placeholder="Price"
                    name="price"
                    id="price"
                    value={price}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPrice(text)}
                />
                <View style={styles.label}>
                    <Text style={{ textDecorationLine: "underline" }}>Count in Stock</Text>
                </View>
                <Input
                    placeholder="Stock"
                    name="stock"
                    id="stock"
                    value={countInStock}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setCountInStock(text)}
                />
                <View style={styles.label}>
                    <Text style={{ textDecorationLine: "underline" }}>Description</Text>
                </View>
                <Input
                    placeholder="Description"
                    name="description"
                    id="description"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                />
               <Item picker>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Select your Category"
                    selectedValue={pickerValue}
                    placeholderStyle={{ color: "#007aff"}}
                    placeholderIconColor="#007aff"
                    onValueChange={(e) => {setPickerValue(e); setCategory(e)}}
                >
                    {categories.map((c) => {
                        return <Picker.Item key={c._id} label={c.name} value={c._id} />
                    })}
                </Picker>
           </Item>

                {err ? <Error message={err} /> : null}
                <View style={styles.buttonContainer}>
                    <EasyButton
                        large
                        primary
                        onPress={() => addProduct()}
                    >
                        <Text style={styles.buttonText}>Confirm</Text>
                    </EasyButton>
                </View>
            </FormContainer>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    label: {
        width: "80%",
        marginTop: 10
    },
    buttonContainer: {
        width: "80%",
        marginBottom: 80,
        marginTop: 20,
        alignItems: "center"
    },
    buttonText: {
        color: "white"
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10
    }

})

export default ProductForm;