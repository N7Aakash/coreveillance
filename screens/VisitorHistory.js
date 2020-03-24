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
import Input from '../components/Input';
import {MaterialCommunityIcons} from "@expo/vector-icons";

class VisitorHistory extends React.Component {
    arrayholder = [];
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
                    this.arrayholder=responseJson;
                }


            }).catch((error) => {
            console.error(error);
        });
    }
    searchFilterFunction(text){
        // console.log(text);
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.visitor_visiting_flat.toUpperCase()}   
    ${item.visitor_visiting_wing.toUpperCase()} ${item.check_in.toUpperCase()} ${item.check_out.toUpperCase()}`;

            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({ dataSource: newData });
    }
    renderSearch = () => {
        const { navigation } = this.props;
        return (
            <Input
                right
                color="black"
                style={styles.search}
                placeholder="What are you looking for?"
                placeholderTextColor={'#8898AA'}
                onChangeText={text => this.searchFilterFunction(text)}
                // onFocus={() => navigation.navigate('Home')}
                // iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
                iconContent={<MaterialCommunityIcons  name="database-search" size={20}  color={argonTheme.COLORS.WARNING} />}
            />
        );
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
                <Card style={{padding: 10, marginHorizontal: 15,marginVertical: 10, backgroundColor: argonTheme.COLORS.WARNING}}>
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
                    {this.renderSearch()}
                    <Card style={{padding: 10, marginVertical: 10,marginHorizontal:15, backgroundColor: argonTheme.COLORS.WARNING}}>
                        <Text style={{textAlign: 'center', color: 'white'}}>Visitor History</Text>
                    </Card>
                    <Card style={{padding: 10, marginVertical: 10,marginHorizontal:15}}>
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
    },
    search: {
        height: 48,
        width: width - 32,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: argonTheme.COLORS.BORDER
    },
});

export default VisitorHistory;