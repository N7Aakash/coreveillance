import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity, Image, Button, TouchableWithoutFeedback
} from "react-native";
import {Card} from 'react-native-shadow-cards';
import {Block} from "galio-framework";
class VisitorDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
       // console.log(this.props.navigation.state.params.name);
    }

    render(){
        let visitor_type;
        console.log(this.props.navigation.state.params.visitor_type);
        if(this.props.navigation.state.params.visitor_type  === '1')
             visitor_type="NEW VISITOR";
        else
             visitor_type="FREQUENT VISITOR";
        return (
            <View style={styles.container}>
                <Card style={styles.mainCard}>
                    <Card style={{padding: 10, margin: 10}}>
                        <Text style={{textAlign:'center'}}>VISITOR DETAILS</Text>
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


    }
});

export default VisitorDetails;