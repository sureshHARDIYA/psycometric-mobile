import { Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  deviceWidth,
  deviceHeight,
  btnBorder: 1,
  btnRadius: 10,
  btnPadding: 7,
  formPadding: 15,

  header: 60,
  input: 40,
  inputRadius: 10,
  containerPadding: 10,
};
