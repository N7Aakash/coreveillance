import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Alert, Button, View,Text, TouchableOpacity, AsyncStorage} from 'react-native';
import { Block, theme } from 'galio-framework';
import argonTheme from "../constants/Theme";
import {Card} from 'react-native-shadow-cards';
import {MaterialIcons, MaterialCommunityIcons} from "@expo/vector-icons";
import Constants from "../constants/Constants";
const { width } = Dimensions.get('screen');

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todayVisitors: 0,
            totalVisitors: 0,
            totalAnomalies: 0,
            user_role_id:this.props.navigation.state.params.user_role_id ,
            getValue: 'DUMMY',

        };
            // {this.retrieveData("user_role_id")}
        // console.log("Home:" + this.state.user_role_id);


    }

    async retrieveData(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            // if (value !== null) {
            //     // We have data!!
            //     this.setState({
            //         [key]:value,
            //     })
            // }
            console.log(value);
        } catch (error) {
            // Error retrieving data
        }
    };

    getTodayVisitorCount = () => {
        fetch(Constants.API_PATH + 'getTodayVisitorsCount.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.text())
            .then((responseJson) => {

                this.setState({
                    todayVisitors: responseJson,
                })

            }).catch((error) => {
            console.error(error);
        });
    };
    getAnomaliesCount = () => {
        fetch(Constants.API_PATH + 'getAnomaliesCount.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.text())
            .then((responseJson) => {

                this.setState({
                    totalAnomalies: responseJson,
                })

            }).catch((error) => {
            console.error(error);
        });
    };
    getTotalVisitorCount = () => {
        fetch(Constants.API_PATH + 'getTotalVisitors.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.text())
            .then((responseJson) => {

                this.setState({
                    totalVisitors: responseJson,
                })

            }).catch((error) => {
            console.error(error);
        });
    };

    openTodayVisitorPage = () => {
        {
            this.props.navigation.navigate("todayVisitor")
        }
    };

    componentWillMount() {
        this.getTodayVisitorCount();
        this.getTotalVisitorCount();
        this.getAnomaliesCount();
    }

    openVisitorPage = () => {
        {
            this.props.navigation.navigate("Visitor")
        }
    };
    openRegisterVisitorPage = () => {
        {
            this.props.navigation.navigate("PicCamera")
        }
    };
    openManageVisitorPage = () => {
        {
            this.props.navigation.navigate("ManageVisitors")
        }
    };
    openAnomaliesPage = () => {
        {
            this.props.navigation.navigate("Anomalies")
        }
    };


    render() {
        return (
            <View>
                <Card style={styles.mainCard}>
                    <Block style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignContent: 'center',
                        paddingVertical: '2%'
                    }}>
                        <TouchableOpacity style={styles.cardButtons} onPress={this.openRegisterVisitorPage}>
                            <MaterialIcons style={styles.inputIcons} name="person-add" size={50} color="white"/>
                            <Text style={styles.cardButtonsText}>Add Visitor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardButtons} onPress={this.openManageVisitorPage}>
                            <MaterialIcons style={styles.inputIcons} name="streetview" size={50} color="white"/>
                            <Text style={styles.cardButtonsText}>Manage Visitors</Text>
                        </TouchableOpacity>

                    </Block>
                    <Block style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignContent: 'center',
                        paddingVertical: '2%'
                    }}>
                        <TouchableOpacity style={styles.cardButtons} onPress={this.openVisitorPage}>
                            <MaterialCommunityIcons style={styles.inputIcons} name="account-search" size={50}
                                                    color="white"/>
                            <Text style={styles.cardButtonsText}>View Visitors</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardButtons} onPress={this.openTodayVisitorPage}>
                            <Text style={styles.cardCountText}>{this.state.todayVisitors}</Text>
                            <Text style={styles.cardButtonsText}>Today's Visitor</Text>
                        </TouchableOpacity>
                    </Block>
                    <Block style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignContent: 'center',
                        paddingVertical: '2%'
                    }}>

                        <View style={styles.cardButtons}>
                            <Text style={styles.cardCountText}>{this.state.totalVisitors}</Text>
                            <Text style={styles.cardButtonsText}>Total Visitors</Text>
                        </View>
                        <TouchableOpacity style={styles.cardButtons} onPress={this.openAnomaliesPage}>
                            <Text style={styles.cardCountText}>{this.state.totalAnomalies}</Text>
                            <Text style={styles.cardButtonsText}>Total Anomalies</Text>
                        </TouchableOpacity>
                    </Block>
                </Card>

            </View>


        );

    }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  mainCard:{
    width:'auto',
    height:'100%',

    paddingVertical:'2%',
    paddingHorizontal:'2%'

  },
  cardButtons:{
    height: 150, width:150, backgroundColor:argonTheme.COLORS.WARNING,
    alignItems:'center',
    paddingVertical:40,
    borderRadius:20
  },
  cardButtonsText:{
    textAlign:'center',color:'white'
  },
  cardCountText:{
    textAlign:'center',color:'white',fontSize:40
  }
});

export default Home;
