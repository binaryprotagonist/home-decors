import { StyleSheet, Text, View } from 'react-native'
import React, { createContext } from "react";
import Navigator from './navigator'
import { NavigationContainer } from '@react-navigation/native';

export const AuthContext = createContext();
const App = () => {
  const [token, setToken] = React.useState('')

  const updateToken = (val) => {
    setToken(val)
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Calling Navigator here */}
      <AuthContext.Provider value={{ token, updateToken }}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </AuthContext.Provider>
    </View >
  )
}

export default App

const styles = StyleSheet.create({})