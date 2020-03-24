import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image
} from "react-native";
import {Card} from "react-native-shadow-cards";
import {argonTheme} from "../constants";
import Constants from "../constants/Constants";
import {Block} from "galio-framework";
import {Button} from "../components";
class Anomalies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: [],
        };
    }
    componentDidMount() {
        fetch(Constants.API_PATH + 'getAnomalies.php')
            .then(response => response.json())
            .then((responseJson) => {
                if(responseJson === "No Anomalies ! Please enter some Anomalies for display ")
                    alert("No Anomalies ! Please enter some Anomalies for display ")
                else {
                    this.setState({
                        loading: false,
                        dataSource: responseJson
                    })
                }
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

    renderItem = (data) =>


        <Card style={{padding: 10, margin: 10}}>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AnomalyDetail',{
                anomaly_description_id: data.item.anomaly_description_id,
            })} >
                <Block style={{
                    flexDirection: 'row',
                    paddingVertical: '2%',
                    justifyContent: 'space-between',
                    alignContent: 'center'
                }}>

                    <View>
                        <Text style={styles.item}>{data.item.anomaly_title}</Text>
                        <Text style={styles.item}>{data.item.anomaly_text}</Text>
                        <Text style={[styles.item, {color:argonTheme.COLORS.WARNING}]}>{data.item.anomaly_date.substr(0, 10)}</Text>
                    </View>
                    <View>
                        <Button
                            small
                            style={{backgroundColor: argonTheme.COLORS.WARNING, height: 50, width: 150}}
                        >
                            <Text style={{color: 'white'}}> {data.item.anomaly_type}</Text>
                        </Button>
                        <Text style={styles.item}>{data.item.anomaly_frame}</Text>
                        <Text style={styles.item}>{data.item.anomaly_range}</Text>

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
                    <Text style={{textAlign:'center',color:'white'}}>All Anomalies</Text>
                </Card>
                <FlatList

                    data= {this.state.dataSource}
                    ItemSeparatorComponent = {this.FlatListItemSeparator}
                    renderItem= {item=> this.renderItem(item)}
                    keyExtractor= {item=>item.anomaly_description_id+""}
                />
            </View>
        )}


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:8
    },
    item: {
        paddingVertical: '2%',
        fontSize: 16,
        height: 'auto',
    },
});
export default Anomalies;