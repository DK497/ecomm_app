import React, { useEffect } from 'react';
import Header from './shared/Header'
import { NavigationContainer } from "@react-navigation/native";
import Toast from 'react-native-toast-message';

// Redux
import { Provider } from "react-redux";
import store from './redux/store'

// Context Api
import Auth from './Context/store/Auth'

// Navigators
import Mainnav from './navigator/Mainnav';

function App() {
  
   return (
    <Auth>
        <Provider store={store}>
      <NavigationContainer>

        <Header />
        <Mainnav />
        {/* to make Toast available in all components */}
        <Toast ref={(ref) => Toast.setRef(ref)} />

      </NavigationContainer>
    </Provider>

    </Auth>
    



  );
};

export default App;

