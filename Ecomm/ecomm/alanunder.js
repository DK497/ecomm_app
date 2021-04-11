import React, {Component} from 'react';
import {
  Button,
  TextInput,
  View,
  Text,

  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Switch,
} from 'react-native';
import {NativeEventEmitter, NativeModules} from 'react-native';

import {AlanView} from './AlanSDK.js';

const {AlanManager, AlanEventEmitter} = NativeModules;
const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

const screenWidth = Dimensions.get('window').width;
const textWidth = screenWidth - 40;

const createAlert = (text) =>
  Alert.alert(
    text,
    text,
    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    {cancelable: false},
  );

const subscription = alanEventEmitter.addListener('command', (data) => {
  console.log(`got command event ${JSON.stringify(data)}`);
  // {"command":"showAlert","text":"text"}
  createAlert(data.text);
});

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      helloValue: '(test text | hello | test tools)',
      commandValue: 'test command',
      apiValue: 'test project api',
      visualValue: 'test visual state',
      sendCommandValue: 'test send command',
      authDataValue: 'test auth data',
      authData: false,
      isProd: false,
    };
  }

  componentWillUnmount() {
    subscription.remove();
  }

  renderAlanButton() {
    if (this.state.isProd && this.state.authData) {
      this.state.authData = false;
      return (
        <AlanView
          projectid={
            'cc2b0aa23e5f90d2974f1bf6b6929c1b2e956eca572e1d8b807a3e2338fdd0dc/prod'
          }
          host={'studio.alan.app'}
          authData={{text: this.state.authDataValue}}
        />
      );
    }
    else if (this.state.isProd) {
      return (
        <AlanView
          projectid={
            'cc2b0aa23e5f90d2974f1bf6b6929c1b2e956eca572e1d8b807a3e2338fdd0dc/prod'
          }
          host={'studio.alan.app'}
        />
      );
    }
    else if (this.state.authData) {
      this.state.authData = false;
      return (
        <AlanView
          projectid={
            'de87c36a4c36e67bc1565fc2c68bda912e956eca572e1d8b807a3e2338fdd0dc/prod'
          }
          host={'studio.alan-stage.app'}
          authData={{text: this.state.authDataValue}}
        />
      );
    }
    else {
      return (
        <AlanView
          projectid={
            'de87c36a4c36e67bc1565fc2c68bda912e956eca572e1d8b807a3e2338fdd0dc/prod'
          }
          host={'studio.alan-stage.app'}
        />
      );
    }
  }

  render() {
    console.log(`isProd - ${this.state.isProd}`);
    console.log(`authData - ${this.state.authData}`);
    console.log(`authDataValue - ${this.state.authDataValue}`);
    const alanButton = this.renderAlanButton();

    return (
      <View style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View  />
          <View >
            <View >
              <Text >Stage  </Text>
              <Switch/>
              <Text style={styles.labelStyle}>  Prod</Text>
            </View>
            <Button title="Activate" onPress={() => AlanManager.activate()} />
            <Button
              title="Deactivate"
              onPress={() => AlanManager.deactivate()}
            />
            {/* <Button title="Show" onPress={() => AlanManager.showButton()} /> */}
            {/* <Button title="Hide" onPress={() => AlanManager.hideButton()} /> */}
            <Button
              title="Play text"
              onPress={() => AlanManager.playText(this.state.helloValue)}
            />
            <TextInput
              style={styles.textStyle}
              defaultValue="(test text | hello | test tools)"
              placeholder="(test text | hello | test tools)"
              onChangeText={(text) => this.setState({helloValue: text})}
            />
            <Button
              title="Play command"
              onPress={() =>
                AlanManager.playCommand({
                  command: 'showAlert',
                  text: this.state.commandValue,
                })
              }
            />
            <TextInput
              style={styles.textStyle}
              defaultValue="test command"
              placeholder="test command"
              onChangeText={(text) => this.setState({commandValue: text})}
            />
            <Button
              title="Call project API"
              onPress={() =>
                AlanManager.callProjectApi(
                  'customScript',
                  {text: this.state.apiValue},
                  (error, result) => {
                    if (error) {
                      console.error(error);
                    } else {
                      console.log(result);
                    }
                  },
                )
              }
            />
            <TextInput
              style={styles.textStyle}
              defaultValue="test project api"
              placeholder="test project api"
              onChangeText={(text) => this.setState({apiValue: text})}
            />
            <Button
              title="Set visual state"
              onPress={() =>
                AlanManager.setVisualState({
                  visualState: this.state.visualValue,
                })
              }
            />
            <TextInput
              style={styles.textStyle}
              defaultValue="test visual state"
              placeholder="test visual state"
              onChangeText={(text) => this.setState({visualValue: text})}
            />
            <Button
              title="Check visual state"
              onPress={() =>
                AlanManager.callProjectApi(
                  'checkVisual',
                  {},
                  (error, result) => {
                    if (error) {
                      console.error(error);
                    } else {
                      console.log(result);
                    }
                  },
                )
              }
            />
            <Button
              title="Send command"
              onPress={() =>
                AlanManager.callProjectApi(
                  'sendCommand',
                  {text: this.state.sendCommandValue},
                  (error, result) => {
                    if (error) {
                      console.error(error);
                    } else {
                      console.log(result);
                    }
                  },
                )
              }
            />
            <TextInput
              style={styles.textStyle}
              defaultValue="test send command"
              placeholder="test send command"
              onChangeText={(text) => this.setState({sendCommandValue: text})}
            />
            <Button
              title="Send auth data"
              onPress={() => this.setState({authData: true})}
            />
            <TextInput
              style={styles.textStyle}
              defaultValue="test auth data"
              placeholder="test auth data"
              onChangeText={(text) => this.setState({authDataValue: text})}
            />
            <Button
              title="Check auth state"
              onPress={() =>
                AlanManager.callProjectApi(
                  'checkAuthData',
                  {},
                  (error, result) => {
                    if (error) {
                      console.error(error);
                    } else {
                      console.log(result);
                    }
                  },
                )
              }
            />
            <Button
              title="isActive"
              onPress={() =>
                AlanManager.isActive((error, result) => {
                  if (error) {
                    console.error(error);
                  } else {
                    console.log(result);
                    createAlert(`isActive ${result}`);
                  }
                })
              }
            />
            <View style={styles.dummyViewMedium} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.containerBottom}>{alanButton}</View>
      </View>
    );
  }
}

});