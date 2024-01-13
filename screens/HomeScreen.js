import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import tw from 'twrnc';
import Swiper from 'react-native-deck-swiper';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"
import Storage from '../services/Storage';
import {app, db, auth} from '../services/firebaseConfig';
const HomeScreen = () => {
  const swipeRef = useRef(null);
  const navigation = useNavigation();

  console.log('auth', auth.currentUser)
  const DOG_DATA = [
    {
      Name: "Tommy",
      Breed: "Lebra dog",
      Age: 3,
      photoURL: "https://i.pinimg.com/1200x/4c/19/c0/4c19c04e3ea3664ee0907ef3797dc9a7.jpg"
      , id: 123
      , Location: 'Selangor'
      , Kilometer: 1
    },

    {
      Name: "Pompom",
      Breed: "Pomeranian",
      Age: 2,
      photoURL: "https://i.pinimg.com/originals/c6/81/cc/c681cce04df115bffa37e0f6ff360968.jpg"
      , id: 456
      , Location: 'Seberang Perai'
      , Kilometer: 5
    },

    {
      Name: "Rain",
      Breed: "Huskies",
      Age: 5,
      photoURL: "https://cdn.britannica.com/84/232784-050-1769B477/Siberian-Husky-dog.jpg"
      , id: 789
      , Location: 'Sarawak'
      , Kilometer: 3
    },
  ]

  useEffect(async()=>{
    console.log('user ', await Storage.getData());

  })

  return (
    <View style={tw`flex-1 bg-[#B684EF] pt-12`}>

      <View style={tw` flex-row`}>

        <View >
          <TouchableOpacity onPress={()=> navigation.navigate("Profile")}>
            <Image style={tw`left-4 h-10 w-10 rounded-full`} source={require("../Images/Elon.jpeg")} />
          </TouchableOpacity></View>
        <View style={tw`flex-row mx-12 pt-2`}><Text style={[{ fontSize: 18 }, { fontFamily: "SF-Pro" }, { color: "white" }]}>Hi,</Text><Text style={[{ fontWeight: 600 }, { fontSize: 18 }, { fontFamily: "SF-Pro-Medium" }, { color: "white" }]}> Elon Musk </Text><Text style={{ fontSize: 18 }}>👋</Text></View>
      </View>

      <View style={[styles.anotherButton, tw`top-2`]}>
        <View style={tw`flex-row justify-evenly`}>
          <Entypo name="magnifying-glass" style={tw`pt-1`} size={30} color="#a9a7b4" onPress={() => navigation.navigate("Chat")} />
          <TextInput style={styles.input} placeholder="Search pets" />
          <TouchableOpacity style={tw`elevation-8 items-center justify-center rounded-full w-10 h-10 bg-[#FCA2CF]`}
          onPress={() => swipeRef.current.swipeLeft()}>
          <Entypo name="list" size={24} color="white" />
        </TouchableOpacity>
        </View>
      </View>
      <View style={tw`flex-1`}>

        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={DOG_DATA}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={() => {
            console.log("PASS");
          }}
          onSwipedRight={() => {
            console.log("LIKE");
          }}
          backgroundColor='#4FD0E9'
          overlayLabels={{
            left: {
              title: "PASS",
              style: {
                label: {
                  textAlign: "right",
                  color: "red"
                }
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  color: "#4DED30"
                }
              }
            }
          }}
          renderCard={(card) => (
            <View
              key={card.id}
              style={tw`h-140 w-full bg-white rounded-xl items-end elevation-16 mt-2 bottom-12`}>

              <Image
                style={tw`absolute top-0 h-full w-full rounded-xl`}
                source={{ uri: card.photoURL }} />
              <View style={[tw`mt-84 bg-white items-center justify-center w-full h-30`, styles.cardShadow,
              { backgroundColor: 'rgba(0, 0, 0, 0.3)' }]}>
                <View style={tw`flex-row`}>
                  <Text style={[{ color: "white" }, { fontFamily: "SF-Pro-Medium" }, { fontWeight: 600 }, { fontSize: 32 }, { margin: 5 }, { opacity: 1 }]}>{card.Name}</Text>
                  <Text style={[{ color: "white" }, { fontFamily: "SF-Pro" }, { fontSize: 26 }, { margin: 5 }, { paddingTop: 5 }, { opacity: 1 }]}>{card.Age}</Text>
                  <Text style={[{ color: "white" }, { fontFamily: "SF-Pro" }, { fontSize: 18 }, { paddingTop: 16 }, { opacity: 1 }]}>yrs</Text>
                </View>
                <Text style={[{ color: "white" }, { fontFamily: "SF-Pro" }, { fontSize: 14 }]}>
                  <Entypo name="home" size={14} color="white" /> Lives in {card.Location}</Text>
                <Text style={[{ color: "white" }, { fontFamily: "SF-Pro" }, { fontSize: 14 }]}>
                  <Entypo name="location" size={14} color="white" /> {card.Kilometer} kilometer away</Text>
              </View>

            </View>
          )}
        />
      </View>

      <View style={tw`flex flex-row justify-evenly pb-5`}>
        <TouchableOpacity style={tw`elevation-8 items-center justify-center rounded-full w-16 h-16 bg-[#FCA2CF] border-solid border-b-4 border-r-2`}
          onPress={() => swipeRef.current.swipeLeft()}>
          <Entypo name="cross" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={tw`elevation-8 items-center justify-center rounded-full w-16 h-16 bg-[#B684EF] border-solid border-b-4 border-r-2`}
          onPress={() => navigation.navigate("Chat")}>
          <Entypo name="message" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={tw`elevation-8 items-center justify-center rounded-full w-16 h-16" bg-[#FCA2CF] border-solid border-b-4 border-r-2`}
          onPress={() => swipeRef.current.swipeRight()}>
          <AntDesign name="heart" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={tw`w-full h-15 justify-center items-center bg-white`}>
        <View style={tw`flex-row justify-evenly`}>
          <Entypo style={tw`mx-8`} name="user" size={26} color="#a9a7b4" onPress={() => navigation.navigate("Profile")} />
          <Entypo style={tw`mx-8`} name="message" size={26} color="#a9a7b4" onPress={() => navigation.navigate("Chat")} />
          <Entypo style={tw`mx-8`} name="bell" size={26} color="#a9a7b4" onPress={() => navigation.navigate("Chat")} />
          <Entypo style={tw`mx-8`} name="edit" size={26} color="#a9a7b4" onPress={() => navigation.navigate("Modal")} />
        </View>
      </View>
    </View >
  )
}


const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffSet: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },

  anotherButton: {
    height: 54,
    marginHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    padding:7,
  },

  input: {
    fontSize: 16,
    width: '70%',
    fontFamily: 'PlusJakartaSans-Regular'
  }
})
export default HomeScreen