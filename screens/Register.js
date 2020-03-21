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
import Constants from "../constants/Constants";
const { width, height } = Dimensions.get("screen");

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            user_token:'',
            f_name: '',
            l_name: '',
            password: '',
            wing:'',
            flat_no:'',
            phone_number:'',
            users: [],
            passStrength:'',
            textColor:''

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


    componentWillMount() {

        registerForPushNotificationsAsync()
            .then((data) => {
            this.setState({
                user_token:data,
            })
        });
            }


    sample=(password)=>{
        console.log(password);
        if(password.length < 5){
            this.setState({
                passStrength:'weakk',
                textColor:'red'})
        }
        else if(password.length > 5 && password.length < 9){
            this.setState({
                passStrength:'mediumm',textColor:'yellow'})
        }
        else if(password.length > 9){
            this.setState({
                passStrength:'strongg',textColor:'green'})
        }
        this.setState({
            password: password,
        })
    };
    openPrivacy=()=>{
      this.props.navigation.navigate("Privacy");
    };
    registerUser = (title, message) =>{
        fetch(Constants.API_PATH+'user_registration.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                f_name: this.state.f_name,
                l_name: this.state.l_name,
                password: this.state.password,
                email:this.state.email,
                wing:this.state.wing,
                flat_no:this.state.flat_no,
                phone_number:this.state.phone_number,
                user_token:this.state.user_token,

            })

        }).then((response) => response.text())
            .then((responseJson) => {

                // Showing response message coming from server after inserting records.
                console.log(responseJson);
                if(responseJson.length === 6){
                    Alert.alert("User Registered Successfully!", message);
                    {  this.props.navigation.navigate("Login")}
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
                                                        onChangeText={email => this.setState({email: email})}
                                                        iconContent={
                                                            <MaterialCommunityIcons style={styles.inputIcons} name="email" size={20} color="red" />
                                                        }
                                                    />
                                                </Block>
                                                <Block width={width * 0.8} style={{marginBottom: 15}}>
                                                    <Input
                                                        borderless
                                                        placeholder="   Phone Number"
                                                        onChangeText={phone_number => this.setState({phone_number: phone_number})}
                                                        iconContent={
                                                            <FontAwesome style={styles.inputIcons} name="address-book" size={19} color="red" />
                                                        }
                                                    />
                                                </Block>
                                                <Block width={width * 0.8} style={{marginBottom: 15}}>
                                                    <Input
                                                        borderless
                                                        placeholder="   Wing"
                                                        onChangeText={wing => this.setState({wing: wing})}
                                                        iconContent={
                                                             <FontAwesome style={styles.inputIcons} name="building" size={20} color="red" />
                                                        }
                                                    />
                                                </Block>

                                                <Block width={width * 0.8} style={{marginBottom: 15}}>
                                                    <Input
                                                        borderless
                                                        placeholder="Flat Number"
                                                        onChangeText={flat_no => this.setState({flat_no: flat_no})}
                                                        iconContent={
                                                            <MaterialIcons style={styles.inputIcons} name="format-list-numbered" size={20} color="red" />
                                                        }
                                                    />
                                                </Block>
                                                <Block width={width * 0.8}>
                                                    <Input
                                                        password
                                                        borderless
                                                        placeholder="Password"
                                                        onChangeText={password => this.sample(password)}
                                                        iconContent={
                                                            <Icon
                                                                size={16}
                                                                color="red"
                                                                name="padlock-unlocked"
                                                                family="ArgonExtra"
                                                                style={styles.inputIcons}
                                                            />
                                                        }
                                                    />
                                                    <Block row style={styles.passwordCheck}>
                                                        <Text size={12} color={argonTheme.COLORS.MUTED}>
                                                            password strength:
                                                        </Text>
                                                        <Text bold size={12} color={this.state.textColor}>
                                                            {this.state.passStrength}

                                                        </Text>
                                                    </Block>
                                                </Block>

                                                <Block row width={width * 0.75}>
                                                    <Checkbox
                                                        checkboxStyle={{
                                                            borderWidth: 3
                                                        }}
                                                        color='red'
                                                        label="I agree with the"
                                                        labelStyle={{color: 'white'}}
                                                    />
                                                    <Button
                                                        style={{
                                                            width: 155,
                                                            backgroundColor: 'rgba(55, 55, 55, 1.5)',
                                                            paddingHorizontal: 25,
                                                            marginLeft: 5
                                                        }}
                                                        onPress={this.openPrivacy}
                                                        color="transparent"
                                                        textStyle={{
                                                            color: 'red',
                                                            fontSize: 14,
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        Privacy Policy
                                                    </Button>
                                                </Block>
                                                {/*<Block middle>*/}
                                                {/*    <Button color="white" style={styles.createButton}*/}
                                                {/*            onPress={this.openCameraModule}>*/}
                                                {/*        <Block middle>*/}
                                                {/*            <Text>Take Image</Text>*/}
                                                {/*        </Block>*/}
                                                {/*    </Button>*/}
                                                {/*</Block>*/}

                                                {/*<Block>*/}

                                                {/*    <View style={{marginTop: 22}}>*/}
                                                {/*        <Modal*/}
                                                {/*            animationType="slide"*/}
                                                {/*            transparent={false}*/}
                                                {/*            visible={this.state.modalVisible}*/}
                                                {/*            onRequestClose={() => {*/}
                                                {/*                console.log('Modal has been closed.');*/}
                                                {/*            }}>*/}
                                                {/*            <View style={{marginTop: 22}}>*/}
                                                {/*                <View>*/}
                                                {/*                    <Text>Hello World!</Text>*/}

                                                {/*                    <TouchableHighlight*/}
                                                {/*                        onPress={() => {*/}
                                                {/*                            this.setModalVisible(!this.state.modalVisible);*/}
                                                {/*                        }}>*/}
                                                {/*                        <Text>Hide Modal</Text>*/}
                                                {/*                    </TouchableHighlight>*/}
                                                {/*                </View>*/}
                                                {/*            </View>*/}
                                                {/*        </Modal>*/}

                                                {/*        <TouchableHighlight*/}
                                                {/*            onPress={() => {*/}
                                                {/*                this.setModalVisible(true);*/}
                                                {/*            }}>*/}
                                                {/*            <Text>Show Modal</Text>*/}
                                                {/*        </TouchableHighlight>*/}
                                                {/*    </View>*/}

                                                {/*</Block>*/}

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

export default Register;
