import moment from "moment-timezone";
import * as Localization from "expo-localization";

export const JSONToString = (data) => {
    return JSON.stringify(data);
}

export const StringToJSON = (data) => {
    return JSON.parse(data);
}

export const currentTime = moment.utc(new Date()).tz(Localization.timezone).format("DD-MM-YYYY HH:mm:ss")