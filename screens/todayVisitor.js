import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity, Image, TouchableWithoutFeedback,
} from "react-native";
import { Block, theme } from 'galio-framework';
import {Card} from 'react-native-shadow-cards';
import Constants from "../constants/Constants";
import {argonTheme} from "../constants";
class todayVisitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource:[]
        };
    }
    componentDidMount(){
        fetch(Constants.API_PATH+'/getTodayVisitors.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson === "No Visitor ! Please enter some Visitors for display ")
                    console.log(responseJson);
                else {
                    this.setState({
                        loading: false,
                        dataSource: responseJson
                    });
                }


            }).catch((error) => {
            console.error(error);
        });
    }
    FlatListItemSeparator = () => {
        return (
            <View style={{
                height: .5 * 2,
                width:"90%",
                marginLeft:"3%",
                backgroundColor:argonTheme.COLORS.WARNING,
            }}
            />
        );
    }
    renderItem(item){
        console.log(item);
        return(
            <Card style={{padding: 10, margin: 10}}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("TodayVisitorDetails",{
                    visitor_id:item.visitor_id,
                    name:item.f_name + " " + item.l_name,
                    email:item.email_id,
                    phone:item.phone_no,
                    image:item.image,
                    visitor_type:item.visitor_type_id,
                })}>
                    <Block style={{flexDirection:'row',justifyContent:'space-around',alignContent:'center', paddingVertical:'2%'}}>

                        <View>
                            <Image source={{uri: `data:image;base64,${item.image}`}} style={styles.logo}/>
                        </View>
                        <View>

                            <Text style={styles.item}>{item.f_name + " " + item.l_name }</Text>
                            <Text style={styles.item}>{item.email_id}</Text>
                            <Text style={styles.item}>{item.phone_no}</Text>

                        </View>
                    </Block>
                </TouchableWithoutFeedback>
            </Card>);
    }

    render() {
        if (this.state.dataSource.length === 0) {
            return (
                <Card style={{padding: 10, marginHorizontal: 15,  backgroundColor: argonTheme.COLORS.WARNING}}>
                    <Text style={{textAlign:'center', color:'white'}}>No Visitors to Check-out!</Text>
                </Card>
            )
        }
        else{
        if(this.state.loading){
            return(
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="red"/>
                </View>
            )}
        return(
            <View style={styles.container}>
                <Card style={{padding: 10, marginHorizontal: 15,  backgroundColor: argonTheme.COLORS.WARNING}}>
                    <Text style={{textAlign:'center',color:'white'}}>Today Visitors</Text>
                </Card>
                <FlatList

                    data= {this.state.dataSource}
                    ItemSeparatorComponent = {this.FlatListItemSeparator}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor= {item=>item.email_id+""}
                />

            </View>
        )}}

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        paddingVertical: '2%',
        fontSize: 18,
        height: 'auto',
    },
    logo: {
        width: 120,
        height: 150,
        position: 'relative',
        borderRadius:20,

    },
});
export default todayVisitor;