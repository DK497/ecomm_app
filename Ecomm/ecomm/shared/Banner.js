import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import Swiper from 'react-native-swiper/src'

var { width } = Dimensions.get('window')


const Banner = () => {

    const [banner, setbanner] = useState([])

    useEffect(() => {
        setbanner([
            "https://media.comicbook.com/2020/06/dragon-ball-new-anime-series-multiverse-universes-1223414.jpeg?auto=webp&width=1200&height=628&crop=1200:628,smart",
            "https://gintalifelessons.files.wordpress.com/2014/10/fgae1.jpg",
            "https://www.tierragamer.com/wp-content/uploads/2020/04/Naruto-Bitme-Regreso-450x300.jpg",
        ])
        return () => {
            setbanner([]);
        }

    }, [])


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.swiper}>
                    <Swiper style={{ height: width / 2 }}
                        showButtons={false} autoplay={true}
                        autoplayTimeout={2}>
                        {banner.map((item) => {
                            return (
                                <Image
                                    key={item}
                                    style={styles.imageBanner}
                                    resizeMode="contain"
                                    source={{ uri: item }}
                                />
                            );
                        })}

                    </Swiper>
                    <View style={{ height: 20 }}></View>
                </View>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gainsboro",
    },
    swiper: {
        width: width,
        alignItems: "center",
        marginTop: 10,
    },
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20,
    },
});

export default Banner
