import React from 'react';
import Header from './shared/Header'
import { NavigationContainer } from "@react-navigation/native";

// Redux
import { Provider } from "react-redux";
import store from './redux/store'

// Navigators
import Mainnav from './navigator/Mainnav';




export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>

        <Header />
        <Mainnav />


      </NavigationContainer>
    </Provider>



  );
};



