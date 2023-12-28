/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {icons, SIZES} from '../../../constants';
import styles from './welcome.style';
import {isEmpty} from 'lodash';

const jobTypes = ['Full-time', 'Part-time', 'Contractor'];

const Welcome = ({navigation}) => {
  const [activeJobType, setActiveJobType] = useState('Full-time');
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Aakash</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={text => {
              setSearchTerm(text);
            }}
            placeholder="What are you looking for?"
          />
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            console.log('on pressss');
            if (!isEmpty(searchTerm)) {
              navigation.navigate('Search', {searchTerm});
            }
          }}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                setSearchTerm('');
                navigation.navigate('Search', {searchTerm: item});
              }}>
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{columnGap: SIZES.small}}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
