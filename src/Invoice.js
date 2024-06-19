/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, StatusBar, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from "react"
import Feather from 'react-native-vector-icons/Feather';
import { Card } from 'react-native-paper';
import { useQuery } from '@apollo/client';
import { QUERY_GET_ALL_INVOICE } from './Graphql/Query';
import Moment from 'react-moment';
import moment from 'moment';


export default function Invoice({ navigation }) {

    const { data, refetch,loading } = useQuery(QUERY_GET_ALL_INVOICE);

    useEffect(() => {
        setInterval(() => {
            refetch();
        }, 3000);
    }, []);

    const [search, setSearch] = useState("");

    console.log("data",data)
    
    const[activeFilter,setActiveFilter] =useState("InvoiceNo")

    const [foundValue, setFoundValue] = useState();

    useEffect(() => {
      if (data) {
        setFoundValue(data.getAllInvoice)
      }
    }, [data]);

    const [searchInvoiceNo, setSearchInvoiceNo] = useState("");
    const [searchRecipient, setSearchRecipeint] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [searchArea, setSearchArea] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [searchPhone, setSearchPhone] = useState("");
    
  // Filter By Pick Date
  const filterByDate = (e) => {
    setSearchInvoiceNo("")
    setSearchRecipeint("")
    setSearchDate("")
    setSearchArea("")
    setSearchStatus("")
    setSearchPhone("")
   
    const keyword = e;
    if (keyword !== '') {
      const results = data.getAllInvoice.filter((data) => {
        const dateMom = moment(data.createdDateTime);
        const dateMomFormat = dateMom.format('DD/MM/YYYY')
        console.log("dateMomFormat",dateMomFormat)
        return dateMomFormat.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundValue(results);
    }
    else {
      setFoundValue(data.getAllInvoice);
    }
    setSearchDate(keyword)

  };


  const filterByPhone = (e) => {
    setSearchInvoiceNo("")
    setSearchRecipeint("")
    setSearchDate("")
    setSearchArea("")
    setSearchStatus("")
    setSearchPhone("")
  
    const keyword = e;
    if (keyword !== '') {
      const results = data.getAllInvoice.filter((data) => {
        return data.phoneOne.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundValue(results);
    }
    else {
      setFoundValue(data.getAllInvoice);
    }
    setSearchPhone(keyword);
  };

  const filterByInvoice = (e) => {
    setSearchInvoiceNo("")
    setSearchRecipeint("")
    setSearchDate("")
    setSearchArea("")
    setSearchStatus("")
    setSearchPhone("")
  
    const keyword = e;
    if (keyword !== '') {
      const results = data.getAllInvoice.filter((data) => {
        return data.invoiceNumber.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundValue(results);
    }
    else {
      setFoundValue(data.getAllInvoice);
    }
    setSearchInvoiceNo(keyword);
  };

  const filterByArea = (e) => {
    setSearchInvoiceNo("")
    setSearchRecipeint("")
    setSearchDate("")
    setSearchArea("")
    setSearchStatus("")
    setSearchPhone("")
    const keyword = e;
    if (keyword !== '') {
      const results = data.getAllInvoice.filter((data) => {
        return data.area.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundValue(results);
    }
    else {
      setFoundValue(data.getAllInvoice);
    }
    setSearchArea(keyword);
  };

  const filterByStatus = (e) => {
    setSearchInvoiceNo("")
    setSearchRecipeint("")
    setSearchDate("")
    setSearchArea("")
    setSearchStatus("")
    setSearchPhone("")
    const keyword = e;
    if (keyword !== '') {
      const results = data.getAllInvoice.filter((data) => {
        return data.status.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundValue(results);
    }
    else {
      setFoundValue(data.getAllInvoice);
    }
    setSearchStatus(keyword);
  };

  const filterByRecipient = (e) => {
    setSearchInvoiceNo("")
    setSearchRecipeint("")
    setSearchDate("")
    setSearchArea("")
    setSearchStatus("")
    setSearchPhone("")
    const keyword = e;
    if (keyword !== '') {
      const results = data.getAllInvoice.filter((data) => {
        return data.recipientName.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundValue(results);
    }
    else {
      setFoundValue(data.getAllInvoice);
    }
    setSearchRecipeint(keyword);
  };

  
  function clearSearch() {
    setFoundValue(data.getAllInvoice)
  }
 


    return (
        <View style={{ height: "100%", backgroundColor: "#fff" }}>
            {
            loading ?
            <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",marginTop:150}}>
             <ActivityIndicator color="#000" size="large" />
             <Text style={{fontSize: 15, fontFamily: "Poppins-SemiBold", color: "#fff",}}>Please Wait Loading</Text>
            </View>
            :
            <>
            <ScrollView>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="#3498DB" translucent={true} />
                <View style={{ backgroundColor: "#3498DB", height: 200, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 70 }}>
                        <View style={{ flexDirection: "row", width: "90%", justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Feather name="arrow-left" size={25} style={{ color: "#fff" }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 18, fontFamily: "Poppins-SemiBold", color: "#fff", marginLeft: 10 }}>Invoice </Text>
                        </View>
                    </View>
                </View>
        
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                { 
                        activeFilter === "InvoiceNo" ?
                        <Card style={{ width: "90%", height: 50, marginTop: 10, marginBottom: 10, elevation: 5, borderRadius: 10 }}>
                        <View style={{ flexDirection: "row", width: "100%" }}>
                            <View style={{ width: "90%" }}>
                                <TextInput placeholder='Invoice No..' style={{ marginLeft: 10, color: "#000" }} placeholderTextColor="#95A5A6" onChangeText={filterByInvoice}  value={searchInvoiceNo}/>
                            </View>
                            <Feather name="search" size={20} style={{ marginTop: 13, color: "#000" }} />
                        </View>
                    </Card>
                        :
                        activeFilter === "Recipient" ?
                        <Card style={{ width: "90%", height: 50, marginTop: 10, marginBottom: 10, elevation: 5, borderRadius: 10 }}>
                        <View style={{ flexDirection: "row", width: "100%" }}>
                            <View style={{ width: "90%" }}>
                                <TextInput placeholder='Recipient' style={{ marginLeft: 10, color: "#000" }} placeholderTextColor="#95A5A6" onChangeText={filterByRecipient}  value={searchRecipient}  />
                            </View>
                            <Feather name="search" size={20} style={{ marginTop: 13, color: "#000" }} />
                        </View>
                    </Card>
                    :
                    activeFilter === "Date" ?
                    <Card style={{ width: "90%", height: 50, marginTop: 10, marginBottom: 10, elevation: 5, borderRadius: 10 }}>
                    <View style={{ flexDirection: "row", width: "100%" }}>
                        <View style={{ width: "90%" }}>
                            <TextInput placeholder='Date..' style={{ marginLeft: 10, color: "#000" }} placeholderTextColor="#95A5A6" onChangeText={filterByDate} value={searchDate} />
                        </View>
                        <Feather name="search" size={20} style={{ marginTop: 13, color: "#000" }} />
                    </View>
                </Card>
                :
                activeFilter === "Area" ?
                <Card style={{ width: "90%", height: 50, marginTop: 10, marginBottom: 10, elevation: 5, borderRadius: 10 }}>
                <View style={{ flexDirection: "row", width: "100%" }}>
                    <View style={{ width: "90%" }}>
                        <TextInput placeholder='Area...' style={{ marginLeft: 10, color: "#000" }} placeholderTextColor="#95A5A6" onChangeText={filterByArea}  value={searchArea}/>
                    </View>
                    <Feather name="search" size={20} style={{ marginTop: 13, color: "#000" }} />
                </View>
            </Card>
            :
            activeFilter === "Status" ?
            <Card style={{ width: "90%", height: 50, marginTop: 10, marginBottom: 10, elevation: 5, borderRadius: 10 }}>
            <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ width: "90%" }}>
                    <TextInput placeholder='Status...' style={{ marginLeft: 10, color: "#000" }} placeholderTextColor="#95A5A6" onChangeText={filterByStatus}  value={searchStatus}/>
                </View>
                <Feather name="search" size={20} style={{ marginTop: 13, color: "#000" }} />
            </View>
        </Card>
        :
        activeFilter === "Phone" ?

        <Card style={{ width: "90%", height: 50, marginTop: 10, marginBottom: 10, elevation: 5, borderRadius: 10 }}>
        <View style={{ flexDirection: "row", width: "100%" }}>
            <View style={{ width: "90%" }}>
                <TextInput placeholder='Phone No..' style={{ marginLeft: 10, color: "#000" }} placeholderTextColor="#95A5A6" onChangeText={filterByPhone}  value={searchPhone}/>
            </View>
            <Feather name="search" size={20} style={{ marginTop: 13, color: "#000" }} />
        </View>
    </Card>
    :

<></>

                    }
                 
                </View>
                <View style={{flexDirection:"row"}}>
      <Text style={{marginLeft:10,marginTop:5,fontFamily: 'Poppins-Medium',color:"#3498DB"}}>Filter</Text>
        <ScrollView  horizontal={true}  showsHorizontalScrollIndicator={false}>
       <Card style={{width:100,height:30,marginTop:2,marginLeft:10,marginBottom:2,borderWidth:1,borderColor:activeFilter==="InvoiceNo"?"#3498DB":"#000",}}>
        <TouchableOpacity onPress={()=>setActiveFilter("InvoiceNo")}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%",height:"100%"}}>
        <Text style={{color:activeFilter==="InvoiceNo"?"#3498DB":"#000", fontFamily: 'Poppins-SemiBold',fontSize:12}}>Invoice No.</Text>
        </View>
        </TouchableOpacity>
       </Card>
       <Card style={{width:100,height:30,marginTop:2,marginLeft:10,marginBottom:2,borderWidth:1,borderColor:activeFilter==="Recipient"?"#3498DB":"#000",}}>
       <TouchableOpacity onPress={()=>setActiveFilter("Recipient")}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%",height:"100%"}}>
        <Text style={{color:activeFilter==="Recipient"?"#3498DB":"#000", fontFamily: 'Poppins-SemiBold',fontSize:12}}>Recipient</Text>
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

       <Card style={{width:100,height:30,marginTop:2,marginLeft:10,marginBottom:2,borderWidth:1,borderColor:activeFilter==="Area"?"#3498DB":"#000"}}>
       <TouchableOpacity  onPress={()=>setActiveFilter("Area")}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%",height:"100%"}}>
        <Text style={{color:activeFilter==="Area"?"#3498DB":"#000", fontFamily: 'Poppins-SemiBold',fontSize:12}}>Area</Text>
        </View>
        </TouchableOpacity>
       </Card>

       <Card style={{width:100,height:30,marginTop:2,marginLeft:10,marginBottom:2,borderWidth:1,borderColor:activeFilter==="Status"?"#3498DB":"#000",}}>
       <TouchableOpacity  onPress={()=>setActiveFilter("Status")}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%",height:"100%"}}>
        <Text style={{color:activeFilter==="Status"?"#3498DB":"#000", fontFamily: 'Poppins-SemiBold',fontSize:12}}>Status</Text>
        </View>
        </TouchableOpacity>
       </Card>

       <Card style={{width:100,height:30,marginTop:2,marginLeft:10,marginBottom:2,borderWidth:1,borderColor:activeFilter==="Phone"?"#3498DB":"#000",}}>
       <TouchableOpacity  onPress={()=>setActiveFilter("Phone")}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%",height:"100%"}}>
        <Text style={{color:activeFilter==="Phone"?"#3498DB":"#000", fontFamily: 'Poppins-SemiBold',fontSize:12}}>Phone</Text>
        </View>
        </TouchableOpacity>
       </Card>
        </ScrollView>


      </View>
                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                 
                                {
                                    foundValue && foundValue.slice().reverse().map(item => {
                                        return (
                                            <Card style={{ width: "90%", height: 100, marginTop: 10, marginBottom: 10, elevation: 5, borderRadius: 10 }}>
                                                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                                                    <View style={{ width: "60%" }}>
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
                                                    <View style={{ width: "40%", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                        <Text style={{ marginLeft: 10, color: "#34495E", fontSize: 10, marginTop: 7, fontFamily: "Poppins-SemiBold" }}><Moment element={Text} format='DD MMM YYYY'>{item.createdDateTime}</Moment> , <Moment element={Text} format='hh:mm A'>{item.createdDateTime}</Moment> </Text>
                                                        {
                                                            item.status === "Warehouse_London" ?
                                                                <Text style={{ fontSize: 10, marginLeft: 10, fontFamily: "Poppins-SemiBold", color: "#3498db" }}>Warehouse London</Text>
                                                                :
                                                                item.status === "pending" ?
                                                                    <Text style={{ fontSize: 10, marginLeft: 10, fontFamily: "Poppins-SemiBold", color: "#7d5fff" }}>Pending</Text>
                                                                    :
                                                                    item.status === "PickUp" ?
                                                                        <Text style={{ fontSize: 10, marginLeft: 10, fontFamily: "Poppins-SemiBold", color: "#fdcb6e" }}>Pick Up</Text>
                                                                        :
                                                                        item.status === "Delivered" ?
                                                                            <Text style={{ fontSize: 10, marginLeft: 10, fontFamily: "Poppins-SemiBold", color: "#2ecc71" }}>Delivered</Text>
                                                                            :
                                                                            item.status === "Container" ?
                                                                                <Text style={{ fontSize: 10, marginLeft: 10, fontFamily: "Poppins-SemiBold", color: "#a55eea" }}>Container</Text>
                                                                                :
                                                                                <Text style={{ fontSize: 10, marginLeft: 10, fontFamily: "Poppins-SemiBold", color: "#F1C40F" }}>{item.status}</Text>
                                                        }

                                                        <Text style={{ marginLeft: 10, color: "#34495E", fontSize: 8, marginTop: 0, fontFamily: "Poppins-Medium" }}><Moment element={Text} format='DD MMM YYYY'>{item.createdDateTime}</Moment> , <Moment element={Text} format='hh:mm A'>{item.createdDateTime}</Moment></Text>
                                                        <View style={{ flexDirection: "column", width: "60%", justifyContent: "center", alignItems: "center", backgroundColor: "#1ABC9C", marginLeft: 10, height: 25, borderRadius: 50, marginTop: 1 }}>
                                                            <TouchableOpacity onPress={() => navigation.navigate("InvoiceDetail", { data: item })}>
                                                                <View style={{ width: "70%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                                                    <Text style={{ color: "#fff", fontSize: 11 }}>View Detail</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </Card>
                                        )
                                    })
                                }
                           
                         
                </View>
            </ScrollView>
            
            </>



            }
            

            <View style={{ position: "absolute", bottom: 0, height: 80, width: "100%" }}>
                <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end" }}>
                    <TouchableOpacity onPress={() => navigation.navigate("AddCustomerInvoice")}>
                        <View style={{ backgroundColor: "#E74C3C", width: 60, height: 60, marginRight: 30, flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: 50 }} >
                            <Feather name="plus" size={25} color="#fff" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}