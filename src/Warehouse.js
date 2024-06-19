/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text ,StatusBar, ScrollView, TouchableOpacity, TextInput,ActivityIndicator,Image} from 'react-native'
import React,{useState} from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { Card } from 'react-native-paper';
import { QUERY_GET_ALL_INVOICE_WAREHOUSE_LONDON } from './Graphql/Query';
import { useQuery } from '@apollo/client';
import Moment from 'react-moment';
import found from "../assets/Image/nofound.jpg"

export default function Warehouse({navigation}) {

  const { data, loading } = useQuery(QUERY_GET_ALL_INVOICE_WAREHOUSE_LONDON,{
    pollInterval:1000
  })

  const [search, setSearch] = useState("")
  return (
    <View style={{ height: "100%", backgroundColor: "#fff" }}>
    <ScrollView>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#3498DB" translucent={true} />
        <View style={{ backgroundColor: "#3498DB", height: 200, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>

            <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 70 }}>
                <View style={{ flexDirection: "row", width: "90%" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={25} style={{ color: "#fff" }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontFamily: "Poppins-SemiBold", color: "#fff", marginLeft: 10 }}>Warehouse London </Text>
                </View>
            </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Card style={{ width: "90%", height: 50, marginTop: 10, marginBottom: 10, elevation: 5, borderRadius: 10 }}>
                <View style={{ flexDirection: "row", width: "100%" }}>
                    <View style={{ width: "90%" }}>
                        <TextInput placeholder='Invoice No..' style={{ marginLeft: 10, color: "#000" }} placeholderTextColor="#95A5A6" onChangeText={(e) => setSearch(e)} />
                    </View>
                    <Feather name="search" size={20} style={{ marginTop: 13, color: "#000" }} />
                </View>
            </Card>
        </View>
        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
         {
             loading ?
             <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
             <ActivityIndicator color="#000" size="large" />
          </View>
             :
             data && data.getInvoiceWarehouse.length === 0 ?
             <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
             <Image source={found} style={{width:200,height:150}}/>
            <Text style={{color:"#000",fontFamily:"Poppins-SemiBold"}}>No data Available</Text>
            </View>
              :
             <>
                 {
              search === "" ?
             <>
              {
                  data && data.getInvoiceWarehouse.slice().reverse().map(item => {
                      return (
                          <Card style={{ width: "90%", height: 100, marginTop: 10, marginBottom: 10, elevation: 5, borderRadius: 10 }}>
                              <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                                  <View style={{ width: "50%" }}>
                                      <Text style={{ marginLeft: 10, color: "#34495E", fontSize: 12, marginTop: 7, fontFamily: "Poppins-SemiBold" }}>#{item.invoiceNumber}</Text>
                                      <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                          <Text style={{ fontSize: 9, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Recipient : </Text>
                                          <Text style={{ fontSize: 9, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.recipientName} </Text>
                                      </View>
                                      <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                          <Text style={{ fontSize: 9, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Email : </Text>
                                          <Text style={{ fontSize: 9, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.email} </Text>
                                      </View>
                                      <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                          <Text style={{ fontSize: 9, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Phone : </Text>
                                          <Text style={{ fontSize: 9, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.phoneOne} </Text>
                                      </View>

                                  </View>
                                  <View style={{ width: "50%" }}>
                                      <Text style={{ marginLeft: 10, color: "#34495E", fontSize: 11, marginTop: 7, fontFamily: "Poppins-SemiBold" }}><Moment element={Text} format='DD MMM YYYY'>{item.createdDateTime}</Moment> , <Moment element={Text} format='hh:mm A'>{item.createdDateTime}</Moment> </Text>
                                      <Text style={{ fontSize: 11, marginLeft: 10, fontFamily: "Poppins-SemiBold", color: "#F1C40F" }}>{item.status}</Text>
                                      <Text style={{ marginLeft: 10, color: "#34495E", fontSize: 8, marginTop: 0, fontFamily: "Poppins-Medium" }}><Moment element={Text} format='DD MMM YYYY'>{item.createdDateTime}</Moment> , <Moment element={Text} format='hh:mm A'>{item.createdDateTime}</Moment></Text>
                                      <View style={{ flexDirection: "column", width: "60%", justifyContent: "center", alignItems: "center", backgroundColor: "#1ABC9C", marginLeft: 10, height: 25, borderRadius: 50, marginTop: 1 }}>
                                          <TouchableOpacity onPress={() => navigation.navigate("InvoiceDetail", { data: item })}>
                                              <View style={{ width: "70%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                                  <Text style={{ color: "#fff", fontSize: 12 }}>View Detail</Text>
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
              :
              <>
                {
                  data && data.getInvoiceWarehouse.filter((obj)=>obj.invoiceNumber.includes(search)).slice().reverse().map(item => {
                      return (
                          <Card style={{ width: "90%", height: 100, marginTop: 10, marginBottom: 10, elevation: 5, borderRadius: 10 }}>
                              <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                                  <View style={{ width: "50%" }}>
                                      <Text style={{ marginLeft: 10, color: "#34495E", fontSize: 12, marginTop: 7, fontFamily: "Poppins-SemiBold" }}>#{item.invoiceNumber}</Text>
                                      <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                          <Text style={{ fontSize: 9, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Recipient : </Text>
                                          <Text style={{ fontSize: 9, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.recipientName} </Text>
                                      </View>
                                      <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                          <Text style={{ fontSize: 9, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Email : </Text>
                                          <Text style={{ fontSize: 9, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.email} </Text>
                                      </View>
                                      <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                          <Text style={{ fontSize: 9, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Phone : </Text>
                                          <Text style={{ fontSize: 9, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.phoneOne} </Text>
                                      </View>

                                  </View>
                                  <View style={{ width: "50%" }}>
                                      <Text style={{ marginLeft: 10, color: "#34495E", fontSize: 11, marginTop: 7, fontFamily: "Poppins-SemiBold" }}><Moment element={Text} format='DD MMM YYYY'>{item.createdDateTime}</Moment> , <Moment element={Text} format='hh:mm A'>{item.createdDateTime}</Moment> </Text>
                                      {
                                        item.status === "Warehouse_London" ?
                                      <Text style={{ fontSize: 11, marginLeft: 10, fontFamily: "Poppins-SemiBold", color: "#F1C40F" }}>Warehouse London</Text>
                                      :
                                      <Text style={{ fontSize: 11, marginLeft: 10, fontFamily: "Poppins-SemiBold", color: "#F1C40F" }}>{item.status}</Text>
                                      }
                                      
                                      <Text style={{ marginLeft: 10, color: "#34495E", fontSize: 8, marginTop: 0, fontFamily: "Poppins-Medium" }}><Moment element={Text} format='DD MMM YYYY'>{item.createdDateTime}</Moment> , <Moment element={Text} format='hh:mm A'>{item.createdDateTime}</Moment></Text>
                                      <View style={{ flexDirection: "column", width: "60%", justifyContent: "center", alignItems: "center", backgroundColor: "#1ABC9C", marginLeft: 10, height: 25, borderRadius: 50, marginTop: 1 }}>
                                          <TouchableOpacity onPress={() => navigation.navigate("InvoiceDetail", { data: item })}>
                                              <View style={{ width: "70%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                                  <Text style={{ color: "#fff", fontSize: 12 }}>View Detail</Text>
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
             
             </>



         }


       
        </View>
    </ScrollView>

</View>
  )
}