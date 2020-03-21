import React from 'react';

import {
    StyleSheet,
    Dimensions,
    ScrollView,
    Alert,
    ActivityIndicator,
    View,
    FlatList,
    Text,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
import {argonTheme} from "../constants";
import Constants from "../constants/Constants";
const { width } = Dimensions.get('screen');

class Anomaly extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anomaly_images: [],
            isLoading: true,

        }
    }
   async getData(){
        let response =  fetch(Constants.API_PATH+'image_get.php');
        let responseJson = await response.json();
       // console.log(responseJson);
        console.log("Images : " + JSON.stringify(responseJson));
        let anomaly_images=this.state.anomaly_images;
        this.setState({
            anomaly_images:anomaly_images.concat(responseJson),
            isLoading:false,
        });



    };

componentWillMount() {
    this.getData()
}

    FlatListItemSeparator=()=>{
    return(
    <View style={{
        height:.5,
        width:"100%",
        backgroundColor:'rgba(255,255,255)'
    }}>
    </View>
    )
    }

    renderImage=(data) => {
        const logoData=data.item.image;
        const cardContainer = [styles.card, styles.shadow];
        const imgContainer = [styles.imageContainer,
            styles.shadow
        ];
        return(
            <Block  card flex style={cardContainer}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AnomalyDetail',{
                    anomaly_type_text: data.item.anomaly_type_text,
                    anomaly_title:data.item.anomaly_title,
                    anomaly_text:data.item.anomaly_text,
                    anomaly_frame:data.item.anomaly_frame,
                    anomaly_image:logoData
                })} >
                        <Block>
                            <Block flex style={imgContainer}>
                                <Image source={{uri: `data:image;base64,${logoData}`}} style={styles.logo}/>
                            </Block>
                            <Block flex space="between" style={styles.cardDescription}>
                                <Text size={14} style={styles.cardTitle}>{data.item.anomaly_type_text}</Text>
                            </Block>
                         </Block>
                </TouchableWithoutFeedback>
            </Block>
        )
    }

    renderArticles = (message) => {
        if(this.state.isLoading){
            return(
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={'large'} color={'red'}/>
                </View>
            )
        }
        else {
            return(
                <FlatList
                    data={this.state.anomaly_images}
                    //here the data is wrapped within a property with key item in the next line
                    ItemSeparatorComponent ={this.FlatListItemSeparator}
                    renderItem={item => this.renderImage(item)}
                    keyExtractor={(data,index) => data.anomaly_id + ""}
                />


            )
        }

    };


    render(){
        return (
            <Block flex center style={styles.home}>
                {this.renderArticles()}
                {/*<Text>Hi</Text>*/}
            </Block>
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
    loadingContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    logo: {
        width: 350,
        height: 150,
        position: 'relative',

    },
    cardTitle: {
        flex: 1,
        flexWrap: 'wrap',
        paddingBottom: 6,
        fontSize:24,
    },
    cardDescription: {
        padding: theme.SIZES.BASE / 2
    },
});


export default Anomaly;
