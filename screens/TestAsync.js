import React from "react";
import{
    Text,
    AsyncStorage,

}from "react-native";

class TestAsync extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserEmail: '',
            UserPassword: '',
            UserFlat: '',
        }

    }
  async  storeData(key,data){
        try {
            await AsyncStorage.setItem(key, data);
        } catch (error) {
            // Error saving data
        }
        console.log("test async");
    };
    async retrieveData(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // We have data!!
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    };
    componentDidMount() {
        {this.storeData("data","passing")}
        {this.retrieveData("data")}
    }

    render(){
        return (
         <Text>HI</Text>

        );
    }
}

export default TestAsync;