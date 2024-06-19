/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { View, Text, StatusBar, TouchableOpacity, ScrollView, Image, ActivityIndicator,TextInput } from 'react-native'
import React, { useEffect } from 'react'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { Card } from 'react-native-paper';
import addCus from "../assets/Image/addCus.png"
import allCus from "../assets/Image/allCus.png"
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ALL_CUSTOMER } from './Graphql/Query';
import { MUTATION_DELETE_CUSTOMER } from './Graphql/Mutation';
import { useState } from 'react';
import moment from 'moment';


export default function Customer({ navigation }) {

  const { data, loading, refetch } = useQuery(QUERY_ALL_CUSTOMER)

  useEffect(() => {
    setInterval(() => {
      refetch();
    }, 3000);
  }, []);

  const [deleteCustomer, { loading: deleteLoading }] = useMutation(MUTATION_DELETE_CUSTOMER, {
    refetchQueries: [
      QUERY_ALL_CUSTOMER,
      "getAllCustomer"
    ]
  })

  const [customerId, setCustomerId] = useState()

  function handleDelete(id) {
    setCustomerId(id)
    deleteCustomer({
      variables: {
        "customerId": `${id}`
      }

    })
  }

  const[activeFilter,setActiveFilter] =useState("Name")

  const [searchArea, setSearchArea] = useState("")
  const [searchName, setSearchName] = useState("")

  const [searchLocation, setSearchLoaction] = useState("")
  const [searchPhone, setSearchPhone] = useState("")

  const [foundValue, setFoundValue] = useState();

  useEffect(() => {
    if (data) {
      setFoundValue(data.getAllCustomer)
    }
  }, [data]);






 // Filter By Pick Date


 const filterByLocation = (e) => {
   setSearchArea('')
   setSearchName('')
   setSearchLoaction('')
   setSearchPhone('')
 
   const keyword = e;
   if (keyword !== '') {
     const results = data.getAllCustomer.filter((data) => {
       return data.addressOne.toLowerCase().startsWith(keyword.toLowerCase());
     });
     setFoundValue(results);
   }
   else {
     setFoundValue(data.getAllCustomer);
   }
   setSearchLoaction(keyword);
 };

 
 const filterByPhone = (e) => {
  setSearchArea('')
  setSearchName('')
  setSearchLoaction('')
  setSearchPhone('')

  const keyword = e;
  if (keyword !== '') {
    const results = data.getAllCustomer.filter((data) => {
      return data.phoneOne.toLowerCase().startsWith(keyword.toLowerCase());
    });
    setFoundValue(results);
  }
  else {
    setFoundValue(data.getAllCustomer);
  }
  setSearchPhone(keyword);
};

 const filterByName = (e) => {
   setSearchArea('')
   setSearchName('')
   setSearchLoaction('')
   setSearchPhone('')
 
   const keyword = e;
   if (keyword !== '') {
     const results = data.getAllCustomer.filter((data) => {
       return data.fName.toLowerCase().startsWith(keyword.toLowerCase());
     });
     setFoundValue(results);
   }
   else {
     setFoundValue(data.getAllCustomer);
   }
   setSearchName(keyword);
 };

 const filterByArea = (e) => {
   setSearchArea('')
   setSearchName('')
   setSearchLoaction('')
   setSearchPhone('')
   const keyword = e;
   if (keyword !== '') {
     const results = data.getAllCustomer.filter((data) => {
       return data.area.toLowerCase().startsWith(keyword.toLowerCase());
     });
     setFoundValue(results);
   }
   else {
     setFoundValue(data.getAllCustomer);
   }
   setSearchArea(keyword);
 };

 function clearSearch() {
   setFoundValue(data.getAllCustomer)
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
              <Text style={{ fontSize: 18, fontFamily: "Poppins-SemiBold", color: "#fff", marginLeft: 10 }}>Customer</Text>
            </View>
          </View>
        </View>

        {
                     data && data.getAllCustomer.length === 0 ?
                     <></>
                     :
                     <>
                          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                {
                activeFilter ==="Name" ?
                <Card
                style={{
                  width: '90%',
                  height: 50,
                  marginTop: 10,
                  marginBottom: 10,
                  elevation: 5,
                  borderRadius: 10,
                }}>
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '90%'}}>
                    <TextInput
                      placeholder="Name"
                      style={{marginLeft: 10, color: '#000'}}
                      placeholderTextColor="#95A5A6"
                      onChangeText={filterByName}
                      value={searchName}
                    />
                  </View>
                  <Feather
                    name="search"
                    size={20}
                    style={{marginTop: 13, color: '#000'}}
                  />
                </View>
              </Card>

                :

                activeFilter ==="Area" ?
                <Card
                style={{
                  width: '90%',
                  height: 50,
                  marginTop: 10,
                  marginBottom: 10,
                  elevation: 5,
                  borderRadius: 10,
                }}>
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '90%'}}>
                    <TextInput
                      placeholder="Area"
                      style={{marginLeft: 10, color: '#000'}}
                      placeholderTextColor="#95A5A6"
                      onChangeText={filterByArea}
                      value={searchArea}
                    />
                  </View>
                  <Feather
                    name="search"
                    size={20}
                    style={{marginTop: 13, color: '#000'}}
                  />
                </View>
              </Card>


                :

                activeFilter ==="Phone" ?
                <Card
                style={{
                  width: '90%',
                  height: 50,
                  marginTop: 10,
                  marginBottom: 10,
                  elevation: 5,
                  borderRadius: 10,
                }}>
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '90%'}}>
                    <TextInput
                      placeholder="Date"
                      style={{marginLeft: 10, color: '#000'}}
                      placeholderTextColor="#95A5A6"
                      onChangeText={filterByPhone}
                      value={searchPhone}
                    />
                  </View>
                  <Feather
                    name="search"
                    size={20}
                    style={{marginTop: 13, color: '#000'}}
                  />
                </View>
              </Card>
              :

              activeFilter ==="Address" ?
              <Card
              style={{
                width: '90%',
                height: 50,
                marginTop: 10,
                marginBottom: 10,
                elevation: 5,
                borderRadius: 10,
              }}>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <View style={{width: '90%'}}>
                  <TextInput
                    placeholder="Address"
                    style={{marginLeft: 10, color: '#000'}}
                    placeholderTextColor="#95A5A6"
                    onChangeText={filterByLocation}
                    value={searchLocation}
                  />
                </View>
                <Feather
                  name="search"
                  size={20}
                  style={{marginTop: 13, color: '#000'}}
                />
              </View>
            </Card>
            :
            <></>


            }



        </View>
        <View style={{flexDirection:"row"}}>
      <Text style={{marginLeft:10,marginTop:5,fontFamily: 'Poppins-Medium',color:"#3498DB"}}>Filter</Text>
        <ScrollView  horizontal={true}  showsHorizontalScrollIndicator={false}>
       <Card style={{width:100,height:30,marginTop:2,marginLeft:10,marginBottom:2,borderWidth:1,borderColor:activeFilter==="Name"?"#3498DB":"#000",}}>
        <TouchableOpacity onPress={()=>setActiveFilter("Name")}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%",height:"100%"}}>
        <Text style={{color:activeFilter==="Name"?"#3498DB":"#000", fontFamily: 'Poppins-SemiBold',fontSize:12}}>Name</Text>
        </View>
        </TouchableOpacity>
       </Card>
       <Card style={{width:100,height:30,marginTop:2,marginLeft:10,marginBottom:2,borderWidth:1,borderColor:activeFilter==="Area"?"#3498DB":"#000",}}>
       <TouchableOpacity onPress={()=>setActiveFilter("Area")}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%",height:"100%"}}>
        <Text style={{color:activeFilter==="Area"?"#3498DB":"#000", fontFamily: 'Poppins-SemiBold',fontSize:12}}>Area</Text>
        </View>
        </TouchableOpacity>
       </Card>
       <Card style={{width:100,height:30,marginTop:2,marginLeft:10,marginBottom:2,borderWidth:1,borderColor:activeFilter==="Phone"?"#3498DB":"#000"}}>
       <TouchableOpacity  onPress={()=>setActiveFilter("Phone")}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%",height:"100%"}}>
        <Text style={{color:activeFilter==="Phone"?"#3498DB":"#000", fontFamily: 'Poppins-SemiBold',fontSize:12}}>Phone</Text>
        </View>
        </TouchableOpacity>
       </Card>

       <Card style={{width:100,height:30,marginTop:2,marginLeft:10,marginBottom:2,borderWidth:1,borderColor:activeFilter==="Address"?"#3498DB":"#000",}}>
       <TouchableOpacity  onPress={()=>setActiveFilter("Address")}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%",height:"100%"}}>
        <Text style={{color:activeFilter==="Address"?"#3498DB":"#000", fontFamily: 'Poppins-SemiBold',fontSize:12}}>Address</Text>
        </View>
        </TouchableOpacity>
       </Card>
        </ScrollView>


      </View>

                     </>



                }



        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          {
            loading ?
              <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                <ActivityIndicator color="#000" size="large" />
                <Text style={{ color: "#777", fontFamily: "Poppins-Medium", fontSize: 12 }}>Please wait Loading</Text>
              </View>
              :
              <>
                {
                  foundValue && foundValue.slice().reverse().map(item => {
                    return (
                      <Card style={{ width: "95%", height: 130, marginTop: 10, marginBottom: 5, elevation: 3, borderRadius: 15 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", height: "65%" }}>
                          <View style={{ width: "70%", height: "100%", flexDirection: "column" }}>
                            <View style={{ width: "100%", marginTop: 10, marginLeft: 15, flexDirection: "row" }}>
                              <Text style={{ color: "#2980B9", fontFamily: "Poppins-SemiBold", fontSize: 12 }}>Name : </Text>
                              <Text style={{ color: "#34495E", fontFamily: "Poppins-SemiBold", fontSize: 12 }} numberOfLines={1}>{item.fName} {item.lName} </Text>
                            </View>
                            <View style={{ width: "100%", marginTop: 3, marginLeft: 15, flexDirection: "row" }}>
                              <Text style={{ color: "#2980B9", fontFamily: "Poppins-SemiBold", fontSize: 12 }}>Email : </Text>
                              <Text style={{ color: "#34495E", fontFamily: "Poppins-SemiBold", fontSize: 12 }} numberOfLines={1}>{item.email} </Text>
                            </View>

                            <View style={{ width: "100%", marginTop: 3, marginLeft: 15, flexDirection: "row" }}>
                              <Text style={{ color: "#2980B9", fontFamily: "Poppins-SemiBold", fontSize: 12 }}>Phone : </Text>
                              <Text style={{ color: "#34495E", fontFamily: "Poppins-SemiBold", fontSize: 12 }} numberOfLines={1}>{item.phoneOne}</Text>
                            </View>
                          </View>


                 
                         
                        </View>
                        <View style={{width:"100%",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                          <View style={{width:"90%",height:30,justifyContent:"space-between",flexDirection:"row"}}>
                            <View style={{width:"30%"}}>
                            <TouchableOpacity onPress={() => navigation.navigate("EditCustomer", { customer: item })}>
                              <View style={{ width: "100%", backgroundColor: "#1abc9c", height: 28, borderRadius: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <View style={{ width: "100%", height: 28, borderRadius: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                  <Feather name="edit" size={12} color="#fff" />
                                  <Text style={{ marginLeft: 5, fontFamily: "Poppins-SemiBold", marginTop: 5, color: "#fff", fontSize: 11 }}>Edit</Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                            </View>
                            <View style={{width:"30%"}}>
                            {
                              item.id === customerId && deleteLoading ?
                                <View style={{ width: "100%", backgroundColor: "#E74C3C", height: 28,  borderRadius: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                  <ActivityIndicator size="small" color="#fff" />
                                </View>
                                :
                                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                  <View style={{ width: "100%", backgroundColor: "#E74C3C", height: 28,  borderRadius: 50, flexDirection: "row", alignItems: "center", justifyContent: "center",marginBottom:10 }}>
                                    <View style={{ width: "100%", height: 28, borderRadius: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                      <FontAwesome name="trash-o" size={12} color="#fff" style={{marginTop:-2}}/>
                                      <Text style={{ marginLeft: 5, fontFamily: "Poppins-SemiBold", marginTop: 2, color: "#fff", fontSize: 11 }}>Delete</Text>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                            }

                            </View>
                            <View style={{width:"30%"}}>
                            <TouchableOpacity onPress={() => navigation.navigate("AddInvoice", { customerId: item.id })}>
                              <View style={{ width: "100%", backgroundColor: "#3498db", height:28, borderRadius: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <View style={{ width: "100%", height: 28, borderRadius: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                  <FontAwesome5 name="file-invoice" size={12} color="#fff" style={{marginTop:-3}} />
                                  <Text style={{ marginLeft: 5, fontFamily: "Poppins-SemiBold",  color: "#fff", fontSize: 11 }}>Invoice</Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </Card>
                    )
                  })
                }
              </>
          }
        </View>
      </ScrollView>

      <View style={{ position: "absolute", bottom: 0, height: 60, width: "100%" }}>
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity onPress={() => navigation.navigate("AddCustomer")}>
            <View style={{ backgroundColor: "#E74C3C", width: 50, height: 50, marginRight: 10, flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: 50 }} >
              <Feather name="plus" size={25} color="#fff" />
            </View>
          </TouchableOpacity>


        </View>

      </View>
    </View>
  )
}