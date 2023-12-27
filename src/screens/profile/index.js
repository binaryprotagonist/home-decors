import { StyleSheet, Text, Dimensions, TouchableOpacity, Image, View, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { fetchImages, getUserById } from '../../apiManager/users';
import Cards from '../../component/cards';
import MyStatusBar from '../../component/statusBar';
import CustomHeader from '../../component/header1';
import images from '../../utils/images';
import { Colors } from '../../utils/colors';
import Loader from '../../component/loader'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../..';

const Height = Dimensions.get('window').height;

const Profile = (props) => {
    const [userData, setUserData] = useState({})
    const [loader, setLoader] = useState(false)
    const { updateToken } = useContext(AuthContext);
    const [imageData, setImageData] = useState([])

    const [totalPages, setTotalpages] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    let id = props.route.params
    let item = userData

    useEffect(() => {
        const onFocus = () => {
            fetchUser()
            getImages()
        };
        const unsubscribe = props.navigation.addListener('focus', onFocus);
        return () => {
            // Clean up the listener when the component is unmounted
            unsubscribe();
        };
    }, [props.navigation]);
    useEffect(() => {
        getImages()
    }, [currentPage]);

    const fetchUser = () => {
        setLoader(true);
        getUserById(id)
            .then(response => {
                if (response) {
                    setLoader(false);
                    setUserData(response)
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
    const getImages = () => {
        setLoader(true);
        fetchImages(currentPage, itemsPerPage)
            .then(response => {
                if (response.photos) {
                    setLoader(false);
                    setTotalpages(3);
                    setImageData(response.photos)
                } else {
                    setLoader(false);
                }
            })
            .catch(error => {
                setLoader(false);
                // console.log('error========', error);
            });
    };
    const numberOfCols = 3

    const handlePageClick = (p) => setCurrentPage(p);

    const logout = () => {
        AsyncStorage.removeItem('@TOKEN');
        updateToken(null)
        global.Token = '';
    }

    const renderPaginationButtons = () => {
        const maxButtonsToShow = 3;
        let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);
        if (endPage - startPage + 1 < maxButtonsToShow) {
            startPage = Math.max(0, endPage - maxButtonsToShow + 1);
        }
        const buttons = [];
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => handlePageClick(i)}
                    style={[
                        styles.paginationButton,
                        i === currentPage ? styles.activeButton : null,
                    ]}>
                    <Text style={{ color: 'white' }}>{i}</Text>
                </TouchableOpacity>,
            );
        }
        return buttons;
    };

    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                {/* <MyStatusBar color={'#fff'} /> */}
                <CustomHeader onNavigate={() => props.navigation.goBack()} onLogoutPress={() => logout()} />
                <View style={[styles.container, {}]}>
                    <View style={[styles.cardContainer, {}]}>
                        <View style={styles.imageContainer}>
                            <Image
                                resizeMode='cover'
                                source={images.im_wall}
                                style={styles.imageStyle}
                            />
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.bold_18_black}>{item?.name}</Text>
                            <Text style={styles.regular_14_black}>{item?.email}</Text>
                            <Text style={styles.light_16_black}>{item?.location}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%' }}>
                        <FlatList
                            data={imageData}
                            keyExtractor={(item, index) => index}
                            numColumns={numberOfCols}
                            windowSize={10} // adds functionality of VirtualizedList
                            renderItem={({ item, index }) => (
                                // console.log(item,)
                                <View style={[styles.gridView, { margin: 12, }]}>
                                    <Image style={styles.image} source={{ uri: item.url }} />
                                </View>
                            )}
                        />
                        <View style={styles.paginationContainer}>
                            {renderPaginationButtons()}
                        </View>
                    </View>
                    {loader && <Loader />}
                </View >
            </View >
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 10,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 15,
    },
    cardContainer: {
        height: Height / 2,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 15
    },
    imageContainer: {
        height: '50%',
    },
    detailsContainer: {
        margin: 14,
        alignContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        height: '40%',
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bold_18_white: {
        fontSize: 24,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 0 },
        textShadowRadius: 10,
        color: Colors.white
    },
    regular_16_white: {
        fontSize: 16,
        fontWeight: 'normal',
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 0 },
        textShadowRadius: 6,
        color: Colors.white
    },
    semibold_18_black: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black
    },
    semibold_14_black: {
        fontSize: 14,
        color: Colors.black,
        fontWeight: '600',
    },
    semibold_16_black: {
        fontSize: 14,
        color: Colors.black
    },
    bold_18_black: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#616163'
    },
    regular_14_black: {
        fontSize: 14,
        color: '#616163',
        fontWeight: '600',
    },
    light_16_black: {
        fontSize: 14,
        fontWeight: '400',
        color: '#616163',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: 'transparent',
    },
    paginationButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 4,
        backgroundColor: '#ddd',
    },
    activeButton: {
        backgroundColor: Colors.theme,
        width: 40,
        height: 40,
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
    },

})