import {StyleSheet} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export default StyleSheet.create({
  MainView: {
    backgroundColor:'#000'
  },
  loader: {
    flex: 1, 
    marginTop: hp(40), 
    alignItems:"center", 
    backgroundColor: '#FFF'
  },
  txtName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#36454F',
  },
  txtSmall: {
    fontSize: 14,
    color: '#63666A',
  },
  txtLarge : {
    color: '#FFF', 
    fontSize: 28, 
    fontWeight:'bold',
  },
  txtExtraLarge: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000'
  },
  txtSource : {
      color: '#FFF', 
      fontSize: 32, 
      fontWeight:'bold',
      fontStyle:'italic',
      color: 'yellow'
  },
  searchTxtInp: {
    width: wp(92),
    height: hp(7),
    alignSelf: "center",
    paddingHorizontal: wp(8),
    marginVertical: hp(2.5),
    color: '#36454F',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor:'#fff',
    borderRadius: 10
  },
});