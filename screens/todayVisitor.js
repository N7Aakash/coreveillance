import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity, Image, TouchableWithoutFeedback,Dimensions
} from "react-native";
import  { Block, theme } from 'galio-framework';

import Input from '../components/Input';
const { height, width } = Dimensions.get('window');
import {Card} from 'react-native-shadow-cards';
import Constants from "../constants/Constants";
import {argonTheme} from "../constants";
import {MaterialCommunityIcons} from "@expo/vector-icons";
class todayVisitor extends React.Component {
    arrayholder = [];
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource:[]
        };
    }
    componentDidMount(){
        fetch(Constants.API_PATH+'/getTodayVisitors.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson === "No Visitor ! Please enter some Visitors for display ")
                    console.log(responseJson);
                else {
                    this.setState({
                        loading: false,
                        dataSource: responseJson
                    });
                    this.arrayholder=responseJson;
                }


            }).catch((error) => {
            console.error(error);
        });
    }
    searchFilterFunction(text){
        // console.log(text);
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.f_name.toUpperCase()}   
    ${item.l_name.toUpperCase()} ${item.phone_no.toUpperCase()} ${item.email_id.toUpperCase()}`;

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
                width:"90%",
                marginLeft:"3%",
                backgroundColor:argonTheme.COLORS.WARNING,
            }}
            />
        );
    }
    renderItem(item){
        console.log(item);
        return(
            <Card style={{padding: 10, marginVertical: 10,marginHorizontal:15}}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("TodayVisitorDetails",{
                    visitor_id:item.visitor_id,
                    name:item.f_name + " " + item.l_name,
                    email:item.email_id,
                    phone:item.phone_no,
                    image:item.image,
                    visitor_type:item.visitor_type_id,
                })}>
                    <Block style={{flexDirection:'row',justifyContent:'space-around',alignContent:'center', paddingVertical:'2%'}}>

                        <View>
                            <Image source={{uri: `data:image;base64,${item.image}`}} style={styles.logo}/>
                        </View>
                        <View>

                            <Text style={styles.item}>{item.f_name + " " + item.l_name }</Text>
                            <Text style={styles.item}>{item.email_id}</Text>
                            <Text style={styles.item}>{item.phone_no}</Text>

                        </View>
                    </Block>
                </TouchableWithoutFeedback>
            </Card>);
    }

    render() {
        if (this.state.dataSource.length === 0) {
            return (
                <Card style={{padding: 10, marginHorizontal: 15,marginVertical:10,  backgroundColor: argonTheme.COLORS.WARNING}}>
                    <Text style={{textAlign:'center', color:'white'}}>No Visitors to Check-out!</Text>
                </Card>
            )
        }
        else{
        if(this.state.loading){
            return(
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="red"/>
                </View>
            )}
        return(
            <View style={styles.container}>
                {this.renderSearch()}
                <Card style={{padding: 10, marginHorizontal: 15,marginVertical:10, backgroundColor: argonTheme.COLORS.WARNING}}>
                    <Text style={{textAlign:'center',color:'white'}}>Today Visitors</Text>
                </Card>
                <FlatList

                    data= {this.state.dataSource}
                    ItemSeparatorComponent = {this.FlatListItemSeparator}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor= {item=>item.email_id+""}
                />

            </View>
        )}}

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
    search: {
        height: 48,
        width: width - 32,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: argonTheme.COLORS.BORDER
    },
});
export default todayVisitor;