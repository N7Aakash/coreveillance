import React from "react";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    ImageBackground,
    Platform, View
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button } from "../components";
import {Card} from 'react-native-shadow-cards';
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class AboutUs extends React.Component {
    render() {
        return (
            <Block flex style={styles.profile}>
                <ImageBackground
                    source={Images.ProfileBackground}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >
                <Block flex>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ width, marginTop: '15%' }}
                        >
                            <Block flex style={styles.profileCard}>
                                <Block style={styles.info}>
                                    <Block>
                                        <Image source={{uri: `data:image;base64,${Images.logoData}`}} style={styles.logo} />
                                        <Image source={{uri: `data:image;base64,${Images.lineData}`}} style={styles.catchLine} />
                                    </Block>

                                </Block>
                                <Block flex>
                                    <Block
                                        middle
                                        row
                                        space="evenly"
                                        style={{ marginVertical: '5%' }}
                                    >
                                        <Button
                                            small
                                            style={{ backgroundColor: argonTheme.COLORS.WARNING, height:50, width:'auto', }}
                                        >
                                            <Text style={{color:'white'}}> DEVELOPMENT TEAM </Text>
                                        </Button>

                                    </Block>
                                    <Block style={styles.devTeam}>
                                    <Block style={styles.avatarContainer}>
                                        <Card style={{padding:10, width:'auto',height:'auto'}}>
                                            <Image source={{uri: `data:image;base64,${Images.Akash}`}} style={[styles.avatar]} />
                                        <Block middle style={styles.devTeamInfo}>
                                        <Text style={{color:argonTheme.COLORS.WARNING}}>Akash Narang</Text><Text style={{color:argonTheme.COLORS.ERROR}}>CMPN D17A 29</Text>
                                        </Block>
                                        </Card>
                                        <Card style={{padding:10, width:'auto',height:'auto'}}>
                                            <Image source={{uri: `data:image;base64,${Images.Chirag}`}} style={styles.avatar} resizeMode="cover"/>
                                            <Block middle style={styles.devTeamInfo}>
                                                <Text style={{color:argonTheme.COLORS.WARNING}}>Chirag Raghani</Text><Text style={{color:argonTheme.COLORS.ERROR}}>CMPN D17B 55</Text>
                                            </Block>
                                        </Card>
                                    </Block>
                                        <View style={{
                                            height: .5 * 2,
                                            width:"94%",
                                            marginLeft:"3%",
                                            marginTop:'10%',
                                            marginBottom:'10%',
                                            backgroundColor:argonTheme.COLORS.WARNING,
                                        }}
                                        />

                                        <Block style={[styles.avatarContainer]}>
                                            <Card style={{padding:10, width:'auto',height:'auto'}}>
                                                <Image source={{uri: `data:image;base64,${Images.Dhiren}`}} style={[styles.avatar]} />
                                                <Block middle style={styles.devTeamInfo}>
                                                    <Text style={{color:argonTheme.COLORS.WARNING}}>Dhiren Chotwani</Text><Text style={{color:argonTheme.COLORS.ERROR}}>CMPN D17B 11</Text>
                                                </Block>
                                            </Card>
                                            <Card style={{padding:10, width:'auto',height:'auto'}}>
                                                <Image source={{uri: `data:image;base64,${Images.Piyu}`}} style={styles.avatar} resizeMode="cover"/>
                                                <Block middle style={styles.devTeamInfo}>
                                                    <Text style={{color:argonTheme.COLORS.WARNING}}>Piyu Lalchandani</Text><Text style={{color:argonTheme.COLORS.ERROR}}>CMPN D17C 34</Text>
                                                </Block>
                                            </Card>
                                        </Block>

                                        <Block
                                            middle
                                            row
                                            space="evenly"
                                            style={{ marginTop: '20%' }}
                                        >
                                            <Button
                                                small
                                                style={{ backgroundColor: argonTheme.COLORS.WARNING, height:50, width:'auto', }}
                                            >
                                                <Text style={{color:'white'}}> MENTOR </Text>
                                            </Button>

                                        </Block>
<Block style={{flexDirection:'row',alignItems:'center',
    justifyContent:'space-between', marginHorizontal:'28%',marginTop:'20%'}}>

                                            <Card style={{padding:10, width:'auto',height:'auto'}}>
                                                <Image source={{uri: `data:image;base64,${Images.LifnaMaam}`}} style={[styles.avatar]} />
                                                <Block middle style={styles.devTeamInfo}>
                                                    <Text style={{color:argonTheme.COLORS.WARNING}}>Mrs. Lifna C.S</Text><Text style={{color:argonTheme.COLORS.ERROR,fontSize:12}}>Comp. Department </Text>
                                                    <Text style={{color:argonTheme.COLORS.ERROR, width:'auto',fontSize:12}}>Assistant Professor</Text>
                                                </Block>
                                            </Card>

</Block>
                                </Block>
                                </Block>
                                <Block center>
                                    <Button
                                        style={styles.button}
                                        color={argonTheme.COLORS.SECONDARY}
                                        onPress={() => this.props.navigation.navigate("Home")}
                                        textStyle={{ color: argonTheme.COLORS.WHITE }}
                                    >
                                        Get STARTED!
                                    </Button>
                                </Block>
                            </Block>
                        </ScrollView>

                </Block>
                </ImageBackground>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    profile: {
        marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
        // marginBottom: -HeaderHeight * 2,
        flex: 1
    },
    profileContainer: {
        width: width,
        height: '100%',
        padding: 0,
        zIndex: 1
    },
    profileBackground: {
        width: width,
        height:'100%'
    },
    profileCard: {
        // position: "relative",
        padding: theme.SIZES.BASE,
        marginHorizontal: theme.SIZES.BASE,
        marginTop: 65,
        borderRadius: 6,
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2,
        height:'auto',
        marginBottom: 65,
    },
    info: {
        marginVertical:'10%',
        alignItems:'center',
        justifyContent:'space-between',
    },
    avatarContainer: {
        position: "relative",
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
        width:'100%',
        paddingHorizontal:'2%',
    },
    avatar: {
        width: 124,
        height: 124,
        borderRadius: 62,
        borderWidth: 2,
        borderColor: argonTheme.COLORS.WARNING,
    },
    nameInfo: {
        marginTop: 35
    },
    divider: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#E9ECEF"
    },
    thumb: {
        borderRadius: 4,
        marginVertical: 4,
        alignSelf: "center",
        width: thumbMeasure,
        height: thumbMeasure
    },
    logo: {
        width: 300,
        height: 45,
        zIndex: 2,
        position: 'relative',
        paddingVertical:20
        // marginRig: '-50%'
    },
    catchLine:{
        width: 300,
        height: 30,
        zIndex:2,
        position: 'relative',
        paddingVertical:20
    },
    devTeam:{
        justifyContent:'space-around',
        alignContent:'center',
        paddingVertical:'2%'
    },
    devTeamInfo:{
        justifyContent:'space-around',
        alignContent:'center',
        paddingVertical:'2%',
        marginTop:15,
    },
    button: {
        width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        backgroundColor:argonTheme.COLORS.WARNING,

    },
});

export default AboutUs;
