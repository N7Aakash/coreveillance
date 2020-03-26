import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity, Dimensions,
} from "react-native";
import {Card} from "react-native-shadow-cards";
import {Block, theme} from "galio-framework";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import argonTheme from "../constants/Theme";
const { width } = Dimensions.get('screen');
class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    openVisitorStatsPage=()=>{
        this.props.navigation.navigate("VisitorsStats");
}
    openAnomaliesStatsPage=()=>{
        this.props.navigation.navigate("AnomaliesStats");
    }
    render() {
        return (
            <View>
                <Card style={styles.mainCard}>
                    {/*<Block style={{*/}
                    {/*    flexDirection: 'row',*/}
                    {/*    justifyContent: 'space-around',*/}
                    {/*    alignContent: 'center',*/}
                    {/*    paddingVertical: '2%'*/}
                    {/*}}>*/}
                    {/*    <TouchableOpacity style={styles.cardButtons} onPress={this.openRegisterVisitorPage}>*/}
                    {/*        <MaterialIcons style={styles.inputIcons} name="person-add" size={50} color="white"/>*/}
                    {/*        <Text style={styles.cardButtonsText}>Add Visitor</Text>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*    <TouchableOpacity style={styles.cardButtons} onPress={this.openManageVisitorPage}>*/}
                    {/*        <MaterialIcons style={styles.inputIcons} name="streetview" size={50} color="white"/>*/}
                    {/*        <Text style={styles.cardButtonsText}>Manage Visitors</Text>*/}
                    {/*    </TouchableOpacity>*/}

                    {/*</Block>*/}
                    {/*<Block style={{*/}
                    {/*    flexDirection: 'row',*/}
                    {/*    justifyContent: 'space-around',*/}
                    {/*    alignContent: 'center',*/}
                    {/*    paddingVertical: '2%'*/}
                    {/*}}>*/}
                    {/*    <TouchableOpacity style={styles.cardButtons} onPress={this.openVisitorPage}>*/}
                    {/*        <MaterialCommunityIcons style={styles.inputIcons} name="account-search" size={50}*/}
                    {/*                                color="white"/>*/}
                    {/*        <Text style={styles.cardButtonsText}>View Visitors</Text>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*    <TouchableOpacity style={styles.cardButtons} onPress={this.openTodayVisitorPage}>*/}
                    {/*        <Text style={styles.cardCountText}>{this.state.todayVisitors}</Text>*/}
                    {/*        <Text style={styles.cardButtonsText}>Today's Visitor</Text>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</Block>*/}
                    <Block style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignContent: 'center',
                        paddingVertical: '2%'
                    }}>

                        <TouchableOpacity style={styles.cardButtons} onPress={this.openVisitorStatsPage}>
                            <Text style={styles.cardCountText}>{this.state.totalVisitors}</Text>
                            <Text style={styles.cardButtonsText}>Visitors Stats</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardButtons} onPress={this.openAnomaliesStatsPage}>
                            <Text style={styles.cardCountText}>{this.state.totalAnomalies}</Text>
                            <Text style={styles.cardButtonsText}>Anomalies Stats</Text>
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

export default Statistics;