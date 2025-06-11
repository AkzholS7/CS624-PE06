import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { colors } from '../theme';
import { CityType } from '../types'; // Update this path if your types are in another file

type AddCityProps = {
  navigation: any;
  addCity: (city: CityType) => void;
};

type AddCityState = {
  city: string;
  country: string;
};

class AddCity extends React.Component<AddCityProps, AddCityState> {
  state: AddCityState = {
    city: '',
    country: '',
  };

  onChangeText = (key: keyof AddCityState, value: string) => {
    this.setState({ [key]: value });
  };

  submit = () => {
    const { city, country } = this.state;
    if (city === '' || country === '') {
      Alert.alert('Please complete the form');
      return;
    }

    const newCity: CityType = {
      city,
      country,
      id: uuidv4(),
      locations: [],
    };

    this.props.addCity(newCity);
    this.setState({ city: '', country: '' }, () => {
      this.props.navigation.navigate('Cities');
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Cities</Text>
        <TextInput
          placeholder="City name"
          onChangeText={(val) => this.onChangeText('city', val)}
          style={styles.input}
          value={this.state.city}
        />
        <TextInput
          placeholder="Country name"
          onChangeText={(val) => this.onChangeText('country', val)}
          style={styles.input}
          value={this.state.country}
        />
        <TouchableOpacity onPress={this.submit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add City</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  heading: {
    color: 'white',
    fontSize: 40,
    marginBottom: 10,
    alignSelf: 'center',
  },
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    margin: 10,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    height: 50,
  },
});

export default AddCity;
