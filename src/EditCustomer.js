/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, StatusBar, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Card, TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker'
import { useMutation, useQuery } from '@apollo/client';
import { MUTATION_EDIT_CUSTOMER } from './Graphql/Mutation';
import { QUERY_ALL_CUSTOMER, GET_AREA } from './Graphql/Query';
import { showMessage } from 'react-native-flash-message';

export default function EditCustomer({ navigation, route }) {

    const { customer } = route.params;
    const { data: areaData, loading: areaLoading } = useQuery(GET_AREA)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(customer && customer.area);
    const [items, setItems] = useState([]);

    useEffect(() => {
        areaData && areaData.getAllArea.map(aData => {
            setItems(items => [...items, { label: aData.areaName, value: aData.areaName }]);
        })
    }, [areaData])

    const [customerId, setCustomerId] = useState(customer && customer.id)
    const [fName, setFName] = useState(customer && customer.fName)
    const [lName, setLName] = useState(customer && customer.lName)
    const [company, setCompany] = useState(customer && customer.company)
    const [email, setEmail] = useState(customer && customer.email)
    const [phone1, setPhone1] = useState(customer && customer.phoneOne)
    const [phone2, setPhone2] = useState(customer && customer.phoneTwo)
    const [address1, setAddress1] = useState(customer && customer.addressOne)
    const [address2, setAddress2] = useState(customer && customer.addresstwo)
    const [postCode, setPostCode] = useState(customer && customer.postCode)
    const [webPage, SetWebPage] = useState(customer && customer.webPage)
    const [notes, setNotes] = useState(customer && customer.notes)
    const [stop, setStop] = useState(false)

    if (customer && stop === false) {
        setFName(customer && customer.fName)
        setLName(customer && customer.lName)
        setCompany(customer && customer.company)
        setEmail(customer && customer.email)
        setPhone1(customer && customer.phoneOne)
        setPhone2(customer && customer.phoneTwo)
        setAddress1(customer && customer.addressOne)
        setAddress2(customer && customer.addresstwo)
        setPostCode(customer && customer.postCode)
        SetWebPage(customer && customer.webPage)
        setNotes(customer && customer.notes)
        setCustomerId(customer && customer.id)
        setStop(true)
    }

    const [editCustomer, { loading }] = useMutation(MUTATION_EDIT_CUSTOMER, {
        refetchQueries: [
            QUERY_ALL_CUSTOMER,
            "getAllCustomer"
        ]
    })


    function handleClick() {
        editCustomer({
            variables: {
                "editCustomerInput": {
                    "addressOne": `${address1}`,
                    "addresstwo": `${address2}`,
                    "area": `${value}`,
                    "company": `${company}`,
                    "customerId": `${customerId}`,
                    "email": `${email}`,
                    "fName": `${fName}`,
                    "lName": `${lName}`,
                    "notes": `${notes}`,
                    "phoneOne": `${phone1}`,
                    "phoneTwo": `${phone2}`,
                    "postCode": `${postCode}`,
                    "webPage": `${webPage}`
                }
            }
        })
        showMessage({
            message: "Customer Edit Successfully",
            type: "success",
        });
        navigation.navigate("Customer")

    }




    return (
        <View style={{ backgroundColor: "#fff", height: "100%" }}>
            <ScrollView>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="#3498DB" translucent={true} />
                <View style={{ backgroundColor: "#3498DB", height: 200, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>

                    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 70 }}>
                        <View style={{ flexDirection: "row", width: "90%" }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Feather name="arrow-left" size={25} style={{ color: "#fff" }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 18, fontFamily: "Poppins-SemiBold", color: "#fff", marginLeft: 10 }}>Edit Customer</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <View style={{ width: "90%", marginTop: 10 }}>
                        <TextInput
                            mode="outlined"
                            label="First Name"
                            placeholder="First Name"
                            onChangeText={(e) => setFName(e)}
                            value={fName}
                        />
                    </View>

                    <View style={{ width: "90%", marginTop: 10 }}>
                        <TextInput
                            mode="outlined"
                            label="Last Name"
                            placeholder="Last Name"
                            style={{ fontFamily: "Poppins-SemiBold" }}
                            onChangeText={(e) => setLName(e)}
                            value={lName}
                        />
                    </View>

                    <View style={{ width: "90%", marginTop: 10 }}>
                        <TextInput
                            mode="outlined"
                            label="Company"
                            placeholder="Company"
                            onChangeText={(e) => setCompany(e)}
                            value={company}
                        />
                    </View>

                    <View style={{ width: "90%", marginTop: 10 }}>
                        <TextInput
                            mode="outlined"
                            label="Email"
                            placeholder="Email"
                            onChangeText={(e) => setEmail(e)}
                            value={email}
                        />
                    </View>

                    <View style={{ width: "90%", marginTop: 10 }}>
                        <TextInput
                            mode="outlined"
                            label="Phone 1"
                            placeholder="Phone 1"
                            keyboardType='numeric'
                            value={phone1}
                            onChangeText={(e) => setPhone1(e)}
                        />
                    </View>

                    <View style={{ width: "90%", marginTop: 10 }}>
                        <TextInput
                            mode="outlined"
                            label="Phone 2"
                            placeholder="Phone 2"
                            keyboardType='numeric'
                            onChangeText={(e) => setPhone2(e)}
                            value={phone2}
                        />
                    </View>

                    <View style={{ width: "90%", marginTop: 10 }}>
                        <TextInput
                            mode="outlined"
                            label="Address 1"
                            placeholder="Address 1"
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(e) => setAddress1(e)}
                            value={address1}

                        />
                    </View>

                    <View style={{ width: "90%", marginTop: 10 }}>
                        <TextInput
                            mode="outlined"
                            label="Address 2"
                            placeholder="Address 2"
                            multiline={true}
                            numberOfLines={4}
                            value={address2}
                            onChangeText={(e) => setAddress2(e)} />
                    </View>

                    <View style={{ width: "90%", marginTop: 10 }}>
                        <TextInput
                            mode="outlined"
                            label="Post Code"
                            placeholder="Post Code"
                            keyboardType='numeric'
                            onChangeText={(e) => setPostCode(e)}
                            value={postCode} />
                    </View>

                    <View style={{ width: "90%", marginTop: 10 }}>
                        <TextInput
                            mode="outlined"
                            label="Web Page"
                            placeholder="Web Page"
                            onChangeText={(e) => SetWebPage(e)}
                            value={webPage} />
                    </View>

                    <View style={{ width: "90%", marginTop: 10 }}>
                        <TextInput
                            mode="outlined"
                            label="Notes"
                            placeholder="Notes"
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(e) => setNotes(e)}
                            value={notes}
                        />
                    </View>


                    <View style={{ width: "90%", marginTop: 10 }}>
                        <Text style={{ marginBottom: 5, fontFamily: "Poppins-SemiBold", color: "#000" }}>Area</Text>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            placeholder="Select Area"
                            listMode="MODAL"
                        />
                    </View>


                    <View style={{ width: "90%", marginTop: 15, flexDirection: "row", alignItems: "center", justifyContent: "center", }}>
                        <View style={{ width: "50%", backgroundColor: "#3498DB", flexDirection: "row", alignItems: "center", justifyContent: "center", height: 50, marginBottom: 10, borderRadius: 10 }}>
                            {
                                loading ?
                                    <ActivityIndicator color="#000" size="large" />
                                    :
                                    areaLoading ?
                                        <ActivityIndicator size="large" color="#000" />
                                        :
                                        <TouchableOpacity onPress={() => handleClick()}>
                                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                                                    <Text style={{ fontSize: 20, color: "#fff", fontFamily: "Poppins-SemiBold" }}>Edit</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                            }

                        </View>
                    </View>


                </View>


            </ScrollView>
        </View>
    )
}