/* eslint-disable jsx-quotes */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, StatusBar, TouchableOpacity, ScrollView, Image, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState,useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { Card, TextInput, useTheme } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { useMutation, useQuery } from '@apollo/client';
import { MUTATION_ADD_INVOICE, MUTATION_EMAIL } from './Graphql/Mutation';
import { showMessage } from 'react-native-flash-message';
import { GET_AREA } from './Graphql/Query';
import moment from 'moment';

export default function AddInvoice({ navigation,route }) {

  const{customerId,bookingId,bookingUniqueId} =route.params;
  
  console.log("customerId",customerId)
  console.log("bookingId",bookingId)
  console.log("bookingUniqueId",bookingUniqueId)


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Afghanistan', value: 'Afghanistan' },
    { label: 'Albania', value: 'Albania' },
    { label: 'Algeria', value: 'Algeria' },
    { label: 'Andorra', value: 'Andorra' },
    { label: 'Angola', value: 'Angola' },
    { label: 'Anguilla', value: 'Anguilla' },
    { label: 'Antigua Barbuda', value: 'Antigua Barbuda' },
    { label: 'Argentina', value: 'Argentina' },
    { label: 'Armenia', value: 'Armenia' },
    { label: 'Aruba', value: 'Aruba' },
    { label: 'Australia', value: 'Australia' },
    { label: 'Austria', value: 'Austria' },
    { label: 'Azerbaijan', value: 'Azerbaijan' },
    { label: 'Bahamas', value: 'Bahamas' },
    { label: 'Bahrain', value: 'Bahrain' },
    { label: 'Bangladesh', value: 'Bangladesh' },
    { label: 'Barbados', value: 'Barbados' },
    { label: 'Belarus', value: 'Belarus' },
    { label: 'Belgium', value: 'Belgium' },
    { label: 'Belize', value: 'Belize' },
    { label: 'Benin', value: 'Benin' },
    { label: 'Bermuda', value: 'Bermuda' },
    { label: 'Bhutan', value: 'Bhutan' },
    { label: 'Bolivia', value: 'Bolivia' },
    { label: 'Bosnia Herzegovina', value: 'Bosnia Herzegovina' },
    { label: 'Botswana', value: 'Botswana' },
    { label: 'Brazil', value: 'Brazil' },
    { label: 'British Virgin Islands', value: 'British Virgin Islands' },
    { label: 'Brunei', value: 'Brunei' },
    { label: 'Bulgaria', value: 'Bulgaria' },
    { label: 'Burkina Faso', value: 'Burkina Faso' },
    { label: 'Burundi', value: 'Burundi' },
    { label: 'Cambodia', value: 'Cambodia' },
    { label: 'Cape Verde', value: 'Cape Verde' },
    { label: 'Cayman Islands', value: 'Cayman Islands' },
    { label: 'Chad', value: 'Chad' },
    { label: 'Chile', value: 'Chile' },
    { label: 'China', value: 'China' },
    { label: 'Colombia', value: 'Colombia' },
    { label: 'Congo', value: 'Congo' },
    { label: 'Cook Islands', value: 'Cook Islands' },
    { label: 'Costa Rica', value: 'Costa Rica' },
    { label: 'Cote D Ivoire', value: 'Cote D Ivoire' },
    { label: 'Croatia', value: 'Croatia' },
    { label: 'Cruise Ship', value: 'Cruise Ship' },
    { label: 'Cuba', value: 'Cuba' },
    { label: 'Cyprus', value: 'Cyprus' },
    { label: 'Czech Republic', value: 'Czech Republic' },
    { label: 'Denmark', value: 'Denmark' },
    { label: 'Djibouti', value: 'Djibouti' },
    { label: 'Dominica', value: 'Dominica' },
    { label: 'Dominican Republic', value: 'Dominican Republic' },
    { label: 'Ecuador', value: 'Ecuador' },
    { label: 'Egypt', value: 'Egypt' },
    { label: 'El Salvador', value: 'El Salvador' },
    { label: 'Equatorial Guinea', value: 'Equatorial Guinea' },
    { label: 'Estonia', value: 'Estonia' },
    { label: 'Ethiopia', value: 'Ethiopia' },
    { label: 'Falkland Islands', value: 'Falkland Islands' },
    { label: 'Faroe Islands', value: 'Faroe Islands' },
    { label: 'Fiji', value: 'Fiji' },
    { label: 'Finland', value: 'Finland' },
    { label: 'France', value: 'France' },
    { label: 'French Polynesia', value: 'French Polynesia' },
    { label: 'French West Indies', value: 'French West Indies' },
    { label: 'Gabon', value: 'Gabon' },
    { label: 'Gambia', value: 'Gambia' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Germany', value: 'Germany' },
    { label: 'Ghana', value: 'Ghana' },
    { label: 'Gibraltar', value: 'Gibraltar' },
    { label: 'Greece', value: 'Greece' },
    { label: 'Greenland', value: 'Greenland' },
    { label: 'Grenada', value: 'Grenada' },
    { label: 'Guam', value: 'Guam' },
    { label: 'Guatemala', value: 'Guatemala' },
    { label: 'Guernsey', value: 'Guernsey' },
    { label: 'Guinea', value: 'Guinea' },
    { label: 'Guinea Bissau', value: 'Guinea Bissau' },
    { label: 'Guyana', value: 'Guyana' },
    { label: 'Haiti', value: 'Haiti' },
    { label: 'Honduras', value: 'Honduras' },
    { label: 'Hong Kong', value: 'Hong Kong' },
    { label: 'Hungary', value: 'Hungary' },
    { label: 'Iceland', value: 'Iceland' },
    { label: 'India', value: 'India' },
    { label: 'Indonesia', value: 'Indonesia' },
    { label: 'Iran', value: 'Iran' },
    { label: 'Iraq', value: 'Iraq' },
    { label: 'Ireland', value: 'Ireland' },
    { label: 'Isle of Man', value: 'Isle of Man' },
    { label: 'Israel', value: 'Israel' },
    { label: 'Italy', value: 'Italy' },
    { label: 'Jamaica', value: 'Jamaica' },
    { label: 'Japan', value: 'Japan' },
    { label: 'Jersey', value: 'Jersey' },
    { label: 'Jordan', value: 'Jordan' },
    { label: 'Kazakhstan', value: 'Kazakhstan' },
    { label: 'Kenya', value: 'Kenya' },
    { label: 'Kuwait', value: 'Kuwait' },
    { label: 'Kyrgyz Republic', value: 'Kyrgyz Republic' },
    { label: 'Laos', value: 'Laos' },
    { label: 'Latvia', value: 'Latvia' },
    { label: 'Lebanon', value: 'Lebanon' },
    { label: 'Lesotho', value: 'Lesotho' },
    { label: 'Liberia', value: 'Liberia' },
    { label: 'Libya', value: 'Libya' },
    { label: 'Liechtenstein', value: 'Liechtenstein' },
    { label: 'Lithuania', value: 'Lithuania' },
    { label: 'Luxembourg', value: 'Luxembourg' },
    { label: 'Macau', value: 'Macau' },
    { label: 'Macedonia', value: 'Macedonia' },
    { label: 'Madagascar', value: 'Madagascar' },
    { label: 'Malawi', value: 'Malawi' },
    { label: 'Malaysia', value: 'Malaysia' },
    { label: 'Maldives', value: 'Maldives' },
    { label: 'Mali', value: 'Mali' },
    { label: 'Malta', value: 'Malta' },
    { label: 'Mauritania', value: 'Mauritania' },
    { label: 'Mauritius', value: 'Mauritius' },
    { label: 'Mexico', value: 'Mexico' },
    { label: 'Moldova', value: 'Moldova' },
    { label: 'Monaco', value: 'Monaco' },
    { label: 'Mongolia', value: 'Mongolia' },
    { label: 'Montenegro', value: 'Montenegro' },
    { label: 'Montserrat', value: 'Montserrat' },
    { label: 'Morocco', value: 'Morocco' },
    { label: 'Mozambique', value: 'Mozambique' },
    { label: 'Namibia', value: 'Namibia' },
    { label: 'Nepal', value: 'Nepal' },
    { label: 'Netherlands', value: 'Netherlands' },
    { label: 'Netherlands Antilles', value: 'Netherlands Antilles' },
    { label: 'New Caledonia', value: 'New Caledonia' },
    { label: 'New Zealand', value: 'New Zealand' },
    { label: 'Nicaragua', value: 'Nicaragua' },
    { label: 'Niger', value: 'Niger' },
    { label: 'Nigeria', value: 'Nigeria' },
    { label: 'Norway', value: 'Norway' },
    { label: 'Oman', value: 'Oman' },
    { label: 'Pakistan', value: 'Pakistan' },
    { label: 'Palestine', value: 'Palestine' },
    { label: 'Panama', value: 'Panama' },
    { label: 'Papua New Guinea', value: 'Papua New Guinea' },
    { label: 'Paraguay', value: 'Paraguay' },
    { label: 'Peru', value: 'Peru' },
    { label: 'Philippines', value: 'Philippines' },
    { label: 'Poland', value: 'Poland' },
    { label: 'Portugal', value: 'Portugal' },
    { label: 'Puerto Rico', value: 'Puerto Rico' },
    { label: 'Qatar', value: 'Qatar' },
    { label: 'Reunion', value: 'Reunion' },
    { label: 'Romania', value: 'Romania' },
    { label: 'Russia', value: 'Russia' },
    { label: 'Rwanda', value: 'Rwanda' },
    { label: 'Saint Pierre Miquelon', value: 'Saint Pierre Miquelon' },
    { label: 'Samoa', value: 'Samoa' },
    { label: 'San Marino', value: 'San Marino' },
    { label: 'Satellite', value: 'Satellite' },
    { label: 'Saudi Arabia', value: 'Saudi Arabia' },
    { label: 'Senegal', value: 'Senegal' },
    { label: 'Serbia', value: 'Serbia' },
    { label: 'Seychelles', value: 'Seychelles' },
    { label: 'Sierra Leone', value: 'Sierra Leone' },
    { label: 'Singapore', value: 'Singapore' },
    { label: 'Slovakia', value: 'Slovakia' },
    { label: 'South Africa', value: 'South Africa' },
    { label: 'South Korea', value: 'South Korea' },
    { label: 'Spain', value: 'Spain' },
    { label: 'Sri Lanka', value: 'Sri Lanka' },
    { label: 'St Kitts Nevis', value: 'St Kitts Nevis' },
    { label: 'St Lucia', value: 'St Lucia' },
    { label: 'St Vincent', value: 'St Vincent' },
    { label: 'St. Lucia', value: 'St. Lucia' },
    { label: 'Sudan', value: 'Sudan' },
    { label: 'Suriname', value: 'Suriname' },
    { label: 'Swaziland', value: 'Swaziland' },
    { label: 'Sweden', value: 'Sweden' },
    { label: 'Switzerland', value: 'Switzerland' },
    { label: 'Syria', value: 'Syria' },
    { label: 'Taiwan', value: 'Taiwan' },
    { label: 'Tajikistan', value: 'Tajikistan' },
    { label: 'Tanzania', value: 'Tanzania' },
    { label: 'Thailand', value: 'Thailand' },
    { label: "Timor L'Este", value: "Timor L'Este" },
    { label: "Togo", value: "Togo" },
    { label: "Tonga", value: "Tonga" },
    { label: "Trinidad Tobago", value: "Trinidad Tobago" },
    { label: "Tunisia", value: "Tunisia" },
    { label: "Turkey", value: "Turkey" },
    { label: "Turkmenistan", value: "Turkmenistan" },
    { label: "Turks Caicos", value: "Turks Caicos" },
    { label: "Uganda", value: "Uganda" },
    { label: "Ukraine", value: "Ukraine" },
    { label: "United Arab Emirates", value: "United Arab Emirates" },
    { label: "United Kingdom", value: "United Kingdom" },
    { label: "Uruguay", value: "Uruguay" },
    { label: "Uzbekistan", value: "Uzbekistan" },
    { label: "Venezuela", value: "Venezuela" },
    { label: "Vietnam", value: "Vietnam" },
    { label: "Virgin Islands (US)", value: "Virgin Islands (US)" },
    { label: "Yemen", value: "Yemen" },
    { label: "Zambia", value: "Zambia" },
    { label: "Zimbabwe", value: "Zimbabwe" },
  ]);
  const theme = useTheme();

  const itemIdGen = Math.floor(1000 + Math.random() * 9000);

  const [formValues3, setFormValues3] = useState([{ itemId: itemIdGen, itemType: "", itemDescription: "", height: "", length: "", weight: "", quantity: "", costPerItem: "0", ItemDeliveredDateAndTime: "null", ItemStatus: "null", containerNo: "null" }]);
  let addFormFields = () => {
    setFormValues3([...formValues3, { itemId: itemIdGen, itemType: "", itemDescription: "",height: "", length: "", weight: "", quantity: "", costPerItem: "0", ItemDeliveredDateAndTime: "null", ItemStatus: "null", containerNo: "null" }]);
  };

  let handleChange = (e, i, nameValue) => {
    let newFormValues = [...formValues3];
    newFormValues[i][nameValue] = e;
    setFormValues3(newFormValues);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues3];
    newFormValues.splice(i, 1);
    setFormValues3(newFormValues);
  };

  console.log("formValues3",formValues3)

  const [recipientName, setRecipentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [postCode, setPostCode] = useState("");

  const customerIdGen = Math.floor(1000 + Math.random() * 9000);
  const containerIdGen = Math.floor(1000 + Math.random() * 9000);
  const invoiceNimber = Math.floor(1000 + Math.random() * 9000);

  const [createInvoice, { loading }] = useMutation(MUTATION_ADD_INVOICE)

  const getTotal = () => {
    let total = 0;
    formValues3 &&
    formValues3.map((item) => {
        total = total + parseInt(item.costPerItem);
      });
    return total;
  };

  
  const[createMail] = useMutation(MUTATION_EMAIL)
const today = moment();


 const htmlContext = `<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
     <title>Invoice details</title>
     <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
     
     <body style="margin: 0; padding: 0; background-color:#eaeced " bgcolor="#eaeced">
      <table bgcolor="#eaeced" cellpadding="0" cellspacing="0" width="100%" style="background-color: #eaeced; ">
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
       <tr>
        <td>
         
          <table align="center" bgcolor="#ffffff" cellpadding="20" cellspacing="0" width="600" 
                 style="border-collapse: collapse; background-color: #ffffff; border: 1px solid #f0f0f0;">
            <tr style="border-top: 4px solid #ff0000;">
             <td align="left" style="padding: 15px 20px 20px;">
               <table width="100%">
                 <tr>
                   <td><img style="width: 200px;" src='https://growhealthproimg.s3.ap-south-1.amazonaws.com/logo.jpeg' width="220px" alt="Company Logo"/></td>
                   <td align="right" style="font-family: 'Open Sans',Helvetica,Arial,sans-serif;">
                     <span>Inovice no: #${invoiceNimber}</span><br>
                     <span style="padding: 5px 0; display: block;">${today.format('DD-MM-YYYY')}</span>
                   </td>
                 </tr>
               </table>
              
             </td>
            </tr>
            <tr>
             <td align="center" style="padding: 20px; border-top: 1px solid #f0f0f0; background: #fafafa; font-family: 'Open Sans',Helvetica,Arial,sans-serif; ">
        <table  style="font-size:15px; font-family: 'Open Sans',Helvetica,Arial,sans-serif; border:2px solid #000;padding:2px">
          <thead>
            <tr  >
                 <th style="border: 1px solid #000; padding:10px">SR No.</th>
                     <th  style="border: 1px solid #000;padding:10px">Item No</th>
                     <th  style="border: 1px solid #000; padding:10px">Item Type</th>
                     <th  style="border: 1px solid #000 ; padding:10px">Cost Per Item</th>
                     <th  style="border: 1px solid #000; padding:10px">Status</th>
            </tr>
          </thead>
           <tbody>
           ${
            formValues3 && formValues3.map((item,index)=>{
              return(
                `
                <tr>
                <td style="border: 1px solid #000; padding:5px">${index+1}</td>
               <td style="border: 1px solid #000; padding:5px">${item.itemId}</td>
                    <td style="border: 1px solid #000; padding:5px">${item.itemType}</td>
                    <td style="border: 1px solid #000; padding:5px">${item.costPerItem}</td>
                  <td style="border: 1px solid #000; padding:5px">${item.ItemStatus}</td>
             </tr>

                `
              )

            })
           }
          </tbody>
               </table>
               <br></br>
              <div>Total Payment:</div>
              <h2 style="margin: 10px 0; color: #333; font-weight: 500; font-size: 48px;">
                 $${getTotal()}
              </h2>
               <div style="line-height: 1.4; font-size: 1.2; font-size: 14px; color: #777;">For Rockel Shipping company, Issued on ${today.format('DD-MM-YYYY')}7<br>by Rockel Shipping company</div>
             </td>
            </tr>
            <tr>
             <td align="center" style="padding: 20px 40px; font-family: 'Open Sans',Helvetica,Arial,sans-serif;font-size: 16px;line-height: 1.4;color: #333;">
                  <div>Pending</div>
               <div>Note: Track your delivery 👇 </div>
               <div><br></div>
               <div style="background: #ff0000; display: inline-block;padding: 15px 25px; color: #fff; border-radius: 6px">
                 <a href=${`https://rockel.netlify.app/TrackBooking/${customerId}`} style="text-decoration:none;color:#fff">View More Detail</a>
               </div>
               <div style="color: #777; padding: 5px;"> date ${today.format('DD-MM-YYYY')}</div>
               <div><br></div>
             </td>
            </tr>
            <tr style="border-top: 1px solid #eaeaea;">
              <td align="center">
                <div style="font-family: 'Open Sans',Helvetica,Arial,sans-serif;font-size: 14px;line-height: 1.4;color: #777;">
                 Regards,<br>
                 Rockel Shipping company
               </div>
              </td>
            </tr>
          </table>
          
        </td>
       </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
      </table>
     </body>
     
   </html>`;

  function handleClick() {
    let date = new Date()
  if(recipientName === ""|| email === "" || phone1 ==="" ||address1===""  ||postCode === "" || valueArea === "" || valueArea2 ==="" || formValues3[0].itemType === "" || formValues3[0].itemDescription === "" || formValues3[0].height === "" || formValues3[0].length === "" || formValues3[0].weight === "" ||  formValues3[0].quantity === "" ||  formValues3[0].costPerItem === "0" ){
    showMessage({
      message: " '*' these are Fields  required",
      type: "warning",
    });
   }
 else if(!email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)){
    showMessage({
      message: "Email Id is not correct",
      type: "warning",
    })
  }
  else if(bookingId ===  undefined || bookingUniqueId ===  undefined  ){
    createInvoice({
      variables: {
        "invoiceInput": {
          "customerId": `${customerId}`,
          "recipientName": `${recipientName}`,
          "email": `${email}`,
          "phoneOne": `${phone1}`,
          "phoneTwo": `${phone2}`,
          "addressOne": `${address1}`,
          "addressTwo": `${address2}`,
          "postCode": `${postCode}`,
          "items": formValues3,
          "area": `${valueArea}`,
          "paymentType":`${valueArea2}`,
          "status": "Warehouse_London",
          "warehousePickupDateAndTime":`${date}`
        }
      }
    }).then(function(){
      createMail({
        variables:{
          "email": `${email}`,
          "subject": "rockel Shipping Company",
          "text": "Invoice",
          "userName": "null",
          "img": "null",
          "logo": "null",
          "htmlContext": `${htmlContext}`
        }
      })
    })
    showMessage({
      message: "Invoice Add Successfully",
      type: "success",
    });
    navigation.navigate("Invoice")

  }
  
  else{
    createInvoice({
      variables: {
        "invoiceInput": {
          "customerId": `${customerId}`,
          "bookingId":  `${bookingId}`,
          "bookingNo":    `${bookingUniqueId}`,
          "recipientName": `${recipientName}`,
          "email": `${email}`,
          "phoneOne": `${phone1}`,
          "phoneTwo": `${phone2}`,
          "addressOne": `${address1}`,
          "addressTwo": `${address2}`,
          "postCode": `${postCode}`,
          "items": formValues3,
          "area": `${valueArea}`,
          "paymentType":`${valueArea2}`,
          "status": "pending",
         
        }
      }
    }).then(function(){
      createMail({
        variables:{
          "email": `${email}`,
          "subject": "rockel Shipping Company",
          "text": "Invoice",
          "userName": "null",
          "img": "null",
          "logo": "null",
          "htmlContext": `${htmlContext}`
        }
      })
    })
    showMessage({
      message: "Invoice Add Successfully",
      type: "success",
    });
    navigation.navigate("Invoice")
  }  
  }


  const{data,loading:loadingArea} =useQuery(GET_AREA)
  console.log("data",data)
  
  const [openArea, setOpenArea] = useState(false);
  const [valueArea, setValueArea] = useState(null);
  const[itemsArea,setItemsArea] =useState([])

  const [openArea2, setOpenArea2] = useState(false);
  const [valueArea2, setValueArea2] = useState(null);
  const[itemsArea2,setItemsArea2] =useState([ 
  { label: 'Cash', value: 'Cash' },
  { label: 'Online', value: 'Online' },
  { label: 'Due', value: 'Due' },
 ])

  useEffect(()=>{
    data && data.getAllArea.map(item=>{
       return(
           setItemsArea(items => [...items,{
               label:`${item.areaName}`,
               value:`${item.areaName}`
           }]) 
       )
     
    })
  },[data])



  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <ScrollView>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#3498DB" translucent={true} />
        <View style={{ backgroundColor: "#3498DB", height: 200, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>

          <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 70 }}>
            <View style={{ flexDirection: "row", width: "90%" }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={25} style={{ color: "#fff" }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, fontFamily: "Poppins-SemiBold", color: "#fff", marginLeft: 10 }}>Add Invoice</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

          <View style={{ width: "90%", marginTop: 10 }}>
            <TextInput
              mode="outlined"
              label="Recipient Name *"
              placeholder="Recipient Name *"
              onChangeText={(e) => setRecipentName(e)}
              value={recipientName} />
          </View>

          <View style={{ width: "90%", marginTop: 10 }}>
            <TextInput
              mode="outlined"
              label="Email *"
              placeholder="Email *"
              onChangeText={(e) => setEmail(e)}
              value={email} />
          </View>


          <View style={{ width: "90%", marginTop: 10 }}>
            <TextInput
              mode="outlined"
              label="Phone 1 *"
              placeholder="Phone 1 *"
              onChangeText={(e) => setPhone1(e)}
              value={phone1}
              keyboardType='number-pad'
            />
          </View>

          <View style={{ width: "90%", marginTop: 10 }}>
            <TextInput
              mode="outlined"
              label="Phone 2"
              placeholder="Phone 2"
              onChangeText={(e) => setPhone2(e)}
              value={phone2}
              keyboardType='number-pad'
            />
          </View>

          <View style={{ width: "90%", marginTop: 10 }}>
            <TextInput
              mode="outlined"
              label="Address 1 *"
              placeholder="Address 1 *"
              multiline={true}
              numberOfLines={4}
              onChangeText={(e) => setAddress1(e)}
              value={address1}
            />
          </View>

          <View style={{ width: "90%", marginTop: 10 }}>
            <TextInput
              mode="outlined"
              label="Address 2"
              placeholder="Address 2"
              multiline={true}
              numberOfLines={4}
              onChangeText={(e) => setAddress2(e)}
              value={address2}
            />
          </View>

          <View style={{ width: "90%", marginTop: 10 }}>
            <TextInput
              mode="outlined"
              label="Post Code *"
              placeholder="Post Code *"
              onChangeText={(e) => setPostCode(e)}
              value={postCode}
              keyboardType='number-pad'
            />
          </View>

          <View style={{ width: "90%", marginTop: 15 }}>
            {/* <Text style={{ marginBottom: 5, fontFamily: "Poppins-SemiBold", color: "#000" }}>Country</Text> */}
            <DropDownPicker
              open={openArea}
              value={valueArea}
              items={itemsArea}
              setOpen={setOpenArea}
              setValue={setValueArea}
              setItems={setItemsArea}
              placeholder="Select Area *"
              listMode="MODAL"
            />
          </View>
          <View style={{ width: "90%", marginTop: 15 }}>
            {/* <Text style={{ marginBottom: 5, fontFamily: "Poppins-SemiBold", color: "#000" }}>Country</Text> */}
            <DropDownPicker
              open={openArea2}
              value={valueArea2}
              items={itemsArea2}
              setOpen={setOpenArea2}
              setValue={setValueArea2}
              setItems={setItemsArea2}
              placeholder="Select Payment Type *"
              listMode="MODAL"
            />
          </View>

      

          <View style={{ width: "100%", marginTop: 10, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 18, fontFamily: "Poppins-SemiBold", color: "#000" }}>Add Item</Text>
            <View style={{ width: "95%" }}>
              {
                formValues3.map((input, key) => (

                  <View style={{ backgroundColor: "#D9D9D9", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: 10, marginTop: 15 }}>

                    <View style={{ width: "90%", marginTop: 10 }}>
                      <TextInput
                        mode="outlined"
                        label="Item Type *"
                        placeholder="Item Type *"
                        onChangeText={(text) => handleChange(text, key, 'itemType')} value={input.itemType} />
                    </View>

                    <View style={{ width: "90%", marginTop: 10 }}>
                      <TextInput
                        mode="outlined"
                        label="Item Description *"
                        placeholder="Item Description *"
                        multiline={true}
                        style={{ height: 100 }}
                        onChangeText={(text) => handleChange(text, key, 'itemDescription')} value={input.itemDescription} />
                    </View>

                    <View style={{ width: "90%", marginTop: 10 }}>
                      <TextInput
                        mode="outlined"
                        label="Length *"
                        placeholder="Length *"
                        keyboardType='numeric'
                        onChangeText={(text) => handleChange(text, key, 'length')} value={input.length} />
                    </View>

                    <View style={{ width: "90%", marginTop: 10 }}>
                      <TextInput
                        mode="outlined"
                        label="Weight *"
                        placeholder="Weight *"
                        keyboardType='numeric'
                        onChangeText={(text) => handleChange(text, key, 'weight')} value={input.weight} />
                    </View>

                    <View style={{ width: "90%", marginTop: 10 }}>
                      <TextInput
                        mode="outlined"
                        label="Height *"
                        placeholder="Height *"
                        keyboardType='numeric'
                        onChangeText={(text) => handleChange(text, key, 'height')} value={input.height} />
                    </View>

                    <View style={{ width: "90%", marginTop: 10 }}>
                      <TextInput
                        mode="outlined"
                        label="Quantity *"
                        placeholder="Quantity *"
                        keyboardType='numeric'
                        onChangeText={(text) => handleChange(text, key, 'quantity')} value={input.quantity} />
                    </View>

                    <View style={{ width: "90%", marginTop: 10 }}>
                      <TextInput
                        mode="outlined"
                        label="Cost Per Item *"
                        placeholder="Cost Per Item *"
                        keyboardType='numeric'
                        onChangeText={(text) => handleChange(text, key, 'costPerItem')} />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                      <TouchableOpacity onPress={addFormFields}>
                        <View style={{ width: 50, backgroundColor: "#2ecc71", height: 45, marginTop: 10, borderRadius: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                          <Feather name="plus" color="#fff" size={25} />
                        </View>
                      </TouchableOpacity>
                      {
                        formValues3.length === 1 ? <Text></Text> :
                          <TouchableOpacity onPress={() => removeFormFields(key)}>
                            <View style={{ width: 50, backgroundColor: "#e74c3c", height: 45, marginTop: 10, borderRadius: 50, flexDirection: "row", alignItems: "center", justifyContent: "center", marginLeft: 5 }}>
                              <Feather name="minus" color="#fff" size={25} />
                            </View>
                          </TouchableOpacity>
                      }
                    </View>
                  </View>
                  //   {/* <View style={styles.inputContainer}>
                  //     <TextInput placeholder="Picture" keyboardType="number-pad" placeholderTextColor="black" style={styles.input} onChangeText={(text) => handleChange(text, key, 'picture')} value={input.picture} />
                  //   </View> */}

                  //   <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, marginTop: 10 }}>
                  //     <TouchableOpacity onPress={addFormFields}>
                  //       <View
                  //         style={styles.nextBtn}>
                  //         <Text>Add More</Text>
                  //       </View>
                  //     </TouchableOpacity>
                  //     {
                  //       formValues3.length === 1 ? <Text></Text> :
                  //         <TouchableOpacity onPress={() => removeFormFields(key)}>
                  //           <View >
                  //            <Text>Less</Text>
                  //           </View>
                  //         </TouchableOpacity>
                  //     }
                ))}
            </View>

          </View>
          <View style={{ width: "90%", marginTop: 15, flexDirection: "row", alignItems: "center", justifyContent: "center", }}>
          <View style={{backgroundColor:"#D9D9D9",padding:10,width:"100%",flexDirection:"row"}}>
              <Text style={{fontFamily: "Poppins-SemiBold",color:"#000"}}>Total Item Price : </Text>
              <Text style={{fontFamily: "Poppins-SemiBold",color:"#000"}}>{getTotal()} /- </Text>
            </View>
            </View>


          <View style={{ width: "90%", marginTop: 15, flexDirection: "row", alignItems: "center", justifyContent: "center", }}>
          
            {
              loading ?
                <View style={{ flexDirection: "row", alignSelf: "center", justifyContent: "flex-end" }}>
                  <ActivityIndicator size="large" color="#000" />
                </View>
                :
                <>
                  <View style={{ width: "50%", backgroundColor: "#3498DB", flexDirection: "row", alignItems: "center", justifyContent: "center", height: 50, marginBottom: 10, borderRadius: 10 }}>
                    <TouchableOpacity onPress={() => handleClick()} >
                      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                          <Text style={{ fontSize: 20, color: "#fff", fontFamily: "Poppins-SemiBold" }}>Add</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  FormHeading: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
    marginTop: 20,
    fontWeight: 'bold'
  },

  textBox: {
    fontSize: 15,
    borderColor: 'skyblue',
    borderBottomWidth: 2,
    padding: 10,
    marginVertical: 15,
    color: '#11A05F'
  },

  mainCardView: {
    marginTop: 20,
    borderRadius: 20,
    marginHorizontal: 20,
    backgroundColor: '#bdc3c7'
  },

  inputContainer: {
    marginTop: 10,
    marginHorizontal: 30
  },
  chooseBox: {
    width: 200,
    height: 40,
    backgroundColor: "#2ecc71",
    marginTop: 10,
    marginLeft: 25
  },
  chooseBox2: {
    width: 310,
    height: 40,
    backgroundColor: "#3498db",
    marginTop: 5,
    marginLeft: 25,
    marginBottom: 20
  },

  input: {
    color: '#000',
    paddingLeft: 30,
    borderColor: '#000',
    borderBottomWidth: 2,
    flex: 1,
    fontSize: 12,
    marginBottom: 10
  },
  flatBox: {
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 20,
    marginTop: 5,
    marginLeft: 10,
  },
  imgStyle: {
    width: 74,
    height: 74,
    borderRadius: 20,
    marginTop: 3,
    marginLeft: 3
  },
  Mainbox: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  inputIcon: { marginTop: 15, position: 'absolute' },

  pickerChoosing: {
    flex: 1,
    borderColor: '#fff',
    borderBottomWidth: 2,
    marginTop: 8,
    color: '#11A05F',
    marginHorizontal: 30
  },
});
