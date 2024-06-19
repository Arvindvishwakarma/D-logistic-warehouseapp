/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'react-moment';
import {useMutation, useQuery} from '@apollo/client';
import {MUTATION_ADD_BOOKING} from './Graphql/Mutation';
import {showMessage} from 'react-native-flash-message';
import DropDownPicker from 'react-native-dropdown-picker';
import { GET_AREA } from './Graphql/Query';
import { useEffect } from 'react';

export default function AddBooking({navigation, route}) {
  const {customerid,customerAddress} = route.params;

  console.log("customerAddress",customerAddress)

  const [mydate, setDate] = useState(new Date());
  const [displaymode, setMode] = useState('date');
  const [isDisplayDate, setShow] = useState(false);

  const [myTime, setTime] = useState(new Date());
  const [displaymodeTime, setModeTime] = useState('time');
  const [isDisplayTime, setShowTime] = useState(false);

  const [note, setNote] = useState('');
  const [address, setAddress] = useState(customerAddress);

  const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || mydate;
    setDate(currentDate);
    setShow(false);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const displayDatepicker = () => {
    showMode('date');
  };
  const changeSelectedTime = (event, selectedTime) => {
    const currentTime = selectedTime || myTime;
    setTime(currentTime);
    setShowTime(false);
  };
  const showModeTime = currentMode => {
    setShowTime(true);
    setModeTime(currentMode);
  };
  const displayTimepicker = () => {
    showModeTime('time');
  };

  const{data,loading} =useQuery(GET_AREA)
  console.log("data",data)
  
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
//   const [items, setItems] = useState([
//     { label: 'Afghanistan', value: 'Afghanistan' },]);

console.log("value",value)

const[items,setItems] =useState([])

   useEffect(()=>{
     data && data.getAllArea.map(item=>{
        return(
            setItems(items => [...items,{
                label:`${item.areaAddress}`,
                value:`${item.areaAddress}`
            }]) 
        )
      
     })
   },[data])

   console.log("items",items)


  const [createBooking] = useMutation(MUTATION_ADD_BOOKING);

  const handleClick = () => {
    if (note === '' || address === '') {
      showMessage({
        message: 'All Field Is Required',
        type: 'warning',
      });
    } else {
      createBooking({
        variables: {
          bookingInput: {
            customerId: `${customerid}`,
            allocation: `${address}`,
            notes: `${note}`,
            pickUpDate: `${mydate}`,
            pickUpTime: `${myTime}`,
            area: `${value}`
          },
        },
      });
      setNote('');
      setAddress('');
      showMessage({
        message: 'Booking Add Successfully',
        type: 'success',
      });
      navigation.navigate('PendingBooking');
    }
  };

  return (
    <View style={{backgroundColor: '#fff', height: '100%'}}>
      <ScrollView>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#3498DB"
          translucent={true}
        />
        <View
          style={{
            backgroundColor: '#3498DB',
            height: 200,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 70,
            }}>
            <View style={{flexDirection: 'row', width: '90%'}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={25} style={{color: '#fff'}} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Poppins-SemiBold',
                  color: '#fff',
                  marginLeft: 10,
                }}>
                Add Booking
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{width: '90%', marginTop: 10}}>
            <Text style={{fontFamily: 'Poppins-SemiBold', color: '#000'}}>
              Pickup Date
            </Text>
          </View>

          <View
            style={{
              width: '90%',
              marginTop: 10,
              backgroundColor: '#ecf0f1',
              borderRadius: 10,
            }}>
            <TouchableOpacity onPress={displayDatepicker}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  height: 50,
                }}>
                <View style={{width: '80%', justifyContent: 'center'}}>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: 'Poppins-SemiBold',
                      color: '#3498DB',
                    }}>
                    <Moment element={Text} format="DD-MM-YYYY">
                      {mydate}
                    </Moment>
                  </Text>
                </View>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Feather name="calendar" size={20} color="#3498DB" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{width: '90%', marginTop: 10}}>
            <Text style={{fontFamily: 'Poppins-SemiBold', color: '#000'}}>
              Pickup Time
            </Text>
          </View>

          <View
            style={{
              width: '90%',
              marginTop: 10,
              backgroundColor: '#ecf0f1',
              borderRadius: 10,
            }}>
            <TouchableOpacity onPress={displayTimepicker}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  height: 50,
                }}>
                <View style={{width: '80%', justifyContent: 'center'}}>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: 'Poppins-SemiBold',
                      color: '#3498DB',
                    }}>
                    <Moment element={Text} format="hh:mm A">
                      {myTime}
                    </Moment>
                  </Text>
                </View>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Feather name="clock" size={20} color="#3498DB" />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{width: '90%', marginTop: 10, borderRadius: 10}}>
            <View style={{width: '90%'}}>
              <Text style={{fontFamily: 'Poppins-SemiBold', color: '#000'}}>
                Notes
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                backgroundColor: '#ecf0f1',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <TextInput
                placeholder="Enter Notes..."
                multiline={true}
                numberOfLines={10}
                placeholderTextColor="#3498DB"
                onChangeText={e => setNote(e)}
                value={note}
                style={{color: '#3498DB'}}
              />
            </View>
          </View>

          <View style={{width: '90%', marginTop: 10, borderRadius: 10}}>
            <View style={{width: '90%'}}>
              <Text style={{fontFamily: 'Poppins-SemiBold', color: '#000'}}>
                Pick up Address
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                backgroundColor: '#ecf0f1',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <TextInput
                placeholder="Enter PickUp Address..."
                multiline={true}
                numberOfLines={5}
                placeholderTextColor="#3498DB"
                onChangeText={e => setAddress(e)}
                value={address}
                style={{color: '#3498DB'}}
              />
            </View>
            <View style={{width: '100%', marginTop: 15}}>
              {/* <Text style={{ marginBottom: 5, fontFamily: "Poppins-SemiBold", color: "#000" }}>Country</Text> */}
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select Area"
                listMode="MODAL"
              />
            </View>
          </View>

          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity onPress={() => handleClick()}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#3498DB',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: 50,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Poppins-SemiBold',
                      color: '#fff',
                    }}>
                    Add Booking
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {isDisplayDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={mydate}
          mode={displaymode}
          is24Hour={true}
          display="default"
          onChange={changeSelectedDate}
        />
      )}

      {isDisplayTime && (
        <DateTimePicker
          value={myTime}
          mode={displaymodeTime}
          is24Hour={true}
          display="default"
          onChange={changeSelectedTime}
        />
      )}
    </View>
  );
}
