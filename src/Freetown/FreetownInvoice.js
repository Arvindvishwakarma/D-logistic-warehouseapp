/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import { View, Text, StatusBar, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState,useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { Card } from 'react-native-paper';
import { useQuery } from '@apollo/client';
import { QUERY_GET_ALL_INVOICE, QUERY_GET_FREETOWN_INVOICE } from '../Graphql/Query';
import Moment from 'react-moment';
import moment from 'moment';

export default function FreetownInvoice({ navigation }) {

    const { data, loading } = useQuery(QUERY_GET_FREETOWN_INVOICE,{
        pollInterval:300
    });

    const [search, setSearch] = useState("");
         
    const[activeFilter,setActiveFilter] =useState("InvoiceNo")

    const [foundValue, setFoundValue] = useState();

    useEffect(() => {
      if (data) {
        setFoundValue(data.getInvoiceFreetown)
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
      const results = data.getInvoiceFreetown.filter((data) => {
        const dateMom = moment(data.createdDateTime);
        const dateMomFormat = dateMom.format('DD/MM/YYYY')
        console.log("dateMomFormat",dateMomFormat)
        return dateMomFormat.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundValue(results);
    }
    else {
      setFoundValue(data.getInvoiceFreetown);
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
      const results = data.getInvoiceFreetown.filter((data) => {
        return data.phoneOne.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundValue(results);
    }
    else {
      setFoundValue(data.getInvoiceFreetown);
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
      const results = data.getInvoiceFreetown.filter((data) => {
        return data.invoiceNumber.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundValue(results);
    }
    else {
      setFoundValue(data.getInvoiceFreetown);
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
      const results = data.getInvoiceFreetown.filter((data) => {
        return data.area.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundValue(results);
    }
    else {
      setFoundValue(data.getInvoiceFreetown);
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
      const results = data.getInvoiceFreetown.filter((data) => {
        return data.status.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundValue(results);
    }
    else {
      setFoundValue(data.getInvoiceFreetown);
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
      const results = data.getInvoiceFreetown.filter((data) => {
        return data.recipientName.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundValue(results);
    }
    else {
      setFoundValue(data.getInvoiceFreetown);
    }
    setSearchRecipeint(keyword);
  };

  
  function clearSearch() {
    setFoundValue(data.getInvoiceFreetown)
  }
 


   

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
                            <Text style={{ fontSize: 18, fontFamily: "Poppins-SemiBold", color: "#fff", marginLeft: 10 }}>Invoice </Text>
                        </View>
                    </View>
                </View>
                {
                      data && data.getInvoiceFreetown.length === 0 ?
                    <></>
                      :
                      <>
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

      

       <Card style={{width:100,height:30,marginTop:2,marginLeft:10,marginBottom:2,borderWidth:1,borderColor:activeFilter==="Phone"?"#3498DB":"#000",}}>
       <TouchableOpacity  onPress={()=>setActiveFilter("Phone")}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%",height:"100%"}}>
        <Text style={{color:activeFilter==="Phone"?"#3498DB":"#000", fontFamily: 'Poppins-SemiBold',fontSize:12}}>Phone</Text>
        </View>
        </TouchableOpacity>
       </Card>
        </ScrollView>


      </View>
                      </>



                }
             
               
                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                  
                                {
                                    foundValue && foundValue.slice().reverse().map(item => {
                                        return (
                                            <Card style={{ width: "90%", height: 150, marginTop: 10, marginBottom: 10, elevation: 5, borderRadius: 10 }}>
                                                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>

                                                    <View style={{ width: "50%", }}>
                                                        <Text style={{ marginLeft: 10, color: "#34495E", fontSize: 12, marginTop: 7, fontFamily: "Poppins-SemiBold" }}>#{item.invoiceNumber}</Text>
                                                        <View style={{ flexDirection: "row", marginLeft: 10 ,width:110}}>
                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Recipient : </Text>
                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }} numberOfLines={1}>{item.recipientName} </Text>
                                                        </View>
                                                        <View style={{ flexDirection: "row", marginLeft: 10,width:110 }}>
                                                            <Text style={{ fontSize: 10, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Email : </Text>
                                                            <Text style={{ fontSize: 10, fontFamily: "Poppins-SemiBold", color: "#34495E" }} numberOfLines={1}>{item.email} </Text>
                                                        </View>
                                                        <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Phone : </Text>
                                                            <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.phoneOne} </Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ width: "50%" }}>
                                                        <Text style={{ marginLeft: 10, color: "#34495E", fontSize: 11, marginTop: 7, fontFamily: "Poppins-SemiBold" }}><Moment element={Text} format='DD MMM YYYY'>{item.createdDateTime}</Moment> , <Moment element={Text} format='hh:mm A'>{item.createdDateTime}</Moment> </Text>
                                                        <Text style={{ fontSize: 11, marginLeft: 10, fontFamily: "Poppins-SemiBold", color: "#F1C40F" }}>Freetown</Text>
                                                        <Text style={{ marginLeft: 10, color: "#34495E", fontSize: 8, marginTop: 0, fontFamily: "Poppins-Medium" }}><Moment element={Text} format='DD MMM YYYY'>{item.createdDateTime}</Moment> , <Moment element={Text} format='hh:mm A'>{item.createdDateTime}</Moment></Text>
                                                       
                                                    </View>
                                                </View>
                                                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",width:"100%",marginTop:10}}>
                                                    <View style={{width:"90%",flexDirection:"row",justifyContent:"space-between"}}>
                                                       
                                                        <View style={{width:"50%",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                                                   
                                                   <View style={{ flexDirection: "column", width: "80%", justifyContent: "center", alignItems: "center", backgroundColor: "#1ABC9C",  height: 30, borderRadius: 50, marginTop: 1 }}>
                                                       <View style={{flexDirection:"column",width:"100%",justifyContent:"center",alignItems:"center",height:30}}>
                                                       <TouchableOpacity onPress={() => navigation.navigate("InvoiceDetail", { data: item })}>
                                                       <View style={{flexDirection:"column",width:"100%",justifyContent:"center",alignItems:"center",height:30}}>
                                                       <Text style={{ color: "#fff", fontSize: 10,fontFamily: "Poppins-SemiBold" }}>View Detail</Text>
                                                           </View>
                                                           </TouchableOpacity>
                                                       </View>
                                                       </View>

                                                   </View>
                                                       
                                                        <View style={{width:"50%",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                                                        {

                                                            item.collectionBoyFreetownId === null ?
                                                            <View style={{ flexDirection: "column", width: "80%", justifyContent: "center", alignItems: "center", backgroundColor: "#3498DB",  height: 30, borderRadius: 50, marginTop: 1 }}>
                                                            <View style={{flexDirection:"column",width:"100%",justifyContent:"center",alignItems:"center",height:30}}>
                                                            <TouchableOpacity onPress={()=>navigation.navigate("AddFreetownBoy",{invoiceId:item.id})}>
                                                            <View style={{flexDirection:"column",width:"100%",justifyContent:"center",alignItems:"center",height:30}}>
                                                            <Text style={{ color: "#fff", fontSize: 10,fontFamily: "Poppins-SemiBold" }}>Add Delivery Boy</Text>
                                                                </View>
                                                                </TouchableOpacity>
    
                                                            </View>
                                                             
                                                            </View>
                                                            :
                                                            <View style={{ flexDirection: "column", width: "80%", justifyContent: "center", alignItems: "center", backgroundColor: "#3498DB",  height: 30, borderRadius: 50, marginTop: 1,opacity:0.5 }}>
                                                            <View style={{flexDirection:"column",width:"100%",justifyContent:"center",alignItems:"center",height:30}}>
                                                           
                                                            <View style={{flexDirection:"column",width:"100%",justifyContent:"center",alignItems:"center",height:30}}>
                                                            <Text style={{ color: "#fff", fontSize: 10,fontFamily: "Poppins-SemiBold" }}>Add Delivery Boy</Text>
                                                                </View>
                                                                
    
                                                            </View>
                                                             
                                                            </View>



                                                        }
                                                  

                                                        </View>

                                                    </View>


                                                </View>

                                                
                                                {
                                                    item.collectionBoyFreetownId === null ?
                                                       <></>

                                                        :
                                                        <View style={{ marginTop: 8 }}>
                                                            <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                                                <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Delivery Boy Name : </Text>
                                                                <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.email} </Text>
                                                            </View>
                                                            <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                                                <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#2980B9" }}>Delivery Boy Id : </Text>
                                                                <Text style={{ fontSize: 11, fontFamily: "Poppins-SemiBold", color: "#34495E" }}>{item.phoneOne} </Text>
                                                            </View>
                                                        </View>
                                                }
                                            </Card>
                                        )
                                    })
                                }
                        
                         
                
                </View>
            </ScrollView>
        </View>
    )
}