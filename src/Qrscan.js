import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  Linking, Image, 
} from 'react-native'
import React, { useRef } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { showMessage } from 'react-native-flash-message';
import Feather from 'react-native-vector-icons/Feather';
import torch from "../assets/Icon/torch.png"
import torchOn from "../assets/Icon/torchOn.png"
import { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import RBSheet from 'react-native-raw-bottom-sheet';
import { TextInput } from 'react-native-paper';
import { useLazyQuery } from '@apollo/client';
import { GET_INVOICE_BY_INVOICE_NUMBER } from './Graphql/Query';

export default function Qrscan({ navigation }) {

  const [goNext, setGoNext] = useState(false);
  const [result, setResult] = useState('')

  const onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
    setResult(e.data)
    showMessage({
      message: 'QR find successfully.',
      type: 'success',
    });
    setGoNext(true);
  };

  const [torchCheck, setTorchCheck] = useState(false)


  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isTop, setIsTop] = useState(true);

  const startAnimation = toValue => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => {
      setIsTop(!isTop);
    })
  }

  useEffect(() => {
    startAnimation(isTop ? 1 : 0);
  }, [isTop]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Dimensions.get('window').height - 610],
    extrapolate: 'clamp'
  })


  const refRBSheet = useRef();
  
  const[invoiceNo,setInvoiceNo] =useState('')

  const[getInvoiceByInvoiceNo,{data,loading}] =  useLazyQuery(GET_INVOICE_BY_INVOICE_NUMBER)

  const handleClick =()=>{
    getInvoiceByInvoiceNo({
      variables:{
        "invoiceId": `${invoiceNo}`
      }
    }).then(()=>{

    })
   
    
  }


  console.log("data qr",data)


  if(data && data.getInvoiceByInvoiceNo != null){
    navigation.navigate('Successfull', ({ result: data && data.getInvoiceByInvoiceNo.id}))
  }

  if (goNext) {
    navigation.navigate('Successfull', ({ result: result }));
  }



  return (
    <>
    <QRCodeScanner
      onRead={onSuccess}
      reactivate={true}
      showMarker={true}
      flashMode={
        torchCheck === true ?
          RNCamera.Constants.FlashMode.torch
          :
          RNCamera.Constants.FlashMode.off
      }


      topContent={
        <>
          <View style={{ width: "80%", marginTop: 0 }}>
          

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Feather name="arrow-left" size={25} style={{ color: "#777" }} color="#777" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ fontSize: 18, fontFamily: "Poppins-SemiBold", color: "#000", marginLeft: 10 }}>Back</Text>
                </TouchableOpacity>
              </View>

              <View>
                {
                  torchCheck === true ?
                    <>
                      <TouchableOpacity onPress={() => setTorchCheck(false)}>
                        <Image source={torchOn} style={{ width: 30, height: 30 }} />
                      </TouchableOpacity>
                    </>
                    :
                    <>
                      <TouchableOpacity onPress={() => setTorchCheck(true)}>
                        <Image source={torch} style={{ width: 30, height: 30 }} />
                      </TouchableOpacity>
                    </>
                }
              </View>
            </View>
          </View>
          <Text  style={{color:"#000",marginTop:10,marginBottom:20}}>
            Please move Your Camera
            <Text style={styles.textBold}></Text> on the QR code .
          </Text>
        </>
      }

      bottomContent={
       <View>
        <View style={{width:"100%",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <View style={{width:"70%",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <TouchableOpacity  onPress={()=> refRBSheet.current.open()}>
        <View style={{width:"100%",flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#3498db",borderRadius:5}}>
          <Text style={{padding:10,color:"#ffff",fontFamily:"Poppins-SemiBold"}}>Update By Invoice No</Text>
        </View>
        </TouchableOpacity>
        </View>
        </View>

       </View>
      }
      customMarker={
        <View style={styles.container}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ width: 40, height: 40, borderLeftColor: "#E74C3C", borderLeftWidth: 2, borderTopColor: "#E74C3C", borderTopWidth: 2,   }}>
            </View>
            <View style={{ width: 40, height: 40, borderRightColor: "#E74C3C", borderRightWidth: 2, borderTopColor: "#E74C3C", borderTopWidth: 2,}}>
            </View>

          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", position: "absolute", bottom: 0 }}>
            <View style={{ width: 200, flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ width: 40, height: 40, borderBottomColor: "#E74C3C", borderBottomWidth: 2, borderLeftColor: "#E74C3C", borderLeftWidth: 2, }}>
              </View>
              <View style={{ width: 40, height: 40, borderBottomColor: "#E74C3C", borderBottomWidth: 2, borderRightColor: "#E74C3C", borderRightWidth: 2,   }}>
              </View>
            </View>
          </View>
          {/* <Animated.View style={[styles.square, { transform: [{ translateY }] }]}>
            <LinearGradient colors={['rgba(255, 148, 112, 0.3)', 'rgba(255, 148, 112, 0.0)',]} style={{ height: 70 }}  >
            </LinearGradient>
          </Animated.View> */}
        </View>
      }


    
    />
       < RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={400}
        openDuration={250}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          container: {
            backgroundColor: "#fff",
            borderTopStartRadius: 50,
            borderTopRightRadius: 50
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}>
        <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: 50 }}>
          
          <View style={{width:"90%"}}>
            <TextInput 
              mode="outlined"
              label="Invoice No"
              placeholder="Invoice No.."
              keyboardType='numeric'
              onChangeText={(e)=>setInvoiceNo(e)}
              value={invoiceNo}
              />
          </View>
          <TouchableOpacity onPress={()=>handleClick()}>
        <View style={{width:250,flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#3498db",height:50,marginTop:20,borderRadius:10}}>
          <View style={{width:"100%",flexDirection:"column",alignItems:"center",justifyContent:"center",height:50}}>
            <View style={{width:"100%",flexDirection:"column",alignItems:"center",justifyContent:"center",height:50}}>
         <Text style={{color:"#fff",fontSize:16,fontFamily:"Poppins-SemiBold"}}>Submit</Text>
         </View>
         </View>
        </View>
        </TouchableOpacity>
        {
          data && data.getInvoiceByInvoiceNo === null ?
          <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:30}}>
           <Text style={{color:"#fff",fontSize:12,fontFamily:"Poppins-SemiBold",color:"red"}}>No Invoice Found</Text>
          </View>

          :
          <></>



        }

        </View>
      </RBSheet >

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    overflow: "hidden"
  },
  square: {
    width: 200,
    height: 70,
    borderTopColor: "#E74C3C",
    borderTopWidth: 2

  }
});