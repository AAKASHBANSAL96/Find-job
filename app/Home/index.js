import React, {useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from '../../components';
import {COLORS, icons, images, SIZES} from '../../constants';

const HomePage = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1, padding: SIZES.medium}}>
        <Welcome navigation={navigation} />
        <Popularjobs navigation={navigation} />
        <Nearbyjobs navigation={navigation} />
      </View>
    </ScrollView>
  );
};

export default HomePage;
