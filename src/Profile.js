/* eslint-disable react/self-closing-comp */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { Text, View, StatusBar, TouchableOpacity } from "react-native"
import React, { useContext } from "react"
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from "./context/AuthContext";

export default function Profile({ navigation }) {
  const { logOut } = useContext(AuthContext)
  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <View style={{ backgroundColor: "#3498DB", height: 200, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#3498DB" translucent={true} />
        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 70 }}>
          <View style={{ flexDirection: "row", width: "90%" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={25} style={{ color: "#fff" }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontFamily: "Poppins-SemiBold", color: "#fff", marginLeft: 10 }}>Profile</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 20 }}>
        <Text style={{ fontFamily: "Poppins-SemiBold", color: "#000" }}>Warehouse Name :</Text>
        <Text style={{ fontFamily: "Poppins-Light", color: "#000", marginLeft: 5 }}>Text Warehouse</Text>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 2 }}>
        <Text style={{ fontFamily: "Poppins-SemiBold", color: "#000" }}>Warehouse Email :</Text>
        <Text style={{ fontFamily: "Poppins-Light", color: "#000", marginLeft: 5 }}>warehouse@gamil.com</Text>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 2 }}>
        <Text style={{ fontFamily: "Poppins-SemiBold", color: "#000" }}>Warehouse Contact :</Text>
        <Text style={{ fontFamily: "Poppins-Light", color: "#000", marginLeft: 5 }}>865443554656</Text>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 2 }}>
        <Text style={{ fontFamily: "Poppins-SemiBold", color: "#000" }}>Contact Person Name :</Text>
        <Text style={{ fontFamily: "Poppins-Light", color: "#000", marginLeft: 5 }}> Text</Text>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 2 }}>
        <Text style={{ fontFamily: "Poppins-SemiBold", color: "#000" }}>Contact Person Email :</Text>
        <Text style={{ fontFamily: "Poppins-Light", color: "#000", marginLeft: 5 }}> Text@gmail.com</Text>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 2 }}>
        <Text style={{ fontFamily: "Poppins-SemiBold", color: "#000" }}>Contact Person Phone :</Text>
        <Text style={{ fontFamily: "Poppins-Light", color: "#000", marginLeft: 5 }}> 74545457</Text>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 2 }}>
        <Text style={{ fontFamily: "Poppins-SemiBold", color: "#000" }}>Address :</Text>
        <Text style={{ fontFamily: "Poppins-Light", color: "#000", marginLeft: 5 }}> xyz</Text>
      </View>
      <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={() => {logOut()}}>
          <View style={{ width: 120, justifyContent: "center", alignItems: "center", backgroundColor: "#E74C3C", height: 40, marginTop: 20, borderRadius: 10 }}>
            <Text style={{ fontFamily: "Poppins-SemiBold", color: "#fff" }}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ position: "absolute", bottom: 0 }}>
        <View style={{ width: "100%" }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
          </View>
        </View>
      </View>
    </View>
  )

}

