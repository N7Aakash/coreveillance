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
    Picker,
    TouchableOpacity,
    TouchableHighlight,
    Modal,
    Platform, View
} from "react-native";
import { Block, Checkbox, theme,Text } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

import { FontAwesome, MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from "../constants/Constants";
import {Card} from "react-native-shadow-cards";
const { width, height } = Dimensions.get("screen");

class RegisterVisitor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            f_name: '',
            l_name: '',
            email_id: '',
            phone_no:'',
            visitor_type:1,
            captured_image:this.props.navigation.state.params.captured_image,

        };
      //  console.log(this.state.captured_image);
       // console.log("at Register Component");
    }




    registerUser = (title, message) =>{
        fetch(Constants.API_PATH+'visitor_registration.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                f_name: this.state.f_name,
                l_name: this.state.l_name,
                email_id:this.state.email_id,
                phone_no:this.state.phone_no,
                image:this.state.captured_image,
                visitor_type:this.state.visitor_type,

            })

        }).then((response) => response.text())
            .then((responseJson) => {

                // Showing response message coming from server after inserting records.
                // console.log(responseJson);
                if(responseJson.length === 6){
                    Alert.alert("Visitor Registered Successfully!", message);
                    {  this.props.navigation.navigate("Home")}
                    // console.log("inside true");
                }
                   // console.log(responseJson.length);

            }).catch((error) => {
            console.error(error);
        });
        //console.log("hi");
    };
    tapVisitorChange=(type)=>{
        console.log(type);
        this.setState({
            visitor_type:type,
        })
    };

    render(){
        const {navigation} = this.props;
        const {hasPermission} = this.state;
        const imgContainer = [styles.imageContainer,
            styles.shadow
        ];
        if (hasPermission === null) {
            return <View/>;
        } else if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <ScrollView>
                <KeyboardAvoidingView
                    style={{flex: 1}}
                    behavior="padding"
                    enabled
                >
                <View style={styles.container}>
                    <Card style={{padding: 10, marginHorizontal: 15,marginVertical:10,  backgroundColor: argonTheme.COLORS.WARNING, height:'auto'}}>
                        <Text style={{textAlign:'center',color:'white'}}>Enter Visitor Details</Text>
                    </Card>
                    <Card style={{padding: 10, marginHorizontal: 15, marginVertical: 10, paddingVertical:'4%', height:'auto'}}>
                        <Block style={{ paddingHorizontal: theme.SIZES.BASE , justifyContent:'space-between', height:'auto' }}>
                            <Input
                                right
                                placeholder="First Name"
                                style={{
                                    borderColor: argonTheme.COLORS.WARNING,
                                    borderRadius: 4,
                                    backgroundColor: "#fff",
                                    marginVertical:5,
                                }}
                                onChangeText={f_name => this.setState({f_name: f_name})}
                                iconContent={<MaterialIcons name="person" size={15}  color={argonTheme.COLORS.ICON}/>}
                            />
                            <Input
                                right
                                placeholder="Last Name"
                                style={{
                                    borderColor: argonTheme.COLORS.WARNING,
                                    borderRadius: 4,
                                    backgroundColor: "#fff",
                                    marginVertical:5,
                                }}
                                onChangeText={l_name => this.setState({l_name: l_name})}
                                iconContent={ <MaterialIcons name="person-add" size={15}  color={argonTheme.COLORS.ICON} />
                                }
                            />
                            <Input
                                right
                                placeholder="Email Id"
                                style={{
                                    borderColor: argonTheme.COLORS.WARNING,
                                    borderRadius: 4,
                                    backgroundColor: "#fff",
                                    marginVertical:5,
                                }}
                                onChangeText={email_id => this.setState({email_id: email_id})}
                                iconContent={ <MaterialIcons name="email" size={15}  color={argonTheme.COLORS.ICON} />}
                            />
                            <Input
                                right
                                placeholder="Phone Number"
                                style={{
                                    borderColor: argonTheme.COLORS.WARNING,
                                    borderRadius: 4,
                                    backgroundColor: "#fff",
                                    marginVertical:5,
                                }}
                                onChangeText={phone_no => this.setState({phone_no: phone_no})}
                                iconContent={ <MaterialIcons name="contact-phone" size={15}  color={argonTheme.COLORS.ICON} />}
                            />
                            <Picker
                                selectedValue={this.state.visitor_type}
                                mode={'dropdown'}
                                style={{height: 50, width: 'auto',marginVertical:5,}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.tapVisitorChange(itemValue)
                                }>
                                <Picker.Item label="NEW VISITOR" value="1" />
                                <Picker.Item label="FREQUENT VISITOR" value="2" />

                            </Picker>
                                <Image source={{uri: `data:image;base64,${this.state.captured_image}`}}  style={styles.logo}/>
                            <Block middle>
                                <Button color="white" style={styles.createButton}
                                        onPress={this.registerUser}>
                                    <Block middle>
                                        <Image source={Images.create}/>
                                    </Block>
                                </Button>
                            </Block>
                        </Block>
                    </Card>
                </View>

                </KeyboardAvoidingView>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:'auto'
    },
    createButton: {
        width: width * 0.25,
        height: height * 0.07,
        marginTop: 25,
        marginBottom:theme.SIZES.BASE,
        marginVertical:5
    },
    logo: {
        width: 'auto',
        height: 350,
        position: 'relative',

    },


});

export default RegisterVisitor;
