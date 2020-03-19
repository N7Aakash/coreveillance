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
class todayVisitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource:[]
        };
    }
    componentDidMount(){
        fetch('http://192.168.43.52/ReactTemplates/argon/PHP/getTodayVisitors.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.text())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    dataSource: responseJson
                });
                 console.log(responseJson);

            }).catch((error) => {
            console.error(error);
        });
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


        <Card style={{padding: 10, margin: 10}}>
            <TouchableWithoutFeedback>
                <Block style={{flexDirection:'row',justifyContent:'space-around',alignContent:'center', paddingVertical:'2%'}}>

                    <View>
                        <Image source={{uri: `data:image;base64,${data.item.image}`}} style={styles.logo}/>
                    </View>
                    <View>

                        <Text style={styles.item}>{data.item.f_name + " " + data.item.l_name }</Text>
                        <Text style={styles.item}>{data.item.email_id}</Text>
                        <Text style={styles.item}>{data.item.phone_no}</Text>

                    </View>
                </Block>
            </TouchableWithoutFeedback>
        </Card>;

    render(){
        if(this.state.loading){
            return(
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="red"/>
                </View>
            )}
        return(
            <View style={styles.container}>
                <Card style={{padding: 10, margin: 10}}>
                    <Text style={{textAlign:'center'}}>Today  Visitors</Text>
                </Card>
                {/*<FlatList*/}

                {/*    data= {this.state.dataSource}*/}
                {/*    ItemSeparatorComponent = {this.FlatListItemSeparator}*/}
                {/*    renderItem= {item=> this.renderItem(item)}*/}
                {/*    keyExtractor= {item=>item.email_id+""}*/}
                {/*/>*/}
                <Text>HI</Text>
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
export default todayVisitor;