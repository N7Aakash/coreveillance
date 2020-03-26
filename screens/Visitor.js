import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity, Image, TouchableWithoutFeedback, Dimensions,
} from "react-native";

import Input from '../components/Input';
const { height, width } = Dimensions.get('window');
import { Block, theme } from 'galio-framework';
import {Card} from 'react-native-shadow-cards';
import Constants from "../constants/Constants";
import {argonTheme} from "../constants";
import {Button} from "../components";
import {MaterialCommunityIcons} from "@expo/vector-icons";
class Visitor extends React.Component {
    arrayholder = [];
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: [],
            visitor_type: '',
        };
    }

    // console.log(this.props.navigation.state.params.visitor_type);
    sample = () => {
        console.log("Preesed Visitor Details");
    }

    componentDidMount() {
        fetch(Constants.API_PATH + 'getVisitors.php')
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    dataSource: responseJson
                });
                  //console.log(responseJson);
                this.arrayholder=responseJson;
            })
            .catch(error => console.log(error)) //to catch the errors if any

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
                width: "90%",
                marginLeft: "3%",
                backgroundColor: argonTheme.COLORS.WARNING,
            }}
            />
        );
    }
    printVisitorType(type){
        if(type  === '2')
            return "NEW VISITOR";
        else
            return "FREQUENT VISITOR";
    }
    renderItem = (data) =>


        <Card style={{padding: 10, marginHorizontal: 15, marginVertical: 10}}>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("VisitorDetails", {
                name: data.item.f_name + " " + data.item.l_name,
                email: data.item.email_id,
                phone: data.item.phone_no,
                image: data.item.image,
                guard_incharge: data.item.guard_incharge,
                date_first_visited: data.item.date_first_visited,
                visitor_type: data.item.visitor_type_id,
                visitor_id: data.item.visitor_id,
            })}>
                <Block style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignContent: 'center',
                    paddingVertical: '2%'
                }}>

                    <View>
                        <Image source={{uri: `data:image;base64,${data.item.image}`}} style={styles.logo}/>
                    </View>
                    <View>

                        <Text style={styles.item}>{data.item.f_name + " " + data.item.l_name}</Text>
                        <Text style={styles.item}>{data.item.email_id}</Text>
                        <Text style={styles.item}>{data.item.phone_no}</Text>
                        <Button
                            small
                            style={{backgroundColor: argonTheme.COLORS.WARNING, height: 50, width: 175, marginVertical:5}}
                        >
                            <Text style={{color: 'white'}}> {this.printVisitorType(data.item.visitor_type_id)}</Text>
                        </Button>

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
                {this.renderSearch()}
                <Card style={{padding: 10, marginHorizontal: 15,marginVertical:10,  backgroundColor: argonTheme.COLORS.WARNING}}>
                    <Text style={{textAlign:'center',color:'white'}}>All Time Visitors</Text>
                </Card>
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
export default Visitor;