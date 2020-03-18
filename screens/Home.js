import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Alert, Button, View,Text, TouchableOpacity} from 'react-native';
import { Block, theme } from 'galio-framework';

import {Card} from 'react-native-shadow-cards';
import {MaterialIcons, MaterialCommunityIcons} from "@expo/vector-icons";
import registerForPushNotificationsAsync from "./registerForPushNotificationsAsync";

const { width } = Dimensions.get('screen');

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todayVisitors: 0,
      totalVisitors: 0,

    }
  }
  getTodayVisitorCount=()=>{
    fetch('http://192.168.43.52/ReactTemplates/argon/PHP/getTodayVisitors.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.text())
        .then((responseJson) => {

          this.setState({
            todayVisitors:responseJson,
          })

        }).catch((error) => {
      console.error(error);
    });
  };
  getTotalVisitorCount=()=>{
    fetch('http://192.168.43.52/ReactTemplates/argon/PHP/getTotalVisitors.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.text())
        .then((responseJson) => {

          this.setState({
            totalVisitors:responseJson,
          })

        }).catch((error) => {
      console.error(error);
    });
  };
  componentWillMount() {
    this.getTodayVisitorCount();
    this.getTotalVisitorCount();
  }

  openVisitorPage = ()=> {
    {  this.props.navigation.navigate("Visitor")}
  };
  openRegisterVisitorPage = ()=> {
    {  this.props.navigation.navigate("RegisterVisitor")}
  };
  openManageVisitorPage = ()=> {
    {  this.props.navigation.navigate("RegisterVisitor")}
  };

  render() {
    return (
        <View>
          <Card style={styles.mainCard}>
            <Block style={{flexDirection:'row',justifyContent:'space-around',alignContent:'center', paddingVertical:'2%'}}>
              <TouchableOpacity style={styles.cardButtons} onPress={this.openRegisterVisitorPage}>
                <MaterialIcons style={styles.inputIcons} name="person-add" size={50} color="white" />
                <Text style={styles.cardButtonsText}>Add Visitor</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardButtons} onPress={this.openManageVisitorPage}>
                <MaterialIcons style={styles.inputIcons} name="streetview" size={50} color="white" />
                <Text style={styles.cardButtonsText}>Manage Visitors</Text>
              </TouchableOpacity>

            </Block>
            <Block style={{flexDirection:'row',justifyContent:'space-around',alignContent:'center', paddingVertical:'2%'}}>
              <TouchableOpacity style={styles.cardButtons} onPress={this.openVisitorPage}>
                <MaterialCommunityIcons style={styles.inputIcons} name="account-search" size={50} color="white" />
                <Text style={styles.cardButtonsText}>View Visitors</Text>
              </TouchableOpacity>
            </Block>
            <Block style={{flexDirection:'row',justifyContent:'space-around',alignContent:'center', paddingVertical:'2%'}}>
              <TouchableOpacity style={styles.cardButtons} onPress={this.openRegisterVisitorPage}>
                <Text style={styles.cardCountText} >{this.state.todayVisitors}</Text>
                <Text style={styles.cardButtonsText}>Today's Visitor</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardButtons} onPress={this.openManageVisitorPage}>
                <Text style={styles.cardCountText} >{this.state.totalVisitors}</Text>
                <Text style={styles.cardButtonsText}>Total Visitors</Text>
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
    height: 150, width:150, backgroundColor:'#04456b',
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
