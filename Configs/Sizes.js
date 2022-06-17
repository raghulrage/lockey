import { RFValue } from "react-native-responsive-fontsize"; 
import { Dimensions } from "react-native";

const SIZES = {
    TINY: RFValue(10),
	SMALLER: RFValue(12),
	SMALL: RFValue(14),
	LEGIBLE: RFValue(16),
	LARGE: RFValue(18),
	LARGER: RFValue(20),
	GIGANTIC: RFValue(24),
    SCREEN_WIDTH: Dimensions.get('window').width,
    SCREEN_HEIGHT : Dimensions.get('window').height,
}

export default SIZES;