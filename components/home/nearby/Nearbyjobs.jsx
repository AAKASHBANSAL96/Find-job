/* eslint-disable react/react-in-jsx-scope */
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {COLORS, SIZES} from '../../../constants';
import styles from './nearbyjobs.style';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import useFetch from '../../../hook/useFetch';
import {isArray, isEmpty} from 'lodash';

const Nearbyjobs = ({navigation}) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setIsError] = useState(false);
  const {data, isLoading, error} = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <View style={styles.loaderView}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : error ? (
          <Text>Somthing went wrong</Text>
        ) : (
          !isEmpty(data) &&
          isArray(data) &&
          data?.map(job => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => {
                navigation.navigate('Job-Details', {jobID: job?.job_id});
              }}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
