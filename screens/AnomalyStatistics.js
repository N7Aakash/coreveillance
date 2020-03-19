import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity
} from "react-native";
class AnomalyStatistics extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Source Listing",
            headerStyle: {backgroundColor: "#fff"},
            headerTitleStyle: {textAlign: "center",flex: 1}
        };
    };
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Hi</Text>
            </View>
        )}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
});
export default AnomalyStatistics;