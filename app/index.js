/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {COLORS, icons, images, SIZES} from '../constants';
import {Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome} from '../components';
import Company from '../components/jobdetails/company/Company';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import JobDetails from './job-details/[id]';
import HomePage from './Home';
import JobSearch from './Search/Index';

const MyStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
            ),
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
            ),
            headerTitle: '',
          }}
          name="Home"
          component={HomePage}
        />
        <Stack.Screen name="Company" component={Company} />
        <Stack.Screen
          name="Job-Details"
          component={JobDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Search"
          component={JobSearch}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function Home() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <MyStack />
    </SafeAreaView>
  );
}
