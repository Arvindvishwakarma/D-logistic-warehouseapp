/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, StatusBar, ScrollView, TouchableOpacity, TextInput, Image, Linking } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { Card } from 'react-native-paper';
import create from "../assets/Image/create.png"
import pending from "../assets/Image/pending.png"
import booking12 from "../assets/Image/way.png"
import delivered from "../assets/Image/delivered.png"
import cancel from "../assets/Image/cancelled.png"
import print from "../assets/Image/print.png"
import warehouse from "../assets/Image/warehouse.png"
import freetown from "../assets/Image/freetown.png"
import delivery from "../assets/Image/delivery.png"
import container from "../assets/Image/container.png"

export default function Booking({ navigation }) {
  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <ScrollView>
        <View style={{ backgroundColor: "#3498DB", height: 200, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
          <StatusBar barStyle="light-content" hidden={false} backgroundColor="#3498DB" translucent={true} />
          <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 70 }}>
            <View style={{ flexDirection: "row", width: "90%" }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={25} style={{ color: "#fff" }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, fontFamily: "Poppins-SemiBold", color: "#fff", marginLeft: 10 }}>Booking</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "95%" }}>
            <View style={{ width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: 10, marginBottom: 5 }}>
              <Card style={{ width: "80%", height: 120, flexDirection: "row", justifyContent: "center", alignItems: "center", elevation: 5, borderRadius: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate("SelectCustomer")}>
                  <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <Image source={create} />
                  </View>
                </TouchableOpacity>
              </Card>
              <Text style={{ marginTop: 10, fontFamily: "Poppins-SemiBold", color: "#000", fontSize: 13 }}> Create Booking</Text>
            </View>
            <View style={{ width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "column", marginRight: 0, marginTop: 10, marginBottom: 5 }}>
              <Card style={{ width: "80%", height: 120, flexDirection: "row", justifyContent: "center", alignItems: "center", elevation: 5, borderRadius: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate("PendingBooking")}>
                  <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <Image source={pending} />
                  </View>
                </TouchableOpacity>
              </Card>
              <Text style={{ marginTop: 10, fontFamily: "Poppins-SemiBold", color: "#000", fontSize: 13 }}>Pending Bookings</Text>
            </View>
          </View>
          {/* <View style={{ flexDirection: "row", justifyContent: "space-between", width: "95%" }}>
            <View style={{ width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: 10, marginBottom: 5 }}>
              <Card style={{ width: "80%", height: 120, flexDirection: "row", justifyContent: "center", alignItems: "center", elevation: 5, borderRadius: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate("Warehouse")}>
                  <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <Image source={warehouse} style={{ width: 80, height: 80 }} />
                  </View>
                </TouchableOpacity>
              </Card>
              <Text style={{ marginTop: 10, fontFamily: "Poppins-SemiBold", color: "#000", fontSize: 13 }}>Warehouse Booking</Text>
            </View>
            <View style={{ width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "column", marginRight: 0, marginTop: 10, marginBottom: 5 }}>
              <Card style={{ width: "80%", height: 120, flexDirection: "row", justifyContent: "center", alignItems: "center", elevation: 5, borderRadius: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate("Freetown")}>
                  <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <Image source={freetown} style={{ width: 80, height: 80 }} />
                  </View>
                </TouchableOpacity>
              </Card>
              <Text style={{ marginTop: 10, fontFamily: "Poppins-SemiBold", color: "#000", fontSize: 13 }}>Freetown Bookings</Text>
            </View>
          </View> */}

          {/* <View style={{ flexDirection: "row", justifyContent: "space-between", width: "95%" }}>
            <View style={{ width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: 10, marginBottom: 5 }}>
              <Card style={{ width: "80%", height: 120, flexDirection: "row", justifyContent: "center", alignItems: "center", elevation: 5, borderRadius: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate("PickUpBooking")}>
                  <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <Image source={delivery} style={{ width: 80, height: 80 }} />
                  </View>
                </TouchableOpacity>
              </Card>
              <Text style={{ marginTop: 10, fontFamily: "Poppins-SemiBold", color: "#000", fontSize: 13 }}>Pickup Booking</Text>
            </View>
            <View style={{ width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "column", marginRight: 0, marginTop: 10, marginBottom: 5 }}>
              <Card style={{ width: "80%", height: 120, flexDirection: "row", justifyContent: "center", alignItems: "center", elevation: 5, borderRadius: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate("Container")}>
                  <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <Image source={container} style={{ width: 80, height: 80 }} />
                  </View>
                </TouchableOpacity>
              </Card>
              <Text style={{ marginTop: 10, fontFamily: "Poppins-SemiBold", color: "#000", fontSize: 13 }}>Container Bookings</Text>
            </View>
          </View> */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "95%" }}>
            <View style={{ width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: 10, marginBottom: 5 }}>
              <Card style={{ width: "80%", height: 120, flexDirection: "row", justifyContent: "center", alignItems: "center", elevation: 5, borderRadius: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate("OnWayBooking")}>
                  <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <Image source={booking12} />
                  </View>
                </TouchableOpacity>
              </Card>
              <Text style={{ marginTop: 10, fontFamily: "Poppins-SemiBold", color: "#000", fontSize: 13 }}>On Way Bookings</Text>
            </View>
            <View style={{ width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "column", marginRight: 0, marginTop: 10, marginBottom: 5 }}>
              <Card style={{ width: "80%", height: 120, flexDirection: "row", justifyContent: "center", alignItems: "center", elevation: 5, borderRadius: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate("Deliverd")}>
                  <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <Image source={delivered} />
                  </View>
                </TouchableOpacity>

              </Card>
              <Text style={{ marginTop: 10, fontFamily: "Poppins-SemiBold", color: "#000", fontSize: 13 }}>Delivered Bookings</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "95%" }}>
            {/* <View style={{ width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: 10, marginBottom: 5 }}>
              <Card style={{ width: "80%", height: 120, flexDirection: "row", justifyContent: "center", alignItems: "center", elevation: 5, borderRadius: 10 }}>
                <TouchableOpacity>
                  <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <Image source={cancel} />
                  </View>
                </TouchableOpacity>
              </Card>
              <Text style={{ marginTop: 10, fontFamily: "Poppins-SemiBold", color: "#000", fontSize: 13 }}>Cancelled Booking</Text>
            </View> */}
            {/* <View style={{ width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "column", marginRight: 0, marginTop: 10, marginBottom: 5 }}>
              <Card style={{ width: "80%", height: 120, flexDirection: "row", justifyContent: "center", alignItems: "center", elevation: 5, borderRadius: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate("AllQRInvoice")}>
                  <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <Image source={print} />
                  </View>
                </TouchableOpacity>
              </Card>
              <Text style={{ marginTop: 10, fontFamily: "Poppins-SemiBold", color: "#000", fontSize: 13 }}>Print QR</Text>
            </View> */}
          </View>

        </View>
      </ScrollView>
    </View>
  )
}