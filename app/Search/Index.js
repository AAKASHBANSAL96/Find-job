/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text, SafeAreaView} from 'react-native';
import axios from 'axios';

import {ScreenHeaderBtn, NearbyJobCard} from '../../components';
import {COLORS, icons, SIZES} from '../../constants';
import styles from '../../styles/search';
import useFetch from '../../hook/useFetch';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const rapidApiKey = process.env.RAPID_API_KEY;

const JobSearch = ({navigation, route}) => {
  const params = route.params;

  const [searchResult, setSearchResult] = useState([]);
  console.log(
    '🚀 ~ file: Index.js:27 ~ JobSearch ~ searchResult:',
    searchResult,
  );

  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    setSearchLoader(true);
    setSearchResult([]);

    try {
      const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
        params: {
          query: params.searchTerm,
          page: page.toString(),
        },
      };
      console.log(
        '🚀 ~ file: Index.js:46 ~ handleSearch ~ params.searchTerm:',
        params.searchTerm,
      );

      const response = await axios.request(options);
      setSearchResult(response.data.data);
      setSearchLoader(false);
    } catch (error) {
      setSearchError(error);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  };

  const handlePagination = direction => {
    if (direction === 'left' && page > 1) {
      setPage(page - 1);
    } else if (direction === 'right') {
      setPage(page + 1);
    }
    handleSearch();
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      <View style={styles.customHeader}>
        <ScreenHeaderBtn
          iconUrl={icons.left}
          dimension="60%"
          handlePress={() => navigation.goBack()}
        />
      </View>
      {searchLoader ? (
        <View style={styles.loaderView}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : searchError ? (
        <Text>Somthing went wrong</Text>
      ) : (
        <>
          <FlatList
            data={searchResult}
            renderItem={({item}) => (
              <NearbyJobCard
                job={item}
                handleNavigate={() =>
                  navigation.navigate('Job-Details', {jobID: item?.job_id})
                }
              />
            )}
            keyExtractor={item => item.job_id}
            contentContainerStyle={{
              padding: SIZES.medium,
              rowGap: SIZES.medium,
            }}
            ListHeaderComponent={() => (
              <>
                <View style={styles.container}>
                  <Text style={styles.searchTitle}>{params.searchTerm}</Text>
                  <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
                </View>
                <View style={styles.loaderContainer}>
                  {searchLoader ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                  ) : (
                    searchError && <Text>Oops somthing went wrong</Text>
                  )}
                </View>
              </>
            )}
            ListFooterComponent={() => (
              <View style={styles.footerContainer}>
                <TouchableOpacity
                  style={styles.paginationButton}
                  onPress={() => handlePagination('left')}>
                  <Image
                    source={icons.chevronLeft}
                    style={styles.paginationImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <View style={styles.paginationTextBox}>
                  <Text style={styles.paginationText}>{page}</Text>
                </View>
                <TouchableOpacity
                  style={styles.paginationButton}
                  onPress={() => handlePagination('right')}>
                  <Image
                    source={icons.chevronRight}
                    style={styles.paginationImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}
    </>
  );
};

export default JobSearch;
