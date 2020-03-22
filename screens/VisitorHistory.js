import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    Dimensions, Alert, TouchableWithoutFeedback, Image
} from "react-native";
import {Card} from 'react-native-shadow-cards';
import {Block,Button} from "galio-framework";
import {argonTheme} from "../constants";
import Constants from "../constants/Constants";
const { width, height } = Dimensions.get("screen");
class VisitorHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: []
        };
        console.log(this.props.navigation.state.params.visitor_id);
    }

    componentDidMount() {
        fetch(Constants.API_PATH + 'getVisitorHistory.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                visitor_id: this.props.navigation.state.params.visitor_id
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                //
                 console.log(responseJson);
                if(responseJson === "No History ! Please enter some History for display")
                    console.log(responseJson);
                else {
                    this.setState({
                        loading: false,
                        dataSource: responseJson
                    })
                }


            }).catch((error) => {
            console.error(error);
        });
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
                <Block style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingVertical: '2%'
                }}>

                    <View>


                        <Text style={styles.item}>Wing: {data.item.visitor_visiting_wing}</Text>
                        <Text style={styles.item}>Flat: {data.item.visitor_visiting_flat}</Text>
                        <Text style={styles.item}>Number of People: {data.item.person}</Text>
                        <Text style={styles.item}>Check in: {data.item.check_in}</Text>
                        <Text style={styles.item}>Check in Incharge:    {data.item.check_in_incharge}</Text>
                        <Text style={styles.item}>Check out:    {data.item.check_out}</Text>
                        <Text style={styles.item}>Check out Incharge:   {data.item.check_out_incharge}</Text>


                    </View>

                </Block>
        </Card>;

    render() {
        if (this.state.dataSource.length === 0) {
            return (
                <Card style={{padding: 10, margin: 10, backgroundColor: argonTheme.COLORS.WARNING}}>
                    <Text style={{textAlign: 'center', color: 'white'}}>No Visitor History!</Text>
                </Card>
            )
        } else {
            if (this.state.loading) {
                return (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="red"/>
                    </View>
                )
            }
            return (
                <View style={styles.container}>
                    <Card style={{padding: 10, margin: 10, backgroundColor: argonTheme.COLORS.WARNING}}>
                        <Text style={{textAlign: 'center', color: 'white'}}>Visitor History</Text>
                    </Card>
                    <Card style={{padding: 10, margin: 10}}>
                        <Block style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignContent: 'center',
                            paddingVertical: '2%'
                        }}>
                            <View>
                                <Text
                                    style={styles.item}>{this.state.dataSource[0]['f_name'] + " " + this.state.dataSource[0]['l_name']}</Text>
                                <Text style={styles.item}>{this.state.dataSource[0]['phone_no']}</Text>
                            </View>
                            <View>
                                <Text style={styles.item}>{this.state.dataSource[0]['email_id']}</Text>
                                <Text style={styles.item}>{this.state.dataSource[0]['date_first_visited']}</Text>
                            </View>
                        </Block>
                    </Card>
                    <FlatList

                        data={this.state.dataSource}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={item => this.renderItem(item)}
                        keyExtractor={item => item.visitor_visiting_id + ""}
                    />
                </View>
            )
        }
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

export default VisitorHistory;