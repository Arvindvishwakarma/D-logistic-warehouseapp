/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { AuthContext } from '../context/AuthContext'
import React, { useContext, useEffect, useState } from 'react'
import SignUp from "../SignUp"
import Home from '../Home'
import Invoice from '../Invoice'
import Payment from '../Payment'
import Customer from '../Customer'
import Booking from '../Booking'
import Qrscan from '../Qrscan'
import Profile from '../Profile'
import Successfull from '../Successfull'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddCustomer from '../AddCustomer'
import AddInvoice from '../AddInvoice'
import FreetownLogin from '../Freetown/FreetownLogin'
import FreetownHome from '../Freetown/FreetownHome'
import FreetownInvoice from '../Freetown/FreetownInvoice'
import InvoiceDetail from '../InvoiceDetail'
import EditCustomer from '../EditCustomer'
import AddBooking from '../AddBooking'
import PendingBooking from '../PendingBooking'
import AddCollectionBoy from '../AddCollectionBoy'
import SplashScreen from '../SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@apollo/client';
import AddFreetownBoy from '../Freetown/AddFreetownBoy';
import Freetown from '../Freetown';
import Deliverd from '../Deliverd';
import OnWayBooking from '../OnWayBooking';
import PickUpBooking from '../PickUpBooking';
import Warehouse from '../Warehouse';
import Container from '../Container';
import { QUERY_GET_USER_BY_ID, QUERY_GET_WAREHOUSE_BY_ID } from '../Graphql/Query'
import SelectCustomer from '../SelectCustomer'
import AddCustomerInvoice from '../AddCustomerInvoice'



const Stack = createNativeStackNavigator();
export default function AuthStack() {

  const { userInfo } = useContext(AuthContext);

  const [userId, setUserId] = useState();

  useEffect(() => {
    AsyncStorage.getItem('userId').then(id => setUserId(id), []);
  });

  const { data, loading } = useQuery(QUERY_GET_WAREHOUSE_BY_ID, {
    variables: {
      "warehouseId": `${userId}`
    },
  });

  console.log("data", data)

  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal' }}  >
        {
          loading ?
            (
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
            )
            :
            data && data.getWarehouseById === null ?
              (
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
              )
              :
              userInfo ?
                (
                  data && data.getWarehouseById.role === "WareHouse_London" ?
                    (
                      <>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Invoice" component={Invoice} />
                        <Stack.Screen name="Payment" component={Payment} />
                        <Stack.Screen name="Customer" component={Customer} />
                        <Stack.Screen name="Booking" component={Booking} />
                        <Stack.Screen name="Qrscan" component={Qrscan} />
                        <Stack.Screen name="Profile" component={Profile} />
                        <Stack.Screen name="Successfull" component={Successfull} />
                        <Stack.Screen name="AddCustomer" component={AddCustomer} />
                        <Stack.Screen name="AddInvoice" component={AddInvoice} />
                        <Stack.Screen name="AddBooking" component={AddBooking} />
                        <Stack.Screen name="PendingBooking" component={PendingBooking} />
                        <Stack.Screen name="AddCollectionBoy" component={AddCollectionBoy} />
                        <Stack.Screen name="Freetown" component={Freetown} />
                        <Stack.Screen name="Deliverd" component={Deliverd} />
                        <Stack.Screen name="OnWayBooking" component={OnWayBooking} />
                        <Stack.Screen name="PickUpBooking" component={PickUpBooking} />
                        <Stack.Screen name="Warehouse" component={Warehouse} />
                        <Stack.Screen name="Container" component={Container} />
                        <Stack.Screen name="FreetownInvoice" component={FreetownInvoice} />
                        <Stack.Screen name="InvoiceDetail" component={InvoiceDetail} />
                        <Stack.Screen name="EditCustomer" component={EditCustomer} />
                        <Stack.Screen name="AddFreetownBoy" component={AddFreetownBoy} />
                        <Stack.Screen name="AddCustomerInvoice" component={AddCustomerInvoice} />
                        <Stack.Screen name="SelectCustomer" component={SelectCustomer} />
                        <Stack.Screen name="SignUp" component={SignUp} />
                      </>
                    )
                    :
                    data && data.getWarehouseById.role === "WareHouse_Freetown" ?
                      (
                        <>
                          <Stack.Screen name="FreetownHome" component={FreetownHome} />
                          <Stack.Screen name="Invoice" component={Invoice} />
                          <Stack.Screen name="Payment" component={Payment} />
                          <Stack.Screen name="Customer" component={Customer} />
                          <Stack.Screen name="Booking" component={Booking} />
                          <Stack.Screen name="Qrscan" component={Qrscan} />
                          <Stack.Screen name="Profile" component={Profile} />
                          <Stack.Screen name="Successfull" component={Successfull} />
                          <Stack.Screen name="AddCustomer" component={AddCustomer} />
                          <Stack.Screen name="AddInvoice" component={AddInvoice} />
                          <Stack.Screen name="AddBooking" component={AddBooking} />
                          <Stack.Screen name="PendingBooking" component={PendingBooking} />
                          <Stack.Screen name="AddCollectionBoy" component={AddCollectionBoy} />
                          <Stack.Screen name="Freetown" component={Freetown} />
                          <Stack.Screen name="Deliverd" component={Deliverd} />
                          <Stack.Screen name="OnWayBooking" component={OnWayBooking} />
                          <Stack.Screen name="PickUpBooking" component={PickUpBooking} />
                          <Stack.Screen name="Warehouse" component={Warehouse} />
                          <Stack.Screen name="Container" component={Container} />
                          <Stack.Screen name="FreetownInvoice" component={FreetownInvoice} />
                          <Stack.Screen name="InvoiceDetail" component={InvoiceDetail} />
                          <Stack.Screen name="EditCustomer" component={EditCustomer} />
                          <Stack.Screen name="AddFreetownBoy" component={AddFreetownBoy} />
                          <Stack.Screen name="SignUp" component={SignUp} />
                        </>
                      ) :
                      (
                        <>
                          <Stack.Screen name="SplashScreen" component={SplashScreen} />
                        </>
                      )
                )
                :
                (
                  <>
                    <Stack.Screen name="SignUp" component={SignUp} />
                  </>
                )
        }




      </Stack.Navigator>
    </NavigationContainer>
  )
}