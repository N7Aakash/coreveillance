import React from "react";
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    Image
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            UserName: '',
            UserEmail: '',
            UserPassword: '',
            users: [],

        }
    }

    registerUser = (title, message) =>{
        console.log(this.state.UserEmail);
        console.log(this.state.UserPassword);
        console.log(this.state.UserName);
        fetch('http://192.168.43.52/ReactTemplates/argon/PHP/user_registration.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                name: this.state.UserName,

                email: this.state.UserEmail,

                password: this.state.UserPassword

            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // Showing response message coming from server after inserting records.
                if(responseJson === "true"){
                    Alert.alert("User Registered Successfully!", message);
                    {  this.props.navigation.navigate("Login")}
                }

            }).catch((error) => {
            console.error(error);
        });

    };


    render() {
        const { navigation } = this.props;

        return (
            <Block flex middle>
                <StatusBar hidden />
                <ImageBackground
                    source={Images.RegisterBackground}
                    style={{ width, height, zIndex: 1 }}
                >
                    <Block flex middle>
                        <Block style={styles.registerContainer}>
                            <Block flex={0.25} middle style={styles.socialConnect}>
                                <Text color="#8898AA" size={12}>
                                    Sign up with
                                </Text>
                                <Block row style={{ marginTop: theme.SIZES.BASE }}>

                                    <Button style={{ ...styles.socialButtons, marginRight: 30 }}>
                                        <Block row>
                                            <Icon
                                                name="logo-github"
                                                family="Ionicon"
                                                size={14}
                                                color={"black"}
                                                style={{ marginTop: 2, marginRight: 5 }}
                                            />
                                            <Text style={styles.socialTextButtons}>hi</Text>
                                        </Block>
                                    </Button>
                                    <Button style={styles.socialButtons}>
                                        <Block row>
                                            <Icon
                                                name="logo-google"
                                                family="Ionicon"
                                                size={14}
                                                color={"black"}
                                                style={{ marginTop: 2, marginRight: 5 }}
                                            />
                                            <Text style={styles.socialTextButtons}>GOOGLE</Text>
                                        </Block>
                                    </Button>
                                </Block>
                            </Block>

                            <Block flex>

                                <Block flex={0.17} middle>
                                    <Text color="#8898AA" size={12}>
                                        Or sign up the classic way
                                    </Text>
                                </Block>
                                <Block flex center>
                                    <KeyboardAvoidingView
                                        style={{ flex: 1 }}
                                        behavior="padding"
                                        enabled
                                    >
                                        <Block width={width * 0.8} style={{ marginBottom: 15 }}>

                                            <Input
                                                borderless
                                                placeholder="Name"
                                                onChangeText={name => this.setState({UserName : name})}
                                                iconContent={
                                                    <Icon
                                                        size={16}
                                                        color={argonTheme.COLORS.ICON}
                                                        name="hat-3"
                                                        family="ArgonExtra"
                                                        style={styles.inputIcons}
                                                    />
                                                }
                                            />
                                        </Block>
                                        <Block width={width * 0.8} style={{ marginBottom: 15 }}>
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
                                            <Block row style={styles.passwordCheck}>
                                                <Text size={12} color={argonTheme.COLORS.MUTED}>
                                                    password strength:
                                                </Text>
                                                <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                                                    {" "}
                                                    strong
                                                </Text>
                                            </Block>
                                        </Block>

                                        <Block row width={width * 0.75}>
                                            <Checkbox
                                                checkboxStyle={{
                                                    borderWidth: 3
                                                }}
                                                color={argonTheme.COLORS.PRIMARY}
                                                label="I agree with the"
                                            />
                                            <Button
                                                style={{ width: 100 }}

                                                color="transparent"
                                                textStyle={{
                                                    color: argonTheme.COLORS.PRIMARY,
                                                    fontSize: 14
                                                }}
                                            >
                                                Privacy Policy
                                            </Button>
                                        </Block>
                                        <Block middle>
                                            <Button color="primary" style={styles.createButton}
                                                    onPress={this.registerUser}>
                                                <Text bold size={14} color={argonTheme.COLORS.WHITE} style={styles.createText}>
                                                    CREATE ACCOUNT
                                                </Text>
                                            </Button>
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
        height: height * 0.78,
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
        paddingBottom: 30
    },
    createButton: {
        width: width * 0.25,
        height: height * 0.07,
        marginTop: 25
    }
});

export default Register;
