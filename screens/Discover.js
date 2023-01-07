import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native'
import { Avatar, Hotels, Attractions, Restaurants, NotFound } from '../assets'
import MenuContainer from '../components/MenuContainer';
import { FontAwesome } from '@expo/vector-icons';
import ItemCardContainer from '../components/ItemCardContainer';
import { getPlacesData } from '../api';

const Discover = () => {

    const navigation = useNavigation()

    const [type, setType] = useState("restaurants")
    const [isLoading, setIsLoading] = useState(false)
    const [mainData, setMainData] = useState([])
    const [bl_lat, setbl_lat] = useState(null)
    const [bl_lng, setbl_lng] = useState(null)
    const [tr_lat, settr_lat] = useState(null)
    const [tr_lng, settr_lng] = useState(null)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []) // hides tab header

    useEffect(() => {
        setIsLoading(true)
        getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then(data => {
            setMainData(data)
            setInterval(() => {
                setIsLoading(false)
            }, 2000)
        })
    }, [bl_lat, bl_lng, tr_lat, tr_lng, type])

    return (
        <SafeAreaView className="flex-1 bg-white mt-10 relative">
            <View className="flex-row items-center justify-between px-6">
                <View>
                    <Text className="text-[40px] text-[#0B6463] font-bold">Discover</Text>
                    <Text className="text-[#527283] text-[36px]">the world today</Text>
                </View>

                <View className="w-10 h-10 bg-gray-400 rounded-md items-center justify-center shadow-lg">
                    <Image
                        source={Avatar}
                        className="w-full h-full rounded-md object-cover"
                    />
                </View>
            </View>

            <View className="flex-row items-center bg-gray-100 mx-4 rounded-xl p-1 mt-6 shadow-xl ">
                <GooglePlacesAutocomplete
                    GooglePlacesDetailsQuery={{ fields: "geometry" }}
                    placeholder='Search'
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(details?.geometry?.viewport)
                        setbl_lat(details?.geometry?.viewport?.southwest?.lat)
                        setbl_lng(details?.geometry?.viewport?.southwest?.lng)
                        settr_lat(details?.geometry?.viewport?.northeast?.lat)
                        settr_lng(details?.geometry?.viewport?.northeast?.lng)
                    }}
                    query={{
                        key: '',
                        language: 'en',
                    }}
                />
            </View>

            {/* Menu Container */}

            {isLoading ?
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#0B646B" />
                </View> :
                <ScrollView>
                    <View className="flex-row items-center justify-between px-8 mt-6">
                        <MenuContainer
                            key={"hotel"}
                            title="Hotels"
                            imageSrc={Hotels}
                            type={type}
                            setType={setType}
                        />
                        <MenuContainer
                            key={"attractions"}
                            title="Attractions"
                            imageSrc={Attractions}
                            type={type}
                            setType={setType}
                        />
                        <MenuContainer
                            key={"restaurants"}
                            title="Restaurants"
                            imageSrc={Restaurants}
                            type={type}
                            setType={setType}
                        />
                    </View>

                    <View>
                        <View className="flex-row items-center justify-between px-8 mt-6">
                            <Text className="text-[#2C7379] text-[26px] font-bold">
                                Top Tips
                            </Text>
                            <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                                <Text className="text-[#A0C4C7] text-[20px] font-bold">
                                    Explore
                                </Text>
                                <FontAwesome name="long-arrow-right" size={24} color="#A0C4C7" />
                            </TouchableOpacity>
                        </View>

                        <View className="px-4 mt-6 flex-row items-center justify-evenly flex-wrap">
                            {mainData?.length > 0 ? (
                                <>
                                    {mainData?.map((data, i) => (
                                        <ItemCardContainer
                                            key={i}
                                            imageSrc={
                                                data?.photo?.images?.medium?.url ?
                                                    data?.photo?.images?.medium?.url :
                                                    "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
                                            }
                                            title={data?.name}
                                            location={data?.location_string}
                                            data={data}
                                        />
                                    ))}
                                </>
                            ) : (
                                <>
                                    <View className="w-full h-[250px] items-center space-y-8 justify-center">
                                        <Image
                                            source={NotFound}
                                            className="w-32 h-32 object-cover"
                                        />
                                        <Text className="text-2xl text-[#428288] font-semibold">
                                            Oops... No data found
                                        </Text>
                                    </View>
                                </>
                            )}
                        </View>
                    </View>

                </ScrollView>
            }
        </SafeAreaView>
    )
}

export default Discover