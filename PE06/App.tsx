import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import 'react-native-get-random-values';

import Cities from './src/Cities/Cities';
import City from './src/Cities/City';
import AddCity from './src/AddCity/AddCity';
import AddCountry from './src/AddCountry/AddCountry';
import Countries from './src/Countries/Countries';
import Country from './src/Countries/Country';

import { colors } from './src/theme';
import { CityType, CountryType, LocationType } from './src/types/types';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

type Props = {};
type State = {
  cities: CityType[];
  countries: CountryType[];
};

type CityStackScreenProps = {
  cities: CityType[];
  addCity: (city: CityType) => void;
  addLocation: (location: LocationType, city: CityType) => void;
};

type CountriesStackScreenProps = {
  countries: CountryType[];
};

function CitiesStackScreen({
  cities,
  addCity,
  addLocation,
}: CityStackScreenProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="Cities"
        children={(props) => (
          <Cities {...props} cities={cities} addCity={addCity} addLocation={addLocation} />
        )}
      />
      <Stack.Screen
        name="City"
        children={(props) => (
          <City {...props} cities={cities} addCity={addCity} addLocation={addLocation} />
        )}
      />
    </Stack.Navigator>
  );
}

function CountriesStackScreen({ countries }: CountriesStackScreenProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="Countries"
        children={(props) => (
          <Countries {...props} countries={countries} />
        )}
      />
      <Stack.Screen
        name="Country"
        component={Country}
      />
    </Stack.Navigator>
  );
}

export default class App extends Component<Props, State> {
  state: State = {
    cities: [],
    countries: [],
  };

  addCity = (city: CityType) => {
    this.setState((prevState) => ({
      cities: [...prevState.cities, { ...city, locations: [] }],
    }));
  };

  addLocation = (location: LocationType, city: CityType) => {
    const index = this.state.cities.findIndex((item) => item.id === city.id);
    const updatedCity = {
      ...this.state.cities[index],
      locations: [...this.state.cities[index].locations, location],
    };
    const cities = [
      ...this.state.cities.slice(0, index),
      updatedCity,
      ...this.state.cities.slice(index + 1),
    ];
    this.setState({ cities });
  };

  addCountry = (country: CountryType) => {
    this.setState((prevState) => ({
      countries: [...prevState.countries, country],
    }));
  };

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="CitiesNav"
            children={(props) => (
              <CitiesStackScreen
                {...props}
                cities={this.state.cities}
                addCity={this.addCity}
                addLocation={this.addLocation}
              />
            )}
          />
          <Tab.Screen
            name="AddCity"
            children={(props) => (
              <AddCity
                {...props}
                cities={this.state.cities}
                addCity={this.addCity}
                addLocation={this.addLocation}
              />
            )}
          />
          <Tab.Screen
            name="AddCountry"
            children={(props) => (
              <AddCountry
                {...props}
                addCountry={this.addCountry}
              />
            )}
          />
          <Tab.Screen
            name="CountriesNav"
            children={(props) => (
              <CountriesStackScreen
                {...props}
                countries={this.state.countries}
              />
            )}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
