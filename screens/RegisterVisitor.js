import React from "react";
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    Image,

    TouchableOpacity,
    TouchableHighlight,
    Modal,
    Platform, View
} from "react-native";
import { Block, Checkbox, theme,Text } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

import registerForPushNotificationsAsync from "./registerForPushNotificationsAsync.js";
import { FontAwesome, MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as Permissions from "expo-permissions";
import {Notifications} from "expo";
const { width, height } = Dimensions.get("screen");

class RegisterVisitor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            f_name: '',
            l_name: '',
            email_id: '',
            phone_no:'',

        }
    }
    // async registerForPushNotificationsAsync() {
    //     const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //     if (status !== 'granted') {
    //         alert('No notification permissions!');
    //         return;
    //     }
    //
    //     // Get the token that identifies this device
    //     let token= await Notifications.getExpoPushTokenAsync();
    //     this.setState({
    //        user_token:token})
    // }



    registerUser = (title, message) =>{
        fetch('http://192.168.43.52/ReactTemplates/argon/PHP/visitor_registration.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                f_name: this.state.f_name,
                l_name: this.state.l_name,
                email_id:this.state.email_id,
                phone_no:this.state.phone_no,

            })

        }).then((response) => response.text())
            .then((responseJson) => {

                // Showing response message coming from server after inserting records.
                console.log(responseJson);
                if(responseJson.length === 6){
                    Alert.alert("Visitor Registered Successfully!", message);
                    {  this.props.navigation.navigate("Home")}
                    // console.log("inside true");
                }
                //    console.log(responseJson.length);

            }).catch((error) => {
            console.error(error);
        });
        //console.log("hi");
    };


    render(){
        const {navigation} = this.props;
        const {hasPermission} = this.state;
        if (hasPermission === null) {
            return <View/>;
        } else if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <Block flex middle>
                    <StatusBar hidden/>
                    <ImageBackground
                        source={Images.RegisterBackground}
                        style={{width, height, zIndex: 1}}
                    >

                        <Block flex middle>
                            <Block style={styles.registerContainer}>
                                <ScrollView>

                                    <Block flex={0.25} middle style={styles.socialConnect}>
                                        <Text color="#8898AA" size={12} style={{marginTop: theme.SIZES.BASE}}>
                                            Sign up with
                                        </Text>
                                        <Block row
                                               style={{marginTop: theme.SIZES.BASE, marginBottom: theme.SIZES.BASE}}>

                                            <Button style={{...styles.socialButtons, marginRight: 30}}>
                                                <Block middle row>
                                                    <Image source={Images.github}/>
                                                </Block>
                                            </Button>
                                            <Button style={styles.socialButtons}>
                                                <Block row middle>
                                                    <Image source={Images.google}/>

                                                </Block>
                                            </Button>
                                        </Block>
                                    </Block>

                                    <Block flex>

                                        <Block flex={0.17} middle>
                                            <Text color="#8898AA" size={12}
                                                  style={{marginTop: theme.SIZES.BASE, marginBottom: theme.SIZES.BASE}}>
                                                Or sign up the classic way
                                            </Text>
                                        </Block>
                                        <Block flex center>
                                            <KeyboardAvoidingView
                                                style={{flex: 1}}
                                                behavior="padding"
                                                enabled
                                            >
                                                <Block width={width * 0.8} style={{marginBottom: 15}}>

                                                    <Input
                                                        borderless
                                                        placeholder="   First Name"
                                                        onChangeText={f_name => this.setState({f_name: f_name})}

                                                        iconContent={

                                                            <FontAwesome style={styles.inputIcons} name="user" size={20} color="red" />

                                                        }
                                                    />
                                                </Block>
                                                <Block width={width * 0.8} style={{marginBottom: 15}}>
                                                    <Input
                                                        borderless
                                                        placeholder=" Last Name"
                                                        onChangeText={l_name => this.setState({l_name: l_name})}
                                                        iconContent={
                                                            <FontAwesome style={styles.inputIcons} name="user-plus" size={19} color="red" />
                                                        }
                                                    />
                                                </Block>
                                                <Block width={width * 0.8} style={{marginBottom: 15}}>
                                                    <Input
                                                        borderless
                                                        placeholder="  Email"
                                                        onChangeText={email_id => this.setState({email_id: email_id})}
                                                        iconContent={
                                                            <MaterialCommunityIcons style={styles.inputIcons} name="email" size={20} color="red" />
                                                        }
                                                    />
                                                </Block>
                                                <Block width={width * 0.8} style={{marginBottom: 15}}>
                                                    <Input
                                                        borderless
                                                        placeholder="   Phone Number"
                                                        onChangeText={phone_no => this.setState({phone_no: phone_no})}
                                                        iconContent={
                                                            <FontAwesome style={styles.inputIcons} name="address-book" size={19} color="red" />
                                                        }
                                                    />
                                                </Block>



                                                <Block middle>
                                                    <Button color="white" style={styles.createButton}
                                                            onPress={this.registerUser}>
                                                        <Block middle>
                                                            <Image source={Images.create}/>
                                                        </Block>
                                                    </Button>
                                                </Block>
                                            </KeyboardAvoidingView>

                                        </Block>
                                    </Block>
                                </ScrollView>
                            </Block>

                        </Block>

                    </ImageBackground>


                </Block>
            );
        }
    }
}

const styles = StyleSheet.create({
    registerContainer: {
        width: width * 0.9,
        height: height * 0.78,
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
        overflow: "hidden"
    },
    socialConnect: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
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
        paddingBottom: 30
    },
    createButton: {
        width: width * 0.25,
        height: height * 0.07,
        marginTop: 25,
        marginBottom:theme.SIZES.BASE
    }
});

export default RegisterVisitor;
