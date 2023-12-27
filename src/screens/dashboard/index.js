import { StyleSheet, Text, Image, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { getAllUsers } from '../../apiManager/users';
import Cards from '../../component/cards';
import MyStatusBar from '../../component/statusBar';
import CustomHeader from '../../component/header';
import images from '../../utils/images';
import Loader from '../../component/loader';
import { Colors } from '../../utils/colors';
const Dashboard = (props) => {
    const [userData, setUserData] = React.useState([])
    const [loader, setLoader] = React.useState(false)
    const [offset, setOffset] = React.useState(1);

    useEffect(() => {
        const onFocus = () => {
            fetchAllUsers()
        };
        const unsubscribe = props.navigation.addListener('focus', onFocus);
        return () => {
            // Clean up the listener when the component is unmounted
            unsubscribe();
        };
    }, [props.navigation]);

    const data = [{ "createdat": "0001-01-01T00:00:00", "email": "Developer12@gmail.com", "id": 11133, "location": "USA", "name": "Developer", "profilepicture": "http://restapi.adequateshop.com/Media//Images/userimageicon.png" }, { "createdat": "0001-01-01T00:00:00", "email": "qweqw@mail.ru", "id": 11134, "location": "USA", "name": "AS", "profilepicture": "http://restapi.adequateshop.com/Media//Images/userimageicon.png" }, { "createdat": "0001-01-01T00:00:00", "email": "van.19v@mail.ru", "id": 11135, "location": "USA", "name": "vano", "profilepicture": "http://restapi.adequateshop.com/Media//Images/userimageicon.png" }, { "createdat": "0001-01-01T00:00:00", "email": "Developer523@gmail.com", "id": 11136, "location": "USA", "name": "Developer123", "profilepicture": "http://restapi.adequateshop.com/Media//Images/userimageicon.png" }, { "createdat": "0001-01-01T00:00:00", "email": "ashot.vardanyan.2000@gmail.com", "id": 11137, "location": "USA", "name": "Ashor", "profilepicture": "http://restapi.adequateshop.com/Media//Images/userimageicon.png" }, { "createdat": "0001-01-01T00:00:00", "email": "ghag@mail.ru", "id": 11138, "location": "USA", "name": "1234", "profilepicture": "http://restapi.adequateshop.com/Media//Images/userimageicon.png" }, { "createdat": "0001-01-01T00:00:00", "email": "asdasd@dasda.asd", "id": 11139, "location": "USA", "name": "asdasd", "profilepicture": "http://restapi.adequateshop.com/Media//Images/userimageicon.png" }, { "createdat": "0001-01-01T00:00:00", "email": "auriu@gmail.com", "id": 11140, "location": "USA", "name": "da", "profilepicture": "http://restapi.adequateshop.com/Media//Images/userimageicon.png" }, { "createdat": "0001-01-01T00:00:00", "email": "qwwerrwerweeqw@mail.ru", "id": 11142, "location": "USA", "name": "asdasd", "profilepicture": "http://restapi.adequateshop.com/Media//Images/userimageicon.png" }, { "createdat": "0001-01-01T00:00:00", "email": "karen@mail.ru", "id": 11143, "location": "USA", "name": "karen", "profilepicture": "http://restapi.adequateshop.com/Media//Images/userimageicon.png" }]
    const fetchAllUsers = () => {
        setLoader(true);
        getAllUsers()
            .then(response => {
                if (response) {
                    setLoader(false);
                    setOffset(offset + 1);
                    //After the response increasing the offset for the next API call.
                    setUserData([...userData, ...response.data]);
                    // setUserData(response.data)
                } else {
                    // console.log(response)
                    setLoader(false);
                }
            })
            .catch(error => {
                setLoader(false);
                // console.log('error========', error);
            });
    };



    const renderFooter = () => {
        return (
            //Footer View with Load More button
            <View style={styles.footer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => fetchAllUsers()}
                    //On Click of button calling getData function to load more data
                    style={styles.loadMoreBtn}>
                    <Text style={styles.btnText}>Load More</Text>
                    {loader ? (
                        <Loader />
                    ) : null}
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {/* <MyStatusBar color={'#fff'} /> */}
            <CustomHeader onNavigate={() => props.navigation.navigate('AddUser')} />
            <FlatList
                data={userData}
                showsVerticalScrollIndicator={false}
                legacyImplementation={false}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={renderFooter}
                renderItem={({ item, index }) => {
                    return (
                        <Cards
                            data={item}
                            key={index}
                            navigationProp={(e, data) =>
                                props.navigation.navigate(e, data)
                            }
                        />
                    );
                }}
            />
            {loader && <Loader />}
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    loadMoreBtn: {
        padding: 10,
        margin: 14,
        marginHorizontal: 24,
        backgroundColor: Colors.theme,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },

})