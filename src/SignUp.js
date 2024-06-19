import { View, Text, Image, TextInput, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import logo from "../assets/Image/mobile.png"
import Feather from 'react-native-vector-icons/Feather';
import { Checkbox, Card } from 'react-native-paper';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_CUSTOMER } from './Graphql/Query';

export default function SignUp({ navigation }) {

  const { loginHandel, userLoading, loginError, username,setUserName,password,setPassword } = useContext(AuthContext);
  const { data } = useQuery(QUERY_ALL_CUSTOMER)

  console.log("data", data)

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <ScrollView>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" translucent={true} />

        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Image source={logo} style={{ width: 250, height: 250, marginTop: 50 }} />
        </View>
        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "700", color: "#34495E", fontFamily: "Poppin-Bold" }}>Warehouse Login</Text>
        </View>
        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 20 }}>

          <Card style={{ width: "80%", marginTop: 5, height: 50, elevation: 5, borderRadius: 10 }}>
            <TextInput placeholder='Username' style={{ marginLeft: 5, color: "#000" }} placeholderTextColor="#95A5A6" onChangeText={(e) => setUserName(e.split(' ').join(''))} value={username} />
          </Card>

          <Card style={{ width: "80%", marginTop: 15, height: 50, elevation: 5, borderRadius: 10 }}>
            <TextInput placeholder='Password' style={{ marginLeft: 5, color: "#000" }} placeholderTextColor="#95A5A6" onChangeText={(e) => setPassword(e.split(' ').join(''))} value={password} />
          </Card>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        </View>
        {
          userLoading ?
            <>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="large" color="#000" />
              </View>
            </>
            :
            <>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <View style={{ width: "40%", backgroundColor: "#3498DB", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 45, marginTop: 30, borderRadius: 10 }}>
                  <TouchableOpacity onPress={() => loginHandel()}>
                    <View style={{ width: "50%", backgroundColor: "#3498DB", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: 50 }}>
                      <Text style={{ color: "#fff", fontFamily: "Poppins-SemiBold" }}>Login</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </>
        }

        {
          loginError ?
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "red", fontSize: 12, fontFamily: "Poppins-SemiBold", marginTop: 20 }}>Username and Password Not Match!!! </Text>
            </View>

            :
            <></>

        }
        {/* <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 12 }}>
          <TouchableOpacity onPress={() => navigation.navigate("FreetownLogin")}>
            <Text style={{ fontFamily: "Poppins-SemiBold", color: "#3498DB" }}>Warehouse (Freetown) Login </Text>
          </TouchableOpacity>
        </View> */}

      </ScrollView>
    </View>
  )
}