import React from "react";
import Constants from "../constants/Constants";
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    View,
    KeyboardAvoidingView,
    ScrollView,
    Alert, Image,
    AsyncStorage,
    Text
} from "react-native";

import { Block, Checkbox , theme } from "galio-framework";

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
            UserFlat:'',
        }

    }
    async  storeData(data){
        try {
            await AsyncStorage.setItem("name", (data['f_name']+ " " + data['l_name']));
            await AsyncStorage.setItem("email", data['email']);
            await AsyncStorage.setItem("wing", data['wing']);
            await AsyncStorage.setItem("flat_no", data['flat_no']);
            await AsyncStorage.setItem("phone_no", data['phone_number']);
            await AsyncStorage.setItem("user_role", data['user_role_name']);
            await AsyncStorage.setItem("user_role_id", data['user_role_id']);


        } catch (error) {
            // Error saving data
            console.log("error in store data async");
        }
        console.log("Data set");
    };

    openRegisterPage = ()=> {
        {  this.props.navigation.navigate("Register")}
    };
    getData = (title, message) =>{


        let email=this.state.UserEmail;
        let flat=this.state.UserFlat;
        let requestType='';
        if(email.length > 0){
            console.log("email" + email);
            requestType=1;
        }else if(flat.length > 0 ){
            console.log("flat: "  + flat);
            requestType=0;

        }
        console.log("Password:" + this.state.UserPassword);

        fetch(Constants.API_PATH+'singleRead.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.UserEmail,
                password: this.state.UserPassword,
                flat_no:this.state.UserFlat,
                requestType:requestType,
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                 console.log(responseJson);
                if(responseJson === "User does Not Exist, Please Register First !!!"){
                    Alert.alert("User does Not Exist, Please Register First !!!", message);
                }
                else if(responseJson === "Password did not matched"){
                    Alert.alert("Incorrect Password/Email ID/Flat number", message);
                } else {
                    this.storeData(responseJson);
                    let id = responseJson['user_role_id'];
                    this.props.navigation.navigate("Home", {
                            user_role_id:id,
                        });
                }



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
                                        <Block width={width * 0.8} >
                                            <Input
                                                borderless
                                                placeholder="Flat Number"
                                                onChangeText={flat => this.setState({UserFlat : flat})}
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
<Block middle style={{marginTop:theme.SIZES.BASE,marginBottom:theme.SIZES.BASE}}><Text style={{color:'white',fontWeight: 'bold'}}>OR</Text></Block>
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
        )

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
