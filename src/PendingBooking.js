/* eslint-disable react/self-closing-comp */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, StatusBar, TextInput, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Card } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/client';
import { QUERY_GET_BOOKING_STATUS_PENDING } from './Graphql/Query';
import Moment from 'react-moment';
import found from "../assets/Image/nofound.jpg"
import moment from 'moment';

export default function PendingBooking({ navigation }) {

    useEffect(() => {
        setInterval(() => {
            refetch();
        }, 3000);
    }, []);


    const { data, loading, refetch } = useQuery(QUERY_GET_BOOKING_STATUS_PENDING);

    const [search, setSearch] = useState("");

    const[activeFilter,setActiveFilter] =useState("Booking")

    const [searchArea, setSearchArea] = useState("")
    const [searchBookingId, setSearchBookingId] = useState("")
 
    const [searchLocation, setSearchLoaction] = useState("")
    const [searchPickDate, setSearchPickDate] = useState("")
 
    const [foundValue, setFoundValue] = useState();
 
    useEffect(() => {
      if (data) {
        setFoundValue(data.getBookingStatusPending)
      }
    }, [data]);
 
 
  
 
 
 
   // Filter By Pick Date
   const filterByPickDate = (e) => {
     setSearchArea('')
     setSearchLoaction('')
     setSearchPickDate('')
     setSearchBookingId('')
    
     const keyword = e;
     if (keyword !== '') {
       const results = data.getBookingStatusPending.filter((data) => {
         const dateMom = moment(data.pickUpDate);
         const dateMomFormat = dateMom.format('DD/MM/YYYY')
         console.log("dateMomFormat",dateMomFormat)
         return dateMomFormat.toLowerCase().startsWith(keyword.toLowerCase());
       });
       setFoundValue(results);
     }
     else {
       setFoundValue(data.getBookingStatusPending);
     }
     setSearchPickDate(keyword)
 
   };
 
 
   const filterByLocation = (e) => {
     setSearchArea('')
     setSearchLoaction('')
     setSearchPickDate('')
     setSearchBookingId('')
   
     const keyword = e;
     if (keyword !== '') {
       const results = data.getBookingStatusPending.filter((data) => {
         return data.allocation.toLowerCase().startsWith(keyword.toLowerCase());
       });
       setFoundValue(results);
     }
     else {
       setFoundValue(data.getBookingStatusPending);
     }
     setSearchLoaction(keyword);
   };
 
   const filterByBookingId = (e) => {
     setSearchArea('')
     setSearchLoaction('')
     setSearchPickDate('')
     setSearchBookingId('')
   
     const keyword = e;
     if (keyword !== '') {
       const results = data.getBookingStatusPending.filter((data) => {
         return data.bookingUniqueId.toLowerCase().startsWith(keyword.toLowerCase());
       });
       setFoundValue(results);
     }
     else {
       setFoundValue(data.getBookingStatusPending);
     }
     setSearchBookingId(keyword);
   };
 
   const filterByArea = (e) => {
     setSearchArea('')
     setSearchLoaction('')
     setSearchPickDate('')
     setSearchBookingId('')
     const keyword = e;
     if (keyword !== '') {
       const results = data.getBookingStatusPending.filter((data) => {
         return data.area.toLowerCase().startsWith(keyword.toLowerCase());
       });
       setFoundValue(results);
     }
     else {
       setFoundValue(data.getBookingStatusPending);
     }
     setSearchArea(keyword);
   };
 
   function clearSearch() {
     setFoundValue(data.getBookingStatusPending)
   }
 

 

 
 
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
                            <Text style={{ fontSize: 18, fontFamily: "Poppins-SemiBold", color: "#fff", marginLeft: 10 }}>Pending Booking</Text>
                        </View>
                    </View>
                </View>
                {
                     data && data.getBookingStatusPending.length === 0 ?
                     <></>
                     :
                     <>
                          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                {
                activeFilter ==="Booking" ?
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
                      placeholder="Booking No.."
                      style={{marginLeft: 10, color: '#000'}}
                      placeholderTextColor="#95A5A6"
                      onChangeText={filterByBookingId}
                      value={searchBookingId}
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

                activeFilter ==="Date" ?
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
                      onChangeText={filterByPickDate}
                      value={searchPickDate}
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
       <Card style={{width:100,height:30,marginTop:2,marginLeft:10,marginBottom:2,borderWidth:1,borderColor:activeFilter==="Booking"?"#3498DB":"#000",}}>
        <TouchableOpacity onPress={()=>setActiveFilter("Booking")}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%",height:"100%"}}>
        <Text style={{color:activeFilter==="Booking"?"#3498DB":"#000", fontFamily: 'Poppins-SemiBold',fontSize:12}}>Booking No.</Text>
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
       <Card style={{width:100,height:30,marginTop:2,marginLeft:10,marginBottom:2,borderWidth:1,borderColor:activeFilter==="Date"?"#3498DB":"#000"}}>
       <TouchableOpacity  onPress={()=>setActiveFilter("Date")}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%",height:"100%"}}>
        <Text style={{color:activeFilter==="Date"?"#3498DB":"#000", fontFamily: 'Poppins-SemiBold',fontSize:12}}>Date</Text>
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

           
                <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

                    {
                        loading ?
                            <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <ActivityIndicator color="#000" size="large" />
                            </View>
                            :
                            data && data.getBookingStatusPending.length === 0 ?
                                <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                    <Image source={found} style={{ width: 200, height: 150 }} />
                                    <Text style={{ color: "#000", fontFamily: "Poppins-SemiBold" }}>No data Available</Text>
                                </View>
                                :

                                <>
                                    {
                                        search === "" ?
                                            <>

                                                {
                                                    data && data.getBookingStatusPending.slice().reverse().map(item => {
                                                        return (
                                                            <Card style={{ width: "90%", marginTop: 10, marginBottom: 10, elevation: 5, borderRadius: 10 }}>
                                                                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", }}>
                                                                    <View style={{ width: "90%", height: "100%" }}>
                                                                        <Text style={{ marginLeft: 10, color: "#34495E", fontSize: 12, marginTop: 7, fontFamily: "Poppins-SemiBold" }}></Text>
                                                                        <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Booking Id : </Text>
                                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.bookingUniqueId}</Text>
                                                                        </View>
                                                                        <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Pickup Date : </Text>
                                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }}><Moment element={Text} format="DD-MM-YYYY">{item.pickUpDate}</Moment> </Text>
                                                                        </View>
                                                                        <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Pickup Time : </Text>
                                                                            {
                                                                                item.pickUpTime.split("").length < 8?
                                                                                <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.pickUpTime}</Text>
                                                                                :
                                                                                <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }}><Moment element={Text} format="hh:mm A">{item.pickUpTime}</Moment></Text>
                                                                            }
                                                                           
                                                                        </View>
                                                                        <View style={{ flexDirection: "row", marginLeft: 10, width: "70%" }}>
                                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Pickup Address : </Text>
                                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.allocation}</Text>
                                                                        </View>

                                                                        <View style={{ flexDirection: "row", marginLeft: 10, width: "90%", marginBottom: 5 }}>
                                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Notes : </Text>
                                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.notes}</Text>
                                                                        </View>
                                                                    </View>
                                                                    {/* <View style={{width:"50%"}}>
                        <Text style={{marginLeft:10,color:"#34495E",fontSize:12,marginTop:7,fontFamily:"Poppins-SemiBold"}}>06 Jul 2023, 10:50AM</Text>
                        <Text style={{fontSize:11,marginLeft:10,fontFamily:"Poppins-SemiBold",color:"#2ECC71"}}>Complete</Text>
                        <Text style={{marginLeft:10,color:"#34495E",fontSize:8,marginTop:0,fontFamily:"Poppins-Medium"}}>06 Jul 2023, 10:50AM</Text>
                        <View style={{flexDirection:"column",width:"60%",justifyContent:"center",alignItems:"center",backgroundColor:"#1ABC9C",marginLeft:10,height:25,borderRadius:50,marginTop:1}}>
                           <Text style={{color:"#fff",fontSize:12}}>View Detail</Text>
                            </View>
                        </View> */}
                                                                </View>

                                                                {
                                                                    item.collectionBoyId === null ?
                                                                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

                                                                            <View style={{ width: "95%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#3498DB", height: 40, marginBottom: 10, borderRadius: 10 }}>
                                                                                <TouchableOpacity onPress={() => navigation.navigate("AddCollectionBoy", { bookingId: item.id })}>
                                                                                    <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", height: 40, marginBottom: 10, borderRadius: 10 }}>
                                                                                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", }}>
                                                                                            <Text style={{ color: "#fff", fontFamily: "Poppins-SemiBold", marginTop: 10, fontSize: 12 }}>Add Collection Boy</Text>
                                                                                        </View>
                                                                                    </View>
                                                                                </TouchableOpacity>
                                                                            </View>

                                                                        </View>
                                                                        :
                                                                        <>
                                                                            <View style={{ width: "90%", marginBottom: 10 }}>
                                                                                <View style={{ flexDirection: "row", marginLeft: 10, width: "90%", }}>
                                                                                    <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Collection Boy Id : </Text>
                                                                                    <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.collectionBoyuniqueId}</Text>
                                                                                </View>
                                                                                <View style={{ flexDirection: "row", marginLeft: 10, width: "90%", }}>
                                                                                    <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Collection Name : </Text>
                                                                                    <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.collectionName}</Text>
                                                                                </View>

                                                                            </View>
                                                                        </>
                                                                }

                                                            </Card>
                                                        )
                                                    })
                                                }
                                            </>

                                            :
                                            <>

                                                {
                                                    data && data.getBookingStatusPending.filter(obj => obj.bookingUniqueId.includes(search)).slice().reverse().map(item => {
                                                        return (
                                                            <Card style={{ width: "90%", marginTop: 10, marginBottom: 10, elevation: 5, borderRadius: 10, marginBottom: 10 }}>
                                                                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", }}>
                                                                    <View style={{ width: "90%", height: "100%" }}>
                                                                        <View style={{flexDirection:"row"}}>
                                                                        <Text style={{ marginLeft: 10,color: "#2980B9", fontSize: 12, marginTop: 7, fontFamily: "Poppins-SemiBold" }}>Booking Id :</Text>
                                                                        <Text style={{ marginLeft: 10, color: "#34495E", fontSize: 12, marginTop: 7, fontFamily: "Poppins-SemiBold" }}>{item.bookingUniqueId}</Text>
                                                                        </View>
                                                                    
                                                                        <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Pickup Date : </Text>
                                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }}><Moment element={Text} format='DD-MM-YYYY'>{item.pickUpDate}</Moment> </Text>
                                                                        </View>
                                                                        <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Pickup Time : </Text>
                                                                            {
                                                                                item.pickUpTime.split("").length < 8?
                                                                                <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.pickUpTime}</Text>
                                                                                :
                                                                                <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }}><Moment element={Text} format="hh:mm A">{item.pickUpTime}</Moment></Text>
                                                                            }
                                                                           
                                                                        </View>
                                                                        <View style={{ flexDirection: "row", marginLeft: 10, width: "70%" }}>
                                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Pickup Address : </Text>
                                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.allocation}</Text>
                                                                        </View>

                                                                        <View style={{ flexDirection: "row", marginLeft: 10, width: "90%", marginBottom: 5 }}>
                                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Notes : </Text>
                                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.notes}</Text>
                                                                        </View>
                                                                    </View>
                                                                    {/* <View style={{width:"50%"}}>
                        <Text style={{marginLeft:10,color:"#34495E",fontSize:12,marginTop:7,fontFamily:"Poppins-SemiBold"}}>06 Jul 2023, 10:50AM</Text>
                        <Text style={{fontSize:11,marginLeft:10,fontFamily:"Poppins-SemiBold",color:"#2ECC71"}}>Complete</Text>
                        <Text style={{marginLeft:10,color:"#34495E",fontSize:8,marginTop:0,fontFamily:"Poppins-Medium"}}>06 Jul 2023, 10:50AM</Text>
                        <View style={{flexDirection:"column",width:"60%",justifyContent:"center",alignItems:"center",backgroundColor:"#1ABC9C",marginLeft:10,height:25,borderRadius:50,marginTop:1}}>
                           <Text style={{color:"#fff",fontSize:12}}>View Detail</Text>
                            </View>
                        </View> */}
                                                                </View>

                                                                {
                                                                    item.collectionBoyId === null ?
                                                                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

                                                                            <View style={{ width: "95%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#3498DB", height: 40, marginBottom: 10, borderRadius: 10 }}>
                                                                                <TouchableOpacity onPress={() => navigation.navigate("AddCollectionBoy", { bookingId: item.id })}>
                                                                                    <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", height: 40, marginBottom: 10, borderRadius: 10 }}>
                                                                                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", }}>
                                                                                            <Text style={{ color: "#fff", fontFamily: "Poppins-SemiBold", marginTop: 10, fontSize: 12 }}>Add Collection Boy</Text>
                                                                                        </View>
                                                                                    </View>
                                                                                </TouchableOpacity>
                                                                            </View>

                                                                        </View>
                                                                        :
                                                                        <>
                                                                            <View style={{ width: "90%", marginBottom: 10 }}>
                                                                                <View style={{ flexDirection: "row", marginLeft: 10, width: "90%", }}>
                                                                                    <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Collection Boy Id : </Text>
                                                                                    <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.collectionBoyuniqueId}</Text>
                                                                                </View>
                                                                                <View style={{ flexDirection: "row", marginLeft: 10, width: "90%", }}>
                                                                                    <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Collection Name : </Text>
                                                                                    <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.collectionName}</Text>
                                                                                </View>

                                                                            </View>
                                                                        </>
                                                                }

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