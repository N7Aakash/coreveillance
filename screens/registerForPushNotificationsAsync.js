import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';


export default async function registerForPushNotificationsAsync() {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
        alert('No notification permissions!');
        return;
    }

    // Get the token that identifies this device
    let token=  await Notifications.getExpoPushTokenAsync();
    return  token;

}