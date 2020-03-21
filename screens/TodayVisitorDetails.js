import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    Alert,
    TextInput,
    TouchableOpacity, Image, Button, TouchableWithoutFeedback
} from "react-native";
import {Card} from 'react-native-shadow-cards';
import {Block} from "galio-framework";
import Modal from 'react-native-modal';
class TodayVisitorDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
       // console.log(this.props.navigation.state.params.name);
    }


    updateVisitorDetails = () => {
        let visitor_id = this.props.navigation.state.params.visitor_id;

        fetch('http://172.20.10.4/coreveilliance/PHP/update_visitor_visiting.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                visitor_id:visitor_id,
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                console.log(responseJson);
                 if(responseJson === "true"){
                    // Alert.alert("Visitor Entered Successfully!!");
                    {  this.props.navigation.navigate("Home")}
                }else{
                    Alert.alert("Error in check out");
                }
                
                


            }).catch((error) => {
            console.error(error);
        });


        //this.setState({isModalVisible: !this.state.isModalVisible});
      };

    render(){
        let visitor_type;
        console.log(this.props.navigation.state.params.visitor_type);
        if(this.props.navigation.state.params.visitor_type  === '1')
             visitor_type="FREQUENT VISITOR";
        else
             visitor_type="New VISITOR";
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
                        
                                
                                <Text style={{paddingVertical:'2%'}}>{visitor_type} </Text>
                            </View>
                            </Block>
                    </Card>


                </Card>
                <Button title="Check Out" onPress={this.updateVisitorDetails} />
                
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

export default TodayVisitorDetails;