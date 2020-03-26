
import {AsyncStorage, Text, StyleSheet, Dimensions,} from "react-native";
import React from 'react';
import {Button} from "../components";
import {Block, theme} from "galio-framework";
import {argonTheme} from "../constants";
const { width, height } = Dimensions.get("screen");

export default  class Logout extends React.Component{
    constructor(props){
       super(props);
        console.log("Reached Logout!");

    }
    logoutUser=()=>{
        AsyncStorage.removeItem("email");
        AsyncStorage.removeItem("name");
        AsyncStorage.removeItem("flat_no");
        AsyncStorage.removeItem("phone_no");
        AsyncStorage.removeItem("wing");
        AsyncStorage.removeItem("user_role");
        AsyncStorage.removeItem("user_role_id");
        this.props.navigation.navigate("Login");
    }
render(){
return(
    <Block middle>
    <Button color="white" style={styles.createButton}
            onPress={this.logoutUser}>
        <Block middle>
            <Text style={{ color:'white'}}>Logout</Text>
        </Block>
    </Button>
    </Block>
);
}
}
const styles = StyleSheet.create({
    createButton: {
        width: width * 0.25,
        height: height * 0.07,
        marginTop: 25,
        marginBottom:theme.SIZES.BASE,
        marginVertical:5,
        backgroundColor:argonTheme.COLORS.WARNING,

    },
});