import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import {AsyncStorage,Alert} from "react-native";


export default  function logout() {
     AsyncStorage.removeItem("email");
    AsyncStorage.removeItem("name");
    AsyncStorage.removeItem("flat_no");
    AsyncStorage.removeItem("phone_no");
    AsyncStorage.removeItem("wing");
    AsyncStorage.removeItem("user_role");
    AsyncStorage.removeItem("user_role_id");
    Alert.alert("You've been logged out");
    this.navigation.navigate("Login");


}