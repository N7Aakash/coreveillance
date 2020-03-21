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
import Constants from "../constants/Constants";
class ManageVisitorDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            flatNo:"",
            wing:"",
            num_of_pax:"",
            visitor_id:""
        };
       // console.log(this.props.navigation.state.params.name);
    }

    toggleModal=()=>{
        this.setState({isModalVisible: !this.state.isModalVisible,visitor_id:this.props.navigation.state.params.visitor_id});
     
    }
    closeModal=()=>{
        this.setState({isModalVisible:false})
    }

    registerVistitor = () => {
        let flatNo = this.state.flatNo;
        let wing = this.state.wing;
        let num_of_pax = this.state.num_of_pax;
        let visitor_id = this.state.visitor_id;

        fetch(Constants.API_PATH+'visitor_visiting.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                visitor_visiting_flat: flatNo,
                visitor_visiting_wing: wing,
                num_of_pax:num_of_pax,
                visitor_id:visitor_id,
            })

        }).then((response) => response.text())
            .then((responseJson) => {

                console.log(responseJson);
                 if(responseJson === "true"){
                    // Alert.alert("Visitor Entered Successfully!!");
                    {  this.props.navigation.navigate("Home")}
                }else{
                    Alert.alert("Visitor is already present in society!!");
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
                <Button title="Check In" onPress={this.toggleModal} />
                <Modal isVisible={this.state.isModalVisible} animationType="slide" transparent={false}>
                <View style={{marginTop: 22}}>
                    <TextInput placeholder="Flat No." onChangeText={flatNo => this.setState({flatNo:flatNo})}/>
                    <TextInput placeholder="Wing" onChangeText={wing => this.setState({wing:wing})}/>
                    <TextInput placeholder="No of Peoples" onChangeText={num_of_pax => this.setState({num_of_pax:num_of_pax})}/> 
                    <Button title="Save" onPress={this.registerVistitor} />
                    <Button title="Close" onPress={this.closeModal} />
                </View>
                </Modal>
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

export default ManageVisitorDetails;