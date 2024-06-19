import { View, Text,StatusBar, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery } from '@apollo/client'
import { QUERY_GET_USER_BY_ID, QUERY_GET_WAREHOUSE_BY_ID } from './Graphql/Query'
import LottieView from 'lottie-react-native';
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

export default function SplashScreen() {
   const{logOut} =  useContext(AuthContext)

  const [userId, setUserId] = useState();

  useEffect(() => {
    AsyncStorage.getItem('userId').then(id => setUserId(id), []);
  })

  const{data,loading}=useQuery(QUERY_GET_WAREHOUSE_BY_ID,{
    variables:{
      "warehouseId":`${userId}`
    }
  })

  return (
    <View style={{backgroundColor:"#fff",height:"100%"}}>
 <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" translucent={true} />
      <View style={{width:"100%",height:500}}>
      <LottieView source={require('../assets/anim/anim.json')} autoPlay loop />
      </View>
      {
         loading ?
         <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
         <Text style={{color:"#000",fontFamily:"Poppins-SemiBold",fontSize:15}}>Loading....</Text>
         </View>
         :
         <></>
      
      }
      {
         data && data.getWarehouseById === null ?
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
        <View style={{width:"50%",backgroundColor:"#3498db",height:40,borderRadius:10,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
          <TouchableOpacity onPress={()=>logOut()}>
          <View style={{width:"100%",backgroundColor:"#3498db",height:40,flexDirection:"row",alignItems:"center",justifyContent:"center",borderRadius:10}}>
            <View style={{width:"100%",backgroundColor:"#3498db",height:40,flexDirection:"row",alignItems:"center",justifyContent:"center",borderRadius:10}}>
          <Text style={{color:"#fff",fontSize:15,fontFamily:"Poppins-SemiBold"}}>Log out</Text>
          </View>
          </View>
          </TouchableOpacity>
        </View>
      </View>
         :
        <></>
      }
    
      


    </View>
  )
}