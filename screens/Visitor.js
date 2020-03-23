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
import {Button} from "../components";
class Visitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: [],
            visitor_type: '',
        };
    }

    // console.log(this.props.navigation.state.params.visitor_type);
    sample = () => {
        console.log("Preesed Visitor Details");
    }

    componentDidMount() {
        fetch(Constants.API_PATH + 'getVisitors.php')
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    dataSource: responseJson
                })
                  //console.log(responseJson);
            })
            .catch(error => console.log(error)) //to catch the errors if any

    }


    FlatListItemSeparator = () => {
        return (
            <View style={{
                height: .5 * 2,
                width: "90%",
                marginLeft: "3%",
                backgroundColor: argonTheme.COLORS.WARNING,
            }}
            />
        );
    }
    printVisitorType(type){
        if(type  === '2')
            return "NEW VISITOR";
        else
            return "FREQUENT VISITOR";
    }
    renderItem = (data) =>


        <Card style={{padding: 10, margin: 10}}>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("VisitorDetails", {
                name: data.item.f_name + " " + data.item.l_name,
                email: data.item.email_id,
                phone: data.item.phone_no,
                image: data.item.image,
                guard_incharge: data.item.guard_incharge,
                date_first_visited: data.item.date_first_visited,
                visitor_type: data.item.visitor_type_id,
                visitor_id: data.item.visitor_id,
            })}>
                <Block style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignContent: 'center',
                    paddingVertical: '2%'
                }}>

                    <View>
                        <Image source={{uri: `data:image;base64,${data.item.image}`}} style={styles.logo}/>
                    </View>
                    <View>

                        <Text style={styles.item}>{data.item.f_name + " " + data.item.l_name}</Text>
                        <Text style={styles.item}>{data.item.email_id}</Text>
                        <Text style={styles.item}>{data.item.phone_no}</Text>
                        <Button
                            small
                            style={{backgroundColor: argonTheme.COLORS.WARNING, height: 50, width: 150}}
                        >
                            <Text style={{color: 'white'}}> {this.printVisitorType(data.item.visitor_type_id)}</Text>
                        </Button>

                    </View>
                </Block>
            </TouchableWithoutFeedback>
        </Card>;

    render() {
        if(this.state.loading){
            return(
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="red"/>
                </View>
            )}
        return(
            <View style={styles.container}>
                <Card style={{padding: 10, margin: 10,  backgroundColor: argonTheme.COLORS.WARNING}}>
                    <Text style={{textAlign:'center',color:'white'}}>All Time Visitors</Text>
                </Card>
                <FlatList

                    data= {this.state.dataSource}
                    ItemSeparatorComponent = {this.FlatListItemSeparator}
                    renderItem= {item=> this.renderItem(item)}
                    keyExtractor= {item=>item.email_id+""}
                />
            </View>
        )}


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
export default Visitor;