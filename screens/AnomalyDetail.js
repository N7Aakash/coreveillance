import React from 'react';
import {
  Text, View, Button, Image, StyleSheet
} from 'react-native';
import {Block, theme} from "galio-framework";
import {Card} from 'react-native-shadow-cards';

export default class AnomalyDetail extends React.Component {

  render() {
    return (
        <View style={styles.container}>
            <Card style={styles.mainCard}>
                <Card style={{padding: 10, margin: 10}}>
                    <Text style={{textAlign:'center'}}>{this.props.navigation.state.params.anomaly_type_text}</Text>
                </Card>
          <Card style={{padding: 10, margin: 10, height:174}}>
              <Image source={{uri: `data:image;base64,${this.props.navigation.state.params.anomaly_image}`}} style={styles.logo}/>
          </Card>
                <Card style={{padding: 10, margin: 10, height: 'auto'}}>
                    <Text>Anomaly Title:    {this.props.navigation.state.params.anomaly_title}</Text>
                    <Text>Anomaly Text :    {this.props.navigation.state.params.anomaly_text}</Text>
                    <Text>Anomaly Frame:    {this.props.navigation.state.params.anomaly_frame}</Text>
                </Card>
          <Card style={{padding: 10, margin: 10}}>
            <Button
                onPress={()=>{this.props.navigation.navigate("Anomaly")}}
                title="Go Back"
                color="darkred"
            />
          </Card>

            </Card>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    width: 350,
    height: 150,
    position: 'relative',

  },
    mainCard:{
        width:'100%',
        height:'auto',
        marginTop:'30%',
        paddingVertical:'2%',
        paddingHorizontal:'2%',


    }
});
