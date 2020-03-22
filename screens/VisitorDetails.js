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
class VisitorDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
       // console.log(this.props.navigation.state.params.name);
    }
    openVisitorHistory=()=>{
        this.props.navigation.navigate("VisitorHistory", {
            visitor_id:this.props.navigation.state.params.visitor_id,
        })
    };
    render(){
        let visitor_type;
       // console.log(this.props.navigation.state.params.visitor_type);
        if(this.props.navigation.state.params.visitor_type  === '1')
             visitor_type="NEW VISITOR";
        else
             visitor_type="FREQUENT VISITOR";
        return (
            <View style={styles.container}>
                <Card style={styles.mainCard}>
                    <Card style={{padding: 10, margin: 10, backgroundColor:argonTheme.COLORS.WARNING}}>
                        <Text style={{textAlign:'center', color:'white'}}>VISITOR DETAILS</Text>
                    </Card>
                    <Card style={{padding: 10, margin: 10}}>
                        <Block style={{justifyContent:'center',paddingLeft:42, paddingVertical:'2%'}}>
                       <View>
                        <Image source={{uri: `data:image;base64,${this.props.navigation.state.params.image}`}} style={styles.logo}/>
                       </View>
                            <View style={{justifyContent:'space-between'}}>
                        <Text style={{paddingVertical:'2%'}}>{this.props.navigation.state.params.name}</Text>
                        <Text style={{paddingVertical:'2%'}}>{this.props.navigation.state.params.email}</Text>
                        <Text style={{paddingVertical:'2%'}}> {this.props.navigation.state.params.phone}</Text>
                                <Text style={{paddingVertical:'2%'}}>{this.props.navigation.state.params.date_first_visited}</Text>
                                <Text style={{paddingVertical:'2%'}}> {this.props.navigation.state.params.guard_incharge}</Text>
                                <Text style={{paddingVertical:'2%'}}>{visitor_type} </Text>
                            </View>
                            </Block>
                    </Card>
                    <Button  style={[styles.button, {backgroundColor:argonTheme.COLORS.WARNING, marginLeft:115} ]} onPress={this.openVisitorHistory} >Visiting History</Button>


                </Card>
            </View>
        );
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

export default VisitorDetails;