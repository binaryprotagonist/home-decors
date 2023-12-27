import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import Signup from '../screens/signup';
import StatusBar from '../component/statusBar'
import AddUser from '../screens/addUser';
import Dashboard from '../screens/dashboard';
import Profile from '../screens/profile';
import Loader from '../component/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '..';
const Stack = createNativeStackNavigator();

const Navigator = () => {
    const [myToken, setMyToken] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const { token } = React.useContext(AuthContext);

    React.useEffect(() => {
        checkToken()
    }, [token, myToken])

    const checkToken = () => {
        setLoading(true)
        AsyncStorage.getItem('@TOKEN').then((val) => {
            setMyToken(val)
            // console.log(val, 'tokentoken')
            setLoading(false)
        });
    }

    const MainStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Dashboard'}>
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="AddUser" component={AddUser} />
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
        );
    };
    const AuthStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Login'}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
            </Stack.Navigator>
        );
    };

    return (
        <>
            {loading ? <Loader /> : token || myToken ? <MainStack /> : <AuthStack />}
        </>
    )
}
export default Navigator