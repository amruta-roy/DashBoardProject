import React from 'react';
import { 
    Text, 
    View, 
    ImageBackground
} from 'react-native';
import moment from 'moment';
import styles from './styles';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';


const DisplayDate = (props) => {
    return (
        <View style={{ height: hp(10), flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal: wp(4) , borderTopWidth: 1, borderColor: '#3E505C'}}>
            <Text style={{ color: '#FFF', fontSize: 20, fontWeight:'bold'}}>
                {moment.utc(props.date).local().startOf('seconds').fromNow()}
            </Text>
            <Text style={{ color: '#FFF', fontSize: 46, height:"100%" }}>
                ...
            </Text>
        </View>
    )
}

const EventsDisplay = (props) => {
    const eventData = props.eventData;

    // console.log("EventData:",props.eventData.publishedAt);
    
    return (
        <>
                <ImageBackground
                        key={eventData.title}
                        source={{ uri: eventData.image }} 
                        resizeMode="cover" 
                        style={{ width: wp(92), height: hp(37) , flexDirection: 'column', alignSelf:'center'}} imageStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
                </ImageBackground>
                <View style={{ flexDirection:'column', height: hp(32), width: wp(92), marginHorizontal:wp(4), backgroundColor:'#242F36'}}>
                    <Text style={{ ...styles.txtSource, marginVertical: hp(2), width:'100%', paddingHorizontal: wp(4) }}>
                        { eventData.source.name }
                    </Text>
                    <Text style={{ ...styles.txtLarge, marginTop: hp(0.5), width:'100%', paddingHorizontal: wp(4) }}>
                        {eventData.title.length > 90 ? eventData.title.slice(0 , 90) + " ..." : eventData.title}
                    </Text>
                </View>
                <View style={{ height: hp(11), width: wp(92), marginHorizontal:wp(4), backgroundColor:'#242F36', borderBottomLeftRadius: 25, borderBottomRightRadius: 25}}>
                    <DisplayDate 
                        date={eventData.publishedAt} 
                    />
                </View>
                <View style={{height:hp(2)}}></View>
        </>
    );
}

export default EventsDisplay;