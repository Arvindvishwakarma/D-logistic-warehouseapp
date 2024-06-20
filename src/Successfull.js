/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { View, Text, StatusBar, TouchableOpacity, ActivityIndicator, TextInput,StyleSheet,Image ,TouchableHighlight,Button} from 'react-native'
import React, { useState, useEffect ,useRef,createRef} from 'react'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_GET_ALL_INVOICE_FREETOWN, QUERY_GET_ALL_INVOICE_ON_WAY, QUERY_GET_INVOICE_BY_ID, QUERY_GET_USER_BY_ID, QUERY_GET_FREETOWN_INVOICE, QUERY_GET_BOOKING_STATUS_PENDING, QUERY_GET_WAREHOUSE_BY_ID, QUERY_GET_ALL_INVOICE, QUERY_ALL_CUSTOMER, GET_ALL_CONTAINER, QUERY_GET_ALL_INVOICE_WAREHOUSE_LONDON, QUERY_GET_ALL_INVOICE_PICK_UP } from './Graphql/Query';
import { MUTATION_EDIT_INVOICE, MUTATION_INVOICE_DELIVERED, MUTATION_INVOICE_INTO_CONTAINER, MUTATION_INVOICE_IN_CONTAINER } from './Graphql/Mutation';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { decode } from "base64-arraybuffer";
import fs from "react-native-fs";
import RBSheet from "react-native-raw-bottom-sheet"
import DropDownPicker from 'react-native-dropdown-picker';
import SignatureCapture from 'react-native-signature-capture';
import Modal from "react-native-modal";
import error from "../assets/Image/400.png"

