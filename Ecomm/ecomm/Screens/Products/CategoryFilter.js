import React from 'react'
import { StyleSheet, TouchableOpacity, ScrollView,View } from 'react-native'
import { ListItem, Badge, Text,Icon } from 'native-base'

const CategoryFilter = (props) => {
    return (
        <ScrollView
            bounces={true} horizontal={true}
            style={{ backgroundColor: "#f2f2f2" }} >
            <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
                
                <TouchableOpacity
                    key={1} onPress={()=>{
                                     props.categfilter('all')
                                     props.setactive(-1)}}> 
                 
                 
                    <Badge
                        style={[styles.center, { margin: 5 },
                        props.active == -1 ? styles.active : styles.inactive
                        ]}>
                        <Text style={{ color: 'white' }}>All</Text>
                    </Badge>
                    
                  
                </TouchableOpacity>
                 {/* for other categories in categ.json */}
                {props.cat.map(i=>(
                    <TouchableOpacity
                    key={i._id} onPress={()=>{
                                     props.categfilter(i._id)
                                     props.setactive(props.cat.indexOf(i))}}> 
                    
                    <Badge
                        style={[styles.center, { margin: 5 },
                        props.active == props.cat.indexOf(i) ? styles.active : styles.inactive
                        ]}>
                        <Text style={{ color: 'white' }}>{i.name}</Text>
                    </Badge>
                </TouchableOpacity>

                ))

                }
            </ListItem>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {
        backgroundColor: '#03bafc'
    },
    inactive: {
        backgroundColor: '#a0e1eb'
    }
})

export default CategoryFilter


