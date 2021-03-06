import React from "react";
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    View,
    KeyboardAvoidingView,
    ScrollView,
    Alert, Image
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import Register from "../screens/Register";
import Constants from "../constants/Constants";

const { width, height } = Dimensions.get("screen");

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserEmail: '',
            UserPassword: '',
        }

    }
    openRegisterPage = ()=> {
        {  this.props.navigation.navigate("Register")}
    };
    getData = (title, message) =>{

        fetch(Constants.API_PATH+'singleRead.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.UserEmail,
                password: this.state.UserPassword
            })

        }).then((response) => response.json())
            .then((responseJson) => {


                if(responseJson === "Email does Not Exist, Please Login First !!!"){
                    Alert.alert("Email does Not Exist, Please Login First !!!", message);
                }
                else if(responseJson === "Password matched"){
                    {  this.props.navigation.navigate("Home")}
                }
                else if(responseJson === "Password Matching Failed!"){
                    Alert.alert("Incorrect Password/Email ID", message);
                }
                else{
                    Alert.alert("Try Again",message);
                }
                // console.log(responseJson);


            }).catch((error) => {
            console.error(error);
        });


    };


    render() {

        return (
            <Block flex middle>
                <StatusBar hidden />
                <ImageBackground
                    source={Images.RegisterBackground}
                    style={{ width, height, zIndex: 1 }}
                >
                    <Block flex middle>
                        <Block style={styles.registerContainer}>


                            <Block flex>

                                <Block flex={0.17} middle style={{ marginBottom: 50 }}>
                                    <Image source={Images.coreLogo} style={styles.logo} />
                                </Block>
                                <Block flex center>
                                    <KeyboardAvoidingView
                                        style={{ flex: 1 }}
                                        behavior="padding"
                                        enabled
                                    >
                                        <Block middle>
                                        <Text style={{color:'white', fontSize:25, fontWeight:'bold'}}>Private Policy</Text>
                                        </Block>
                                    </KeyboardAvoidingView>

                                </Block>
                            </Block>
                        </Block>
                    </Block>
                </ImageBackground>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    registerContainer: {
        width: width * 0.9,
        height: height * 0.58,
        // backgroundColor: "#F4F5F7",
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        borderRadius: 4,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: "hidden",
        marginBottom:120
    },
    logo:{
        height:109,
        width:100,
        marginTop: 50,

    },
    createText:{
        marginLeft: 20,
    },
    socialTextButtons: {
        color: argonTheme.COLORS.PRIMARY,
        fontWeight: "800",
        fontSize: 14
    },
    inputIcons: {
        marginRight: 12
    },
    passwordCheck: {
        paddingLeft: 15,
        paddingTop: 13,
        paddingBottom: 30,
        marginTop:150,
    },
    createButton: {
        width: width * 0.25,
        height: height * 0.07,
        marginTop: 25,
        marginLeft: 18,

    }
});

export default Login;
