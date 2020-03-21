import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    Alert,
    TextInput,
    TouchableOpacity, Image, TouchableWithoutFeedback, Dimensions
} from "react-native";
import {Card} from 'react-native-shadow-cards';
import {Block,Button} from "galio-framework";
import Modal from 'react-native-modal';
import Constants from "../constants/Constants";
import {argonTheme} from "../constants";
const { width, height } = Dimensions.get("screen");
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
                <Button  style={[styles.button, {backgroundColor:argonTheme.COLORS.WARNING, marginLeft:150} ]} middle onPress={this.toggleModal} >Check-in</Button>
                <Modal isVisible={this.state.isModalVisible} animationType="slide" transparent={false}>
                <View style={styles.modal}>
                    <TextInput placeholder="Flat No." style={{fontSize:22}} onChangeText={flatNo => this.setState({flatNo:flatNo})}/>
                    <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                        <Block style={styles.divider} />
                    </Block>
                    <TextInput placeholder="Wing" style={{fontSize:22}} onChangeText={wing => this.setState({wing:wing})}/>
                    <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                        <Block style={styles.divider} />
                    </Block>
                    <TextInput placeholder="No of Persons"  style={{fontSize:22}} onChangeText={num_of_pax => this.setState({num_of_pax:num_of_pax})}/>
                    <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                        <Block style={styles.divider} />
                    </Block>
                    <Block style={{flexDirection:'row',justifyContent:'space-around',alignContent:'center', paddingVertical:'5%'}}>
                        <Button style={[styles.button, {backgroundColor: argonTheme.COLORS.ERROR}]} onPress={this.closeModal}>Close</Button>
                        <Button style={[styles.button, {backgroundColor: argonTheme.COLORS.SUCCESS}]}  onPress={this.registerVistitor}>Save</Button>

                    </Block>
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


    },
    modal:{
        marginTop: 22, backgroundColor:'white',
        height:'auto',
        width:'auto',
        justifyContent:'space-around',alignContent:'center',
        paddingHorizontal: '10%',
        paddingVertical: '5%',
        borderRadius: 20,
        marginVertical:55,
    },
    divider: {
        width: "100%",
        borderWidth: 1,
        borderColor: argonTheme.COLORS.WARNING,
    },
    button:{
        width: width * 0.25,
        height: height * 0.07,
        marginTop: 25,
        marginLeft: 18,
    }

});

export default ManageVisitorDetails;