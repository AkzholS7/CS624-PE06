import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import CenterMessage from '../components/CenterMessage';
import { colors } from '../theme';
import { CityType, LocationType } from '../types'; // adjust if your types path differs

type CitiesProps = {
  cities: CityType[];
  navigation: any;
  addLocation: (location: LocationType, city: CityType) => void;
};

export default class Cities extends React.Component<CitiesProps> {
  navigate = (item: CityType) => {
    this.props.navigation.navigate('City', {
      city: item,
      cities: this.props.cities,
      addLocation: this.props.addLocation,
    });
  };

  render() {
    const { cities } = this.props;
    return (
      <ScrollView contentContainerStyle={[!cities.length && { flex: 1 }]}>
        <View style={[!cities.length && { justifyContent: 'center', flex: 1 }]}>
          {!cities.length && <CenterMessage message="No saved cities!" />}
          {cities.map((item, index) => (
            <TouchableWithoutFeedback onPress={() => this.navigate(item)} key={index}>
              <View style={styles.cityContainer}>
                <Text style={styles.city}>{item.city}</Text>
                <Text style={styles.country}>{item.country}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cityContainer: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  city: {
    fontSize: 20,
  },
  country: {
    color: 'rgba(0, 0, 0, .5)',
  },
});
