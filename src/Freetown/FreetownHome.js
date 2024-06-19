import { View, Text, StatusBar, ScrollView, Image, TextInput, TouchableOpacity, PermissionsAndroid } from 'react-native'
import React, { useEffect } from 'react'
import profile from "../../assets/Image/Vector.png"
import Feather from 'react-native-vector-icons/Feather';
import { Card } from 'react-native-paper';
import booking from "../../assets/Image/booking.png"
import customer from "../../assets/Image/customer.png"
import invoice from "../../assets/Image/invoice.png"
import money from "../../assets/Image/money.png"
import scan from "../../assets/Image/scan.png"
import setting from "../../assets/Image/setting.png"
import delivered from "../../assets/Image/delivered.png"
import way from "../../assets/Image/way.png"



export default function FreetownHome({ navigation }) {

    let date = new Date()
    console.log("date", date)

    useEffect(() => {
        request_storage_runtime_permission()

    }, [])

    const request_storage_runtime_permission = async () => {
        try {

            const granted1 = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    'title': 'ReactNativeCode Storage Permission',
                    'message': 'ReactNativeCode App needs access to your storage to download Photos.'
                }
            )

            const granted2 = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    'title': 'ReactNativeCode Storage Permission',
                    'message': 'ReactNativeCode App needs access to your storage to download Photos.'
                }
            )
            if (granted1 === PermissionsAndroid.RESULTS.GRANTED) {
                showMessage({
                    message: "Storage Permission Granted.",
                    type: "success",
                })
            }
            else {
                showMessage({
                    message: "Storage Permission Not Granted",
                    type: "danger",
                })
            }

            if (granted2 === PermissionsAndroid.RESULTS.GRANTED) {
                showMessage({
                    message: "Storage Permission Granted.",
                    type: "success",
                })
            }
            else {
                showMessage({
                    message: "Storage Permission Not Granted",
                    type: "danger",
                })
            }
        } catch (err) {
            console.warn(err)
        }
    }



    return (
        <View style={{ height: "100%", backgroundColor: "#fff" }}>
            <ScrollView>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="#3498DB" translucent={true} />
                <View style={{ backgroundColor: "#3498DB", height: 200, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 70 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 20, marginLeft: 20, fontFamily: "Poppins-Bold", color: "#fff" }}>Warehouse</Text>
                            <Text style={{ marginTop: 6, marginLeft: 5, fontFamily: "Poppins-SemiBold", color: "#fff" }}>(Freetown)</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                            <Image source={profile} style={{ marginRight: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                      
                    </View>
                </View>
                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "95%" }}>
                        <View style={{ width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: 10, marginBottom: 5 }}>
                            <Card style={{ width: "80%", height: 120, flexDirection: "row", justifyContent: "center", alignItems: "center", elevation: 5, borderRadius: 10 }}>
                                <TouchableOpacity onPress={() => navigation.navigate("FreetownInvoice")}>
                                    <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                                        <Image source={invoice} />
                                    </View>
                                </TouchableOpacity>
                            </Card>
                            <Text style={{ marginTop: 10, fontFamily: "Poppins-SemiBold", color: "#000" }}>Invoice</Text>
                        </View>
                        <View style={{ width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: 10, marginBottom: 5 }}>
                            <Card style={{ width: "80%", height: 120, flexDirection: "row", justifyContent: "center", alignItems: "center", elevation: 5, borderRadius: 10 }}>
                                <TouchableOpacity onPress={() => navigation.navigate("Qrscan")}>
                                    <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                                        <Image source={scan} />
                                    </View>
                                </TouchableOpacity>
                            </Card>
                            <Text style={{ marginTop: 10, fontFamily: "Poppins-SemiBold", color: "#000" }}>QR Scan</Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "95%" }}>
                        <View style={{ width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: 10, marginBottom: 5 }}>
                            <Card style={{ width: "80%", height: 120, flexDirection: "row", justifyContent: "center", alignItems: "center", elevation: 5, borderRadius: 10 }}>
                                <TouchableOpacity onPress={() => navigation.navigate("OnWayBooking")}>
                                    <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                                        <Image source={way} />
                                    </View>
                                </TouchableOpacity>
                            </Card>
                            <Text style={{ marginTop: 10, fontFamily: "Poppins-SemiBold", color: "#000" }}>On Way</Text>
                        </View>
                        <View style={{ width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: 10, marginBottom: 5 }}>
                            <Card style={{ width: "80%", height: 120, flexDirection: "row", justifyContent: "center", alignItems: "center", elevation: 5, borderRadius: 10 }}>
                                <TouchableOpacity onPress={() => navigation.navigate("Deliverd")}>
                                    <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                                        <Image source={delivered} style={{ width: 80, height: 80 }} />
                                    </View>
                                </TouchableOpacity>
                            </Card>
                            <Text style={{ marginTop: 10, fontFamily: "Poppins-SemiBold", color: "#000" }}>Delievered</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "95%" }}>
                        <View style={{ width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: 10, marginBottom: 5 }}>
                            <Card style={{ width: "80%", height: 120, flexDirection: "row", justifyContent: "center", alignItems: "center", elevation: 5, borderRadius: 10 }}>
                                <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
                                    <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                                        <Image source={money} />
                                    </View>
                                </TouchableOpacity>
                            </Card>
                            <Text style={{ marginTop: 10, fontFamily: "Poppins-SemiBold", color: "#000" }}>Payment</Text>
                        </View>
                       
                    </View>


                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "95%" }}>
                        <View style={{ width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "column", marginRight: 0, marginTop: 10, marginBottom: 5 }}>
                        </View>
                    </View>

                </View>

            </ScrollView>
        </View>
    )
}