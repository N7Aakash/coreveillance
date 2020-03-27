
import {AsyncStorage, Text, StyleSheet, Dimensions,} from "react-native";
import React from 'react';
import {Button} from "../components";
import {Block, theme} from "galio-framework";
import {argonTheme} from "../constants";
const { width, height } = Dimensions.get("screen");

export default  class Logout extends React.Component{
    constructor(props){
       super(props);
        this.state = {
            name:'',
            email:'',
            phone_no:'',
            wing:'',
            flat_no:'',
            user_role:'',
            user_role_id:'' ,

        };
        console.log("Reached Logout!");
        {this.retrieveData("name")}
        // {this.retrieveData("email")}
        // {this.retrieveData("wing")}
        // {this.retrieveData("flat_no")}
        // {this.retrieveData("phone_no")}
        // {this.retrieveData("user_role")}

    }
    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch(exception) {
            return false;
        }
    }

    logoutUser=()=>{


        console.log("Name:" + this.state.name);
        // console.log("email:" + this.state.email);
        // console.log("wing:" + this.state.wing);
        // console.log("flat:" + this.state.flat_no);
        // console.log("phone:" + this.state.phone_no);
        // console.log("role:" + this.state.user_role);

        if(this.removeItemValue("name"))
            {
                    console.log("true");
                }
                else{
                    console.log("false");
                }
        // AsyncStorage.removeItem('name');
        // AsyncStorage.removeItem("flat_no");
        // AsyncStorage.removeItem("phone_no");
        // AsyncStorage.removeItem("wing");
        // AsyncStorage.removeItem("user_role");

        // AsyncStorage.removeItem("user_role_id");

        this.props.navigation.navigate("Login");
    }
    checkData=()=>{
        {this.retrieveData("name")}
        // {this.retrieveData("email")}
        // {this.retrieveData("wing")}
        // {this.retrieveData("flat_no")}
        // {this.retrieveData("phone_no")}
        // {this.retrieveData("user_role")}

        console.log("After removing items:*************************************************");
        console.log("Name:" + this.state.name);
        // console.log("email:" + this.state.email);
        // console.log("wing:" + this.state.wing);
        // console.log("flat:" + this.state.flat_no);
        // console.log("phone:" + this.state.phone_no);
        // console.log("role:" + this.state.user_role);
    }
    async retrieveData(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // We have data!!
                this.setState({
                    [key]:value,
                })
            }
        } catch (error) {
            // Error retrieving data
        }
    };
render(){
return(
    <Block middle>
    <Button color="white" style={styles.createButton}
            onPress={this.logoutUser}>
        <Block middle>
            <Text style={{ color:'white'}}>Logout</Text>
        </Block>
    </Button>
        <Button color="white" style={styles.createButton}
                onPress={this.checkData}>
            <Block middle>
                <Text style={{ color:'white'}}>Check data</Text>
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