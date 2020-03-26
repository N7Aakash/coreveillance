import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity, Image, TouchableWithoutFeedback, Dimensions
} from "react-native";
import {Card} from 'react-native-shadow-cards';
import {Block,Button} from "galio-framework";
import {argonTheme} from "../constants";
const { width, height } = Dimensions.get("screen");

class VisitorStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {


        return (
          <Text>Visitors Stats</Text>
        )
    }
}
const styles = StyleSheet.create({
    logo: {
        width: 250,
        height: 250,
        position: 'relative',
        borderRadius:20,
    },
    mainCard:{
        width:'100%',
        height:'auto',
        marginTop:'10%',
        paddingVertical:'2%',
        paddingHorizontal:'2%',


    },
    button:{
        width: 140,
        height: 50,
        marginTop: 15,
    }
});

export default VisitorStats;