export default function Successfull({ navigation, route }) {


  const containerStyle = { backgroundColor: 'white', padding: 20 };
  const [containerNo, setContainerNo] = useState("")


  const [userId, setUserId] = useState();

  console.log("userId",userId)

  useEffect(() => {
    AsyncStorage.getItem('userId').then(id => setUserId(id));
  })

  const { data: userData, loading: userLoading } = useQuery(QUERY_GET_WAREHOUSE_BY_ID, {
    variables: {
      "warehouseId":`${userId}`
    }
  })

  console.log("userData",userData)

  const { result } = route.params;

  const { data, loading } = useQuery(QUERY_GET_INVOICE_BY_ID, {
    variables: {
      "invoiceId": `${result}`,
    },
    pollInterval:300
  })

  console.log("data",data)


  const [editInvoice] = useMutation(MUTATION_EDIT_INVOICE, {
    refetchQueries: [
      QUERY_GET_INVOICE_BY_ID,
      "getInvoiceById",
      QUERY_GET_ALL_INVOICE_FREETOWN,
      "getInvoiceFreetown",
      QUERY_GET_ALL_INVOICE_ON_WAY,
      "getInvoiceOnWay",
      QUERY_GET_FREETOWN_INVOICE,
      "getInvoiceFreetown",
    
    ]
  })

  

  function handleWareHouse() {
    let date = new Date();
    if (  data && data.getInvoiceById.status === "Warehouse_London") {
      editInvoice({
        variables: {
          "editInvoiceInput": {
            "invoiceId": `${data && data.getInvoiceById.id}`,
            "status": "Container",
            "containerPickUpDateAndTime": `${date}`
          },
        }
      })
      showMessage({
        message: "Update Successfully",
        type: "success",
      });
      navigation.navigate("Home");
    } else  if ( userData && userData.getWarehouseById.role === "WareHouse_London" && data && data.getInvoiceById.status === "Container") {
      editInvoice({
        variables: {
          "editInvoiceInput": {
            "invoiceId": `${data && data.getInvoiceById.id}`,
            "status": "Container",
            "containerPickUpDateAndTime": `${date}`
          },
        }
      })
      showMessage({
        message: "Update Successfully",
        type: "success",
      });
      navigation.navigate("Home");
    }



    else {
      editInvoice({
        variables: {
          "editInvoiceInput": {
            "invoiceId": `${data && data.getInvoiceById.id}`,
            "status": "Warehouse_London",
            "warehousePickupDateAndTime": `${date}`
          },
        }
      })
      showMessage({
        message: "Update Successfully",
        type: "success",
      });
      navigation.navigate("Home");
    }
  }


  function handleFreetown() {
    let date = new Date()
    if (data && data.getInvoiceById.status === "Freetown_London") {
      editInvoice({
        variables: {
          "editInvoiceInput": {
            "invoiceId": `${data && data.getInvoiceById.id}`,
            "status": "Delivered",
            "deliveredDateAndTime": `${date}`
          },
        }
      })
      showMessage({
        message: "Update Successfully",
        type: "success",
      });
      navigation.navigate("FreetownHome");
    }
    else {
      editInvoice({
        variables: {
          "editInvoiceInput": {
            "invoiceId": `${data && data.getInvoiceById.id}`,
            "status": "Freetown_London",
            "freetownPickUpDateAndTime": `${date}`
          },
        }
      })
      showMessage({
        message: "Update Successfully",
        type: "success",
      });
      navigation.navigate("FreetownHome");
    }


  }


  const [invoiceItemIntoContainer, { loading: loadingItemContainer }] = useMutation(MUTATION_INVOICE_IN_CONTAINER, {
    refetchQueries: [
      QUERY_GET_INVOICE_BY_ID,
      "getInvoiceById"
    ]
  })

   const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [ContainerItemId,setContainerItemId] =useState("")
    console.log("value",value)

     const{data:dataItem,loading:loadinItem} =useQuery(GET_ALL_CONTAINER)

     console.log("dataItem",dataItem)

     console.log("ContainerItemId",ContainerItemId)

    


    useEffect(()=>{
      dataItem && dataItem.getAllContainer.map(list=>{
        return(
          setItems(items=>[...items,{
            label:` Container No ${list.containerUniqueId}`,
            value: `${list.containerUniqueId}`,
            id:`${list.id}`
           }])
        )
      })
    },[dataItem])

    console.log("dataItem",dataItem)
    

  const [getItemId, setGetItemId] = useState("")
  function handleItemContainer(itemId) {
    setGetItemId(itemId)
    invoiceItemIntoContainer({
      variables: {
        "invoiceId": `${data && data.getInvoiceById.id}`,
        "itemId": `${itemId}`,
        "containerNo": `${value}`
      }
    })
  }

  const [invoiceItemIntoDelivered, { loading: loadingDelivered }] = useMutation(MUTATION_INVOICE_DELIVERED, {
    refetchQueries: [
      QUERY_GET_INVOICE_BY_ID,
      "getInvoiceById",
      QUERY_GET_ALL_INVOICE,
      "getAllInvoice"
    ]
  })

  const handleItemDelivered = (itemId) => {
    let date = new Date()

    setGetItemId(itemId)
    invoiceItemIntoDelivered({
      variables: {
        "invoiceId": `${data && data.getInvoiceById.id}`,
        "itemId": `${itemId}`,
        "itemDeliveredDateAndTime": `${date}`,
        "itemStatus": "Delivered"
      }
    })
  }


  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };



  //Draw Signature

  const sign = createRef();
   

    const saveSign =() => {
        sign.current.saveImage();
    }

    const  resetSign =() => {
        sign.current.resetImage();
    }

    const[state,setState] =useState(false)
    const[signa,setSigna] =useState("")

    const  _onSaveEvent =(result)=> {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        console.log(result);
        setState(true)
        setSigna({ path: result.pathName })
        setGetImage(result.pathName)
      
    }
    const  _onDragEvent =() => {
         // This callback will be called when the user enters signature
        console.log("dragged");
    }

    const[getImage,setGetImage] =useState()
    const[getId,setGetId] =useState(data && data.getInvoiceById.id)
  
  useEffect(()=>{
    setGetId(data && data.getInvoiceById.id)
  },[data])


    const [uploading, setUploading] = useState(false)

    const handleUpload = async () => {
      setUploading(true)
      let date = new Date()
      var S3 = require("aws-sdk/clients/s3");
      const BUCKET_NAME = "byaahlagan-profile-image";
      const IAM_USER_KEY = "ACCESS KEY";
      const IAM_USER_SECRET = "SECRET KEY";
  
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < 5; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      const uniqueName = result + ".png"
  
      const s3bucket = new S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME,
        signatureVersion: "v4"
      });
  
      let contentType = "image/png";
      let contentDeposition = 'inline;filename="' + getImage + '"';
      const fPath = getImage;
  
      const base64 = await fs.readFile(fPath, "base64");
      const arrayBuffer = decode(base64);
  
      s3bucket.createBucket(() => {
        const params = {
          Bucket: BUCKET_NAME,
          Key: uniqueName,
          Body: arrayBuffer,
          ContentDisposition: contentDeposition,
          ContentType: contentType
        };
        s3bucket.upload(params, (err, data) => {
          if (err) {
            console.log("error in callback");
          } else {
            editInvoice({
              variables: {
                "editInvoiceInput": {
                  "invoiceId": `${getId}`,
                   "imgSignature":`${uniqueName}`,
                   "status": "Delivered",
                   "deliveredDateAndTime": `${date}`
                }
                }
           })
           toggleModal()
           showMessage({
            message: "Upload Successfully Please Wait",
            type: "success",
          });
          navigation.navigate("FreetownHome")
          setUploading(false)
          }
        })
      });
    }

    console.log("value",value)
    console.log("open",open)
    const [search, setSearch] = useState("null")

   


  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <ScrollView>
        <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
          {
            loading ?
              <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: 100 }}>
                <ActivityIndicator size="large" color="#000" />
                <Text>Please Wait Loading</Text>
              </View>
              :
              userLoading ?
              <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: 100 }}>
              <ActivityIndicator size="large" color="#000" />
              <Text>Please Wait Loading</Text>
            </View>
              :

              data  === undefined ?
              <View >
             <View style={{marginTop:50}}>
             <Image source={error}  style={{width:300,height:300}}/>
             </View>

              </View>

              :

              data && data.getInvoiceById === null?
              <View >
              <View style={{marginTop:50}}>
             <Image source={error}  style={{width:300,height:300}}/>
             </View>

            </View>
              :



              <>
                <View style={{ backgroundColor: "#3498DB", height: 200, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, width: "100%" }}>
                  <StatusBar barStyle="light-content" hidden={false} backgroundColor="#3498DB" translucent={true} />
                  <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 70 }}>
                    <View style={{ flexDirection: "row", width: "90%", justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ fontSize: 19, fontFamily: "Poppins-SemiBold", color: "#fff", marginTop: 50 }}>Scan Successfully</Text>
                    </View>
                  </View>
                </View>
                <Text style={{ marginTop: 20, fontFamily: "Poppins-SemiBold", color: "#000" }}>Do you want to update status to </Text>

                {

                  data && data.getInvoiceById.status === "Warehouse_London"  &&  userData && userData.getWarehouseById.role === "WareHouse_London" ?
                    <>
                      <Text style={{ fontFamily: "Poppins-SemiBold", color: "#3498DB", }}>Load to container  </Text>
                      <Text style={{ fontFamily: "Poppins-SemiBold", color: "#3498DB", fontSize: 10 }}>Total Item  ({data && data.getInvoiceById.items.length})</Text>
                      {
                        data && data.getInvoiceById.items.map(list => {
                          return (
                            <View style={{ width: "85%", flexDirection: "row", justifyContent: "space-between", height: 50, marginTop: 5, borderRadius: 5 }}>
                              <Card style={{ width: "100%", marginTop: 2, marginBottom: 2, elevation: 3, height: "100%" }}>
                                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                                  <View style={{ width: "25%", height: 50, flexDirection: "column", alignItems: "center", justifyContent: "center",  }}>
                                    <Text style={{ fontFamily: "Poppins-Medium", fontSize: 8, color: "#3498DB" }}>Item No</Text>
                                    <Text style={{ fontSize: 11, color: "#000" }}>{list.itemId}</Text>
                                  </View>
                                  <View style={{ width: "50%", height: 50, flexDirection: "column", alignItems: "center", justifyContent: "center",  }}>
                                    {
                                      list.containerNo === "null" ?
                                      <DropDownPicker
                                      onPress={()=>setContainerItemId(list.id)}
                                      open={open}
                                      value={list.id === ContainerItemId ? value :""}
                                      items={items}
                                      setOpen={setOpen}
                                      setValue={setValue}
                                      setItems={setItems}
                                      style={{fontSize:10}}
                                      placeholder="Select Container"
                                      listMode="MODAL"
                                    />
                                     : 
                                     
                                        <>
                                          <Text style={{ fontFamily: "Poppins-Medium", fontSize: 8, color: "#3498DB" }}>Container No</Text>
                                          <Text style={{ fontSize: 11, color: "#000" }}>{list.containerNo}</Text>
                                        </>
                                    }

                                  </View>
                                  <View style={{ width: "25%", height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    {
                                      getItemId === list.id && loadingItemContainer ?
                                        <ActivityIndicator size="small" color="#000" />
                                        :
                                        <>
                                          {
                                            list.containerNo === "null" ?

                                              <View style={{ width: "70%", height: 40, backgroundColor: list.containerNo === "null" ? "#3498DB" : "#2ecc71", borderRadius: 5 }}>
                                                <TouchableOpacity onPress={() => handleItemContainer(list.id)}>
                                                  <View style={{ width: "100%", height: 40, backgroundColor: list.containerNo === "null" ? "#3498DB" : "#2ecc71", borderRadius: 5 }}>
                                                    <View style={{ width: "100%", height: 40, backgroundColor: list.containerNo === "null" ? "#3498DB" : "#2ecc71", borderRadius: 5, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                      {
                                                        list.containerNo === "null" ?
                                                          <AntDesign name='checkcircleo' size={15} color="#fff" />
                                                          :
                                                          <AntDesign name='checkcircle' size={15} color="#fff" />

                                                      }
                                                    </View>
                                                  </View>
                                                </TouchableOpacity>
                                              </View>
                                              :
                                              <View style={{ width: "70%", height: 40, backgroundColor: list.containerNo === null ? "#3498DB" : "#2ecc71", borderRadius: 5 }}>
                                                <View style={{ width: "100%", height: 40, backgroundColor: list.containerNo === null ? "#3498DB" : "#2ecc71", borderRadius: 5 }}>
                                                  <View style={{ width: "100%", height: 40, backgroundColor: list.containerNo === null ? "#3498DB" : "#2ecc71", borderRadius: 5, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                    {
                                                      list.containerNo === null ?
                                                        <AntDesign name='checkcircleo' size={15} color="#fff" />
                                                        :
                                                        <AntDesign name='checkcircle' size={15} color="#fff" />
                                                    }
                                                  </View>
                                                </View>
                                              </View>
                                          }

                                        </>
                                    }
                                  </View>
                                </View>
                              </Card>
                            </View>
                          )

                        })
                      }
                      <View style={{ width: "80%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, marginTop: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() => handleWareHouse()}>
                          <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, borderRadius: 10 }}>
                            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, borderRadius: 10 }}>
                              <Text style={{ fontSize: 17, color: "#fff", fontFamily: "Poppins-SemiBold" }}>Update Container</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </>
                :
                data && data.getInvoiceById.status === "Container"  &&  userData && userData.getWarehouseById.role === "WareHouse_London" ?
                <>
                  <Text style={{ fontFamily: "Poppins-SemiBold", color: "#3498DB", }}>Load to container  </Text>
                  <Text style={{ fontFamily: "Poppins-SemiBold", color: "#3498DB", fontSize: 10 }}>Total Item  ({data && data.getInvoiceById.items.length})</Text>
                  {
                    data && data.getInvoiceById.items.map(list => {
                      return (
                        <View style={{ width: "85%", flexDirection: "row", justifyContent: "space-between", height: 50, marginTop: 5, borderRadius: 5 }}>
                          <Card style={{ width: "100%", marginTop: 2, marginBottom: 2, elevation: 3, height: "100%" }}>
                            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                              <View style={{ width: "25%", height: 50, flexDirection: "column", alignItems: "center", justifyContent: "center",  }}>
                                <Text style={{ fontFamily: "Poppins-Medium", fontSize: 8, color: "#3498DB" }}>Item No</Text>
                                <Text style={{ fontSize: 11, color: "#000" }}>{list.itemId}</Text>
                              </View>
                              <View style={{ width: "50%", height: 50, flexDirection: "column", alignItems: "center", justifyContent: "center",  }}>
                                {
                                  list.containerNo === "null" ?
                                  <DropDownPicker
                                  onPress={()=>setContainerItemId(list.id)}
                                  open={open}
                                  value={list.id === ContainerItemId ? value :""}
                                  items={items}
                                  setOpen={setOpen}
                                  setValue={setValue}
                                  setItems={setItems}
                                  style={{fontSize:10}}
                                  placeholder="Select Container"
                                  listMode="MODAL"
                                />
                                 : 
                                 
                                    <>
                                      <Text style={{ fontFamily: "Poppins-Medium", fontSize: 8, color: "#3498DB" }}>Container No</Text>
                                      <Text style={{ fontSize: 11, color: "#000" }}>{list.containerNo}</Text>
                                    </>
                                }

                              </View>
                              <View style={{ width: "25%", height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                {
                                  getItemId === list.id && loadingItemContainer ?
                                    <ActivityIndicator size="small" color="#000" />
                                    :
                                    <>
                                      {
                                        list.containerNo === "null" ?

                                          <View style={{ width: "70%", height: 40, backgroundColor: list.containerNo === "null" ? "#3498DB" : "#2ecc71", borderRadius: 5 }}>
                                            <TouchableOpacity onPress={() => handleItemContainer(list.id)}>
                                              <View style={{ width: "100%", height: 40, backgroundColor: list.containerNo === "null" ? "#3498DB" : "#2ecc71", borderRadius: 5 }}>
                                                <View style={{ width: "100%", height: 40, backgroundColor: list.containerNo === "null" ? "#3498DB" : "#2ecc71", borderRadius: 5, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                  {
                                                    list.containerNo === "null" ?
                                                      <AntDesign name='checkcircleo' size={15} color="#fff" />
                                                      :
                                                      <AntDesign name='checkcircle' size={15} color="#fff" />

                                                  }
                                                </View>
                                              </View>
                                            </TouchableOpacity>
                                          </View>
                                          :
                                          <View style={{ width: "70%", height: 40, backgroundColor: list.containerNo === null ? "#3498DB" : "#2ecc71", borderRadius: 5 }}>
                                            <View style={{ width: "100%", height: 40, backgroundColor: list.containerNo === null ? "#3498DB" : "#2ecc71", borderRadius: 5 }}>
                                              <View style={{ width: "100%", height: 40, backgroundColor: list.containerNo === null ? "#3498DB" : "#2ecc71", borderRadius: 5, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                {
                                                  list.containerNo === null ?
                                                    <AntDesign name='checkcircleo' size={15} color="#fff" />
                                                    :
                                                    <AntDesign name='checkcircle' size={15} color="#fff" />
                                                }
                                              </View>
                                            </View>
                                          </View>
                                      }

                                    </>
                                }
                              </View>
                            </View>
                          </Card>
                        </View>
                      )

                    })
                  }
                  <View style={{ width: "80%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, marginTop: 15, borderRadius: 10 }}>
                    <TouchableOpacity onPress={() => handleWareHouse()}>
                      <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, borderRadius: 10 }}>
                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, borderRadius: 10 }}>
                          <Text style={{ fontSize: 17, color: "#fff", fontFamily: "Poppins-SemiBold" }}>Update Container</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
            :

                    data && data.getInvoiceById.status === "Freetown_London" ?
                      <>
                        <Text style={{ fontFamily: "Poppins-SemiBold", color: "#3498DB", }}>Item Delivered  </Text>
                        <Text style={{ fontFamily: "Poppins-SemiBold", color: "#3498DB", fontSize: 10 }}>Total Item  ({data && data.getInvoiceById.items.length})</Text>
                        {
                          data && data.getInvoiceById.items.map(list => {
                            return (
                              <View style={{ width: "85%", flexDirection: "row", justifyContent: "space-between", height: 50, marginTop: 5, borderRadius: 5 }}>
                                <Card style={{ width: "100%", marginTop: 2, marginBottom: 2, elevation: 3, height: "100%" }}>
                                  <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{ width: "25%", height: 50, flexDirection: "column", alignItems: "center", justifyContent: "center", borderRightColor: "#000", borderRightWidth: 1 }}>
                                      <Text style={{ fontFamily: "Poppins-Medium", fontSize: 8, color: "#3498DB" }}>Item No</Text>
                                      <Text style={{ fontSize: 11, color: "#000" }}>{list.itemId}</Text>
                                    </View>

                                    <View style={{ width: "75%", height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                      {
                                        getItemId === list.id && loadingDelivered ?
                                          <ActivityIndicator size="small" color="#000" />
                                          :
                                          <>
                                            {
                                              list.ItemStatus === "null" ?

                                                <View style={{ width: "90%", height: 40, backgroundColor: list.ItemStatus === "null" ? "#3498DB" : "#2ecc71", borderRadius: 5 }}>
                                                  <TouchableOpacity onPress={() => handleItemDelivered(list.id)}>
                                                    <View style={{ width: "100%", height: 40, backgroundColor: list.ItemStatus === "null" ? "#3498DB" : "#2ecc71", borderRadius: 5 }}>
                                                      <View style={{ width: "100%", height: 40, backgroundColor: list.ItemStatus === "null" ? "#3498DB" : "#2ecc71", borderRadius: 5, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                        {
                                                          list.ItemStatus === "null" ?
                                                            <Text style={{ color: "#fff", fontFamily: "Poppins-SemiBold" }}>Delivered </Text>
                                                            :
                                                            <AntDesign name='checkcircle' size={15} color="#fff" />

                                                        }
                                                      </View>
                                                    </View>
                                                  </TouchableOpacity>
                                                </View>
                                                :
                                                <View style={{ width: "90%", height: 40, backgroundColor: list.ItemStatus === "null" ? "#3498DB" : "#2ecc71", borderRadius: 5 }}>
                                                  <View style={{ width: "100%", height: 40, backgroundColor: list.ItemStatus === "null" ? "#3498DB" : "#2ecc71", borderRadius: 5 }}>
                                                    <View style={{ width: "100%", height: 40, backgroundColor: list.ItemStatus === "null" ? "#3498DB" : "#2ecc71", borderRadius: 5, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                      {
                                                        list.status === "null" ?
                                                          <Text style={{ color: "#fff", fontFamily: "Poppins-SemiBold" }}>Delivered</Text>
                                                          :
                                                          <AntDesign name='checkcircle' size={15} color="#fff" />
                                                      }
                                                    </View>
                                                  </View>
                                                </View>
                                            }
                                          </>
                                      }
                                    </View>
                                  </View>
                                </Card>
                              </View>
                            )

                          })
                        }
                        {
                          data && data.getInvoiceById.items.filter((getAllUsers) => getAllUsers.ItemStatus.includes(search)).length != 0 ?
                          <View style={{ width: "80%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, marginTop: 15, borderRadius: 10 }}>
                          <TouchableOpacity  onPress={()=>alert("All Item not Delivered")}>
                            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, borderRadius: 10 ,opacity:0.5 }}>
                              <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, borderRadius: 10 }}>
                                <Text style={{ fontSize: 17, color: "#fff", fontFamily: "Poppins-SemiBold" }}>Update Delivered</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                          :
                              <View style={{ width: "80%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, marginTop: 15, borderRadius: 10 }}>
                          <TouchableOpacity  onPress={toggleModal}>
                            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, borderRadius: 10 }}>
                              <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, borderRadius: 10 }}>
                                <Text style={{ fontSize: 17, color: "#fff", fontFamily: "Poppins-SemiBold" }}>Update Delivered</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>



                        }


                      
                      </>
                      :
                      data && data.getInvoiceById.status === "PickUp" ?
                      <View style={{ width: "80%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, marginTop: 15, borderRadius: 10 }}>
                      <TouchableOpacity onPress={() => handleWareHouse()}>
                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, borderRadius: 10 }}>
                          <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, borderRadius: 10 }}>
                            <Text style={{ fontSize: 17, color: "#fff", fontFamily: "Poppins-SemiBold" }}>Update Warehouse</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                      :
                      <>
                        {
                          data && data.getInvoiceById === null ?
                            <View style={{ width: "80%", flexDirection: "row", alignItems: "center", justifyContent: "center", height: 50, marginTop: 15, }}>
                              <Text style={{ color: "red" }}>Data Failed Scan Again</Text>
                            </View>
                            :
                            <>
                              {
                                userData && userData.getWarehouseById.role === "WareHouse_London" ?
                                  <>
                                    <View style={{ width: "80%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, marginTop: 15, borderRadius: 10 }}>
                                      <TouchableOpacity onPress={() => handleWareHouse()}>
                                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, borderRadius: 10 }}>
                                          <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, borderRadius: 10 }}>
                                            <Text style={{ fontSize: 17, color: "#fff", fontFamily: "Poppins-SemiBold" }}>Update Warehouse</Text>
                                          </View>
                                        </View>
                                      </TouchableOpacity>
                                    </View>
                                 
                                 
                                  </>
                                  :
                                  userData && userData.getWarehouseById.role === "WareHouse_Freetown" ?
                                    <>
                                      <View style={{ width: "80%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, marginTop: 15, borderRadius: 10 }}>
                                        <TouchableOpacity onPress={() => handleFreetown()}>
                                          <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, borderRadius: 10 }}>
                                            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2ECC71", height: 50, borderRadius: 10 }}>
                                              <Text style={{ fontSize: 17, color: "#fff", fontFamily: "Poppins-SemiBold" }}>Update Freetown</Text>
                                            </View>
                                          </View>
                                        </TouchableOpacity>
                                      </View>
                                   
                                    
                                    </>
                                    :
                                    <></>
                              }

                            </>
                        }
                      </>
                }
                <View style={{ flexDirection: "row", width: "80%", justifyContent: "space-between", marginTop: 10 }}>
                  <Text style={{ color: "#3498DB", fontFamily: "Poppins-SemiBold" }}>Invoice No :</Text>
                  <Text style={{ color: "#000", fontFamily: "Poppins-SemiBold" }}>{data && data.getInvoiceById.invoiceNumber}</Text>
                </View>
              </>
          }

        </View>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 0, width: "100%",marginBottom:30}}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
          {
                   userData && userData.getWarehouseById.role === "WareHouse_London" ?
                   <View style={{ width: "85%", backgroundColor: "#E74C3C", height: 50, marginBottom: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                   <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                     <View  style={{ width: "100%", backgroundColor: "#E74C3C", height: 50, marginBottom: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                     <Text style={{ fontSize: 17, color: "#fff", fontFamily: "Poppins-SemiBold" }}>Cancel</Text>
                     </View>
                     </TouchableOpacity>
                   </View>
                   :
                   <View style={{ width: "85%", backgroundColor: "#E74C3C", height: 50, marginBottom: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                   <TouchableOpacity onPress={() => navigation.navigate("FreetownHome")}>
                     <View  style={{ width: "100%", backgroundColor: "#E74C3C", height: 50, marginBottom: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                     <Text style={{ fontSize: 17, color: "#fff", fontFamily: "Poppins-SemiBold" }}>Cancel</Text>
                     </View>
                     </TouchableOpacity>
                   </View>

          }
        </View>
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={{ backgroundColor:"#fff"  ,height:600}}>
           <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",}}>
             <Text style={{color:"#000",fontFamily:"Poppins-SemiBold"}}>Draw Signature</Text>
           </View>


        <SignatureCapture
        style={[{height:"50%",backgroundColor:"#D9D9D9",margin:10}]}
        ref={sign}
        onSaveEvent={_onSaveEvent}
        onDragEvent={_onDragEvent}
        saveImageFileInExtStorage={true}
        showNativeButtons={false}
        showTitleLabel={false}
        backgroundColor="#D9D9D9"
        strokeColor="#000000"
        minStrokeWidth={4}
        maxStrokeWidth={4}
        viewMode={"portrait"}/>

{/* <Image source={{ uri:getImage }} style={{ width: 100, height: 100, borderRadius: 100 }} /> */}

{/* <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
            <View style={{width:"90%",backgroundColor:"#3498DB",height:40,borderRadius:10,}}>
                <TouchableOpacity onPress={()=>handeClick()}>
                <View style={{width:"100%",flexDirection:"row",alignItems:"center",justifyContent:"center",height:"100%"}}>
                <View style={{width:"100%",flexDirection:"row",alignItems:"center",justifyContent:"center",height:"100%"}}>
                  <Text style={{color:"#fff",fontFamily:"Poppins-SemiBold"}}>Submit</Text>
                  </View>
                </View>
                </TouchableOpacity>
            </View>
    
        </View> */}

        {
           uploading ?
           <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <ActivityIndicator color="#000" size="large" />
           </View>
           :
           <>
             {
            state === true ?
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
            <View style={{width:"90%",backgroundColor:"#3498DB",height:40,borderRadius:10,}}>
                <TouchableOpacity onPress={()=>handleUpload()}>
                <View style={{width:"100%",flexDirection:"row",alignItems:"center",justifyContent:"center",height:"100%"}}>
                <View style={{width:"100%",flexDirection:"row",alignItems:"center",justifyContent:"center",height:"100%"}}>
                  <Text style={{color:"#fff",fontFamily:"Poppins-SemiBold"}}>Submit</Text>
                  </View>
                </View>
                </TouchableOpacity>
            </View>
        </View>
            :
            <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableHighlight style={styles.buttonStyle}
                onPress={() =>saveSign() } >
                <Text style={{color:"#000"}}>Save</Text>
            </TouchableHighlight>
    
            <TouchableHighlight style={styles.buttonStyle}
                onPress={() => resetSign()}>
                <Text style={{color:"#000"}}>Reset</Text>
            </TouchableHighlight>
    
        </View>
        }
           </>
        }
        </View>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  signature: {
      flex: 1,
      borderColor: '#D9D9D9',
      borderWidth: 1,
  },
  buttonStyle: {
      flex: 1, justifyContent: "center", alignItems: "center", height: 50,
      backgroundColor: "#D9D9D9",
      margin: 10
  }
});