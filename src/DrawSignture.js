/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { View, Text ,StyleSheet,TouchableHighlight,TouchableOpacity,Image} from 'react-native'
import React, { createRef ,useRef,useEffect} from 'react'
import SignatureCapture from 'react-native-signature-capture';
import Feather from 'react-native-vector-icons/Feather';
import { decode } from "base64-arraybuffer";
import fs from "react-native-fs";
import ImagePicker from 'react-native-image-crop-picker';
import { MUTATION_EDIT_INVOICE } from './Graphql/Mutation';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_GET_INVIOCE_FREETOWN_ON_WAY, QUERY_GET_INVOICE_FREETOWN_DELIVERED } from './Graphql/Query';
import { useState } from 'react';
import { showMessage } from 'react-native-flash-message';



export default function DrawSignture({navigation,route}) {

    const{invoiceId} =route.params;

    console.log("invoiceId",invoiceId)


    const [editInvoice, { loading: invoiceLoding }] = useMutation(MUTATION_EDIT_INVOICE, {
        refetchQueries: [
       QUERY_GET_INVIOCE_FREETOWN_ON_WAY,
       "getInvoiceByCollectionBoyFreetownIdonWay",
       QUERY_GET_INVOICE_FREETOWN_DELIVERED,
       "getInvoiceByCollectionBoyFreetownIdonDelivered"
        ]
      })

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

    const [profileImg, setProfileImg] = useState('')
    const handleProfilePick = () => {
      ImagePicker.openPicker({
        width: 320,
        height: 350,
        cropping: true
      }).then(image => {
        console.log(image);
        setProfileImg(image.path)
        // function call
       
  
      });
    }

    console.log("profileImg",profileImg)

    const[getImage,setGetImage] =useState()

    const[getName,setGetName] =useState()

    console.log("path",getImage)


    const handleUpload = async () => {
      
        var S3 = require("aws-sdk/clients/s3");
        const BUCKET_NAME = "byaahlagan-profile-image";
        const IAM_USER_KEY = "AKIA6GB4RFKTDTDA6E2O";
        const IAM_USER_SECRET = "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";
    
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
                    "invoiceId": `${invoiceId}`,
                     "imgQR":`${uniqueName}`,
                     "status": "Delivered"
                  }
                  }
      
             })
             showMessage({
              message: "Upload Successfully Please Wait",
              type: "success",
            });
            navigation.navigate("FreetownOnWayBooking")
            }
          })
        });
      }


      function handeClick(){
      
      }

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
    <View style={{height:"100%", flexDirection: "column" }}>
    <View style={{backgroundColor:"#3498DB",height:200,borderBottomLeftRadius:30,borderBottomRightRadius:30}}>
       
       <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:70}}>
       <View style={{flexDirection:"row",width:"90%"}}>
         <TouchableOpacity onPress={()=>navigation.goBack()}>
       <Feather name="arrow-left" size={25} style={{color:"#fff"}}/>
       </TouchableOpacity>
       <Text style={{fontSize:18,fontFamily:"Poppins-SemiBold",color:"#fff",marginLeft:10}}>Draw Your Signature Here</Text>
       </View>
       </View>
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
                <Text>Save</Text>
            </TouchableHighlight>
    
            <TouchableHighlight style={styles.buttonStyle}
                onPress={() => resetSign()  } >
                <Text>Reset</Text>
            </TouchableHighlight>
    
        </View>

        }
 
  

 


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