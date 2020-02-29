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

        fetch('http://192.168.43.52/ReactTemplates/argon/PHP/singleRead.php', {
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

                                        <Block width={width * 0.8} style={{ marginBottom: 30 }}>
                                            <Input
                                                borderless
                                                placeholder="Email"
                                                onChangeText={email => this.setState({UserEmail : email})}
                                                iconContent={
                                                    <Icon
                                                        size={16}
                                                        color={argonTheme.COLORS.ICON}
                                                        name="ic_mail_24px"
                                                        family="ArgonExtra"
                                                        style={styles.inputIcons}
                                                    />
                                                }
                                            />
                                        </Block>
                                        <Block width={width * 0.8}>
                                            <Input
                                                password
                                                borderless
                                                placeholder="Password"
                                                onChangeText={password => this.setState({UserPassword : password})}
                                                iconContent={
                                                    <Icon
                                                        size={16}
                                                        color={argonTheme.COLORS.ICON}
                                                        name="padlock-unlocked"
                                                        family="ArgonExtra"
                                                        style={styles.inputIcons}
                                                    />
                                                }
                                            />

                                        </Block>

                                        <Block left>
                                            <View style={{flexDirection:'row', paddingHorizontal:30 }}>
                                            <Button color="white" style={styles.createButton}
                                                    onPress={this.openRegisterPage}>
                                                <Block  middle >
                                                    <Image source={Images.register}  />
                                                </Block>
                                            </Button>

                                            <Button color="white" style={styles.createButton}
                                                    onPress={this.getData}>
                                                <Block  middle >
                                                    <Image source={Images.login}  />
                                                </Block>
                                            </Button>
                                                </View>
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
        backgroundColor: "#F4F5F7",
        borderRadius: 4,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: "hidden"
    },
    logo:{
        height:109,
        width:100,
        marginTop: 50,

    },
    socialConnect: {
        backgroundColor: argonTheme.COLORS.WHITE,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#8898AA"
    },
    socialButtons: {
        width: 120,
        height: 40,
        backgroundColor: "#fff",
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1
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
