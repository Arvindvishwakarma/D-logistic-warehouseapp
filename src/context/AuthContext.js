/* eslint-disable no-alert */
/* eslint-disable no-sequences */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { createContext, useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";
import { useMutation } from '@apollo/client';
import { MUTATION_LOGIN_LONDON, MUTATION_WAREHOUSE_LOGIN } from '../Graphql/Mutation';

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {


    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [bucketItem, setBucketItem] = useState([])
    const [vendorId, setVendorId] = useState()
    const [vendorType, setVendorType] = useState()
    const [venderName, setVendorName] = useState()
    const [useDiscount, setUserDiscount] = useState()

    const [check, setCheck] = useState("")

    const [loginError, setLoginError] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const [emptyError, setEmptyError] = useState(false);

    const [breakIf, setBreakIf] = useState(true)

    const [splashLoading, setSplashLoading] = useState(false)
    const [warehouseLogin, { data: userData, loading: userLoading, error: userError }] = useMutation(MUTATION_WAREHOUSE_LOGIN, {
        onError(error) {
            console.log("ERROR", error)
            setLoginError(true)
        },
        onCompleted(userData) {
            AsyncStorage.setItem('userId', userData.warehouseLogin.warehouseId);
            AsyncStorage.setItem('userToken', userData.warehouseLogin.warehouseToken);
            setUserInfo(userData.warehouseLogin.warehouseToken);
            setBreakIf(false);
        }
    })

    console.log("userData", userData)
    console.log("userError", userError)
    console.log("breakIf", breakIf)

    const loginHandel = async () => {

        console.log("username", username)
        console.log("password", password)
        Keyboard.dismiss();
        if (username === "" || password === "") {
            alert("Username & Password is empty!!!")
        } else {
            warehouseLogin({
                variables: {
                    "warehouseLoginInput": {
                        "password": `${password}`,
                        "username": `${username}`
                      }
                    }
            })
        }
    }

    // if (userData && breakIf) {
    //     AsyncStorage.setItem('userId', userData.londonStattLogin.londonId);
    //     AsyncStorage.setItem('userToken', userData.londonStattLogin.londonToken);
    //     setUserInfo(userData.londonStattLogin.londonToken);
    //     setBreakIf(false);
    // }

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true)
            let userInfo = await AsyncStorage.getItem('userToken');

            if (userInfo) {
                setUserInfo(userInfo)
            }
            setSplashLoading(false)
        } catch (e) {
            setSplashLoading(false)
        }
    }


    useEffect(() => {
        isLoggedIn();
    }, [])


    const logOut = async () => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userId');
        setUserInfo();
    }



    return (
        <AuthContext.Provider value={{
            loginHandel,
            check,
            // // userLoginLoading,
            userInfo,
            userLoading,
            loginError,
            username,
            setUserName,
            password,
            setPassword,
            // splashLoading,
            // bucketItem,
            // emptyError,
            // vendorId,
            // vendorType,
            // venderName,
            // useDiscount,
            // setBucketItem,
            // isLoggedIn,
            logOut,
        }}>
            {children}
        </AuthContext.Provider>
    );
}