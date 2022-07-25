import React , { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput
}
from 'react-native';
import styles from "./styles";
import axios from 'axios';
import EventsDisplay from './EventsDisplay';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';


const DashBoard = () => {

    // Search Text entered by user in the 'Search box'
    const [search, setSearch] = useState('');

    // masterDataSource to store the originally fetched data
    const [masterDataSource, setMasterDataSource] = useState([]);  
    // filteredDataSource to store the data filtered according to the search Text
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    
    const [loader, setLoader] = useState(true);
    const [isError, setIsError] = useState(false);

    // Fetch the data when the component renders for the first time
    useEffect( ()=> {
        getNews();
    }, []);

    // Function to fetch data from API
    const getNews = async () => {
        
        await axios
        .get(
            "https://gnews.io/api/v4/search?q=example&token=d879626f417f5dc5b462c1e531c2fea2&lang=en"
        )
        .then( (res) => {
            console.log("Response is -", res.data.articles.length);
            // set both the data sets to the fetched data.
            setMasterDataSource(res.data.articles);
            setFilteredDataSource(res.data.articles);

            // Set Loader to false once data is fetched and set in state
            setLoader(false);
        })
        .catch((err) => {
            // Set error flag to true and disable the loader
            setIsError(true);
            setLoader(false);
        });
    };


    // Function to search through the 'title' for user entered search text .
    const searchFilterFunction = (text) => {
        
        // Check whether search string is empty
        if (text) {
            // traverse through the original data
            const newData = masterDataSource.filter(function (item) {

                // convert the current records data to Uppercase
                const itemTitle =   item.title ? item.title.toUpperCase() : ''.toUpperCase();
                const itemSourceName = item.source.name ? item.source.name.toUpperCase() : ''.toUpperCase();

                // convert search text to Uppercase
                const textData = text.toUpperCase();
        
                // Check if current record 'title', 'source.name' matches with the user entered Search string
                //   if yes - return the record and save it to 'newData'
                if (itemTitle.indexOf(textData) > -1) {
                    return true;
                } else if (itemSourceName.indexOf(textData) > -1) {
                    return true;
                }
          });
    
          // The records which matched the search string are being set to "filteredDataSource" 
          // which in turn will be rendered on the screen.
          setFilteredDataSource(newData);
          setSearch(text);
        } 
        else {   // search text is empty, display all the original records
          setFilteredDataSource(masterDataSource);
          setSearch(text);
        }
    };
    
    // Function to render each record which is in 'filteredDataSource' array
    const renderConnections = () => {
        const items = [];

        // check whether 'filteredDataSource' has data
        if (filteredDataSource.length > 0) {
            for (let item of filteredDataSource) {
                // push the items to be rendered into 'items' array
                // 'EventsDisplay' component is used to render each of the record
                items.push(
                            <EventsDisplay key={item.title} eventData={item} />
                );
            }
        }
        // return the 'items' array
        return items;
    };

    return(
        <View style={styles.MainView}>

            {/* If data is not ready display the loader */}
            { loader ? (
                <View style={styles.loader}>
                    <Text style={ styles.txtName }>Loading data.......</Text>
                </View>
            ) : isError ?  (    // if error in fetching data, display error message
                <View style={styles.loader}>
                    <Text style={ styles.txtName }>Couldn't fetch data.</Text>
                    <Text style={{ ...styles.txtName , marginTop: hp(1)}}>Please try again later</Text>
                </View>
            )
            :(  // Display the data from 'filteredDataSource' (if search string is blank, all the data will be displayed)
                <View style={{ height: hp(100)}}>
                    <View>
                        {/* Display the Search Box */}
                        <TextInput
                            placeholder={"Search"}
                            placeholderTextColor='#36454F'
                            style={styles.searchTxtInp}
                            maxLength={30}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={search}
                            clearButtonMode="always"
                            // when user enters text, call the "searchFilterFunction" to search the master data
                            onChangeText={text => searchFilterFunction(text)}
                        />
                    </View>
                    <View style={{ height: hp(2)}}></View>

                    {/* renderConnections function will render the data records to be displayed */}
                    <ScrollView>
                        {renderConnections()}                        
                    </ScrollView>
                </View>
                )
            }            
        </View>
    );
}

export default DashBoard;