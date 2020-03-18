import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity
} from "react-native";
class Visitor extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Source Listing",
            headerStyle: {backgroundColor: "#fff"},
            headerTitleStyle: {textAlign: "center",flex: 1}
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource:[]
        };
    }
    componentDidMount(){
        fetch("http://192.168.43.52/ReactTemplates/argon/PHP/getVisitors.php")
            .then(response => response.json())
            .then((responseJson)=> {
                this.setState({
                    loading: false,
                    dataSource: responseJson
                })
            })
            .catch(error=>console.log(error)) //to catch the errors if any
    }
    FlatListItemSeparator = () => {
        return (
            <View style={{
                height: .5,
                width:"100%",
                backgroundColor:"rgba(0,0,0,0.5)",
            }}
            />
        );
    }
    renderItem=(data)=>
        <TouchableOpacity style={styles.list}>
            <Text style={styles.item}>{data.item.f_name}</Text>
            <Text style={styles.item}>{data.item.email_id}</Text>
            <Text style={styles.item}>{data.item.phone_no}</Text></TouchableOpacity>
    render(){
        if(this.state.loading){
            return(
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0c9"/>
                </View>
            )}
        return(
            <View style={styles.container}>
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
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})
export default Visitor;