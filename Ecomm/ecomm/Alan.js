import React,{useEffect,useState} from 'react'
import {AlanView } from './node_modules/@alan-ai/alan-sdk-react-native/AlanSDK';
// import {AlanView} from './AlanSDK.js';

import { NativeEventEmitter, NativeModules } from 'react-native';
import { StyleSheet,Alert} from 'react-native'

const { AlanManager, AlanEventEmitter } = NativeModules;
const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

// Redux
import { connect } from "react-redux";//to have access to states in store a props
import * as actions from "./redux/Actions/cartActions";

const mapStateToProps = (state) => {
    const { cartItems } = state
    console.log('CArt:',state)

    return {
        cartItems: cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearItems: () => dispatch(actions.clearCart()),

        clearSingle: (i) => dispatch(actions.removeFromCart(i)),
        

    }

}



const createAlert = (text) =>
  Alert.alert(
    'Welcome',
    text,
    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    {cancelable: false},
  );



const Alan = (props) => {
    const [Instance, setInstance] = useState()

    const subscription = alanEventEmitter.addListener('command', (data) => {

        if(data.command==='sleep'){
            AlanManager.playText("Going to sleep");

            setTimeout(() => {
                AlanManager.deactivate()
              }, 3000);
            
        }
    
        if(data.command==='clear'){
           props.clearItems();

           setTimeout(() => {
            AlanManager.deactivate()
          }, 3000);
            
        }

        if(data.command==='remove'){
            // console.log('BRO',data)

            setTimeout(() => {
                AlanManager.deactivate()
              }, 3000);
        
        }
    
        if(data.command==='add'){
            // console.log('BRO',data)

            setTimeout(() => {
                AlanManager.deactivate()
              }, 3000);
        
        }
    
    
        
        
    
    });
   
    AlanManager.isActive((error, result) => {
        if (error) {
            console.error("error");
        } else {
            console.log('Alan result:',result);
        }
    })
   
    console.log(props.cartItems)
    useEffect(
        
    () => {
        
        AlanManager.activate()
        AlanManager.playText("Welcome to App")
        setTimeout(() => {
            AlanManager.deactivate()
          }, 3000);
        
        // AlanManager.playCommand({
        //     command: 'Alan AI integration'
        //   })
        
       
        
     
        return () => {
            subscription.remove();
            
        }
    }, [])

  

    return(<AlanView  projectid={
      '91170dd2b4ae3d4342b2b008fd1c6f622e956eca572e1d8b807a3e2338fdd0dc/stage'} />)
}

export default connect(mapStateToProps,mapDispatchToProps)(Alan)

const styles = StyleSheet.create({})
