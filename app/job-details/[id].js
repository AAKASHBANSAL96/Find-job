/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useCallback, useState} from 'react';
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../../components';
import {COLORS, icons, SIZES} from '../../constants';
import useFetch from '../../hook/useFetch';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as _ from 'lodash';
import styles from '../../styles/search';

const Stack = createNativeStackNavigator();
const tabs = ['About', 'Qualifications', 'Responsibilities'];

const MyStack = ({navigation, route}) => {
  const params = route.params;

  const {data, isLoading, error, refresh} = useFetch('job-details', {
    job_id: params.jobID,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const displayTabContent = () => {
    switch (activeTab) {
      case 'Qualifications':
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ?? ['N/A']}
          />
        );

      case 'Responsibilities':
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
          />
        );
      case 'About':
        return (
          <JobAbout info={data[0].job_description ?? 'No data provided'} />
        );
      default:
        break;
    }
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refresh();
    setRefreshing(false);
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: {backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
              handlePress={() => navigation.goBack()}
            />
          ),
          headerTitle: '',
        }}
        name="job-details-header"
        component={() => (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {isLoading ? (
                <View style={styles.loaderView}>
                  <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
              ) : error ? (
                <Text>Somthing went wrong</Text>
              ) : _.isEmpty(data) ? (
                <Text>No data</Text>
              ) : (
                <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                  <Company
                    companyLogo={data[0].employer_log}
                    jobTitle={data[0].job_title}
                    companyName={data[0].employer_name}
                    Location={data[0].job_country}
                  />
                  <JobTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                  {displayTabContent()}
                </View>
              )}
            </ScrollView>
            <JobFooter
              url={
                data[0]?.job_google_link ??
                'https://careers.google.com/jobs/results'
              }
            />
          </>
        )}
      />
    </Stack.Navigator>
  );
};

const JobDetails = ({navigation, route}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <MyStack navigation={navigation} route={route} />
    </SafeAreaView>
  );
};

export default JobDetails;
