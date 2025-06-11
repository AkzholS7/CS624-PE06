import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { colors } from '../theme';
import { CountryType, CurrencyType } from '../types/types';

type Props = {
  route: RouteProp<{ params: { country: CountryType } }, 'params'>;
};

type State = {
  name: string;
  info: string;
};

export default class Country extends React.Component<Props, State> {
  state: State = {
    name: '',
    info: '',
  };

  onChangeText = (key: keyof State, value: string) => {
    this.setState({ [key]: value });
  };

  addCurrency = () => {
    const { name, info } = this.state;
    if (!name || !info) return;

    // In PE06 scope, currency won't persist – just simulate
    alert(`Currency Added: ${name} - ${info}`);
    this.setState({ name: '', info: '' });
  };

  render() {
    const { country } = this.props.route.params;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>{country.currency}</Text>
        <Text style={styles.subheading}>{`${country.name} ${country.currency} `}</Text>

        {/* Dummy Currency Display */}
        <Text style={styles.listLabel}>Won</Text>
        <Text style={styles.subtext}>Korean Won. Not used.</Text>

        {/* Currency Form */}
        <TextInput
          placeholder="Currency name"
          value={this.state.name}
          onChangeText={(val) => this.onChangeText('name', val)}
          style={styles.input}
        />
        <TextInput
          placeholder="Currency info"
          value={this.state.info}
          onChangeText={(val) => this.onChangeText('info', val)}
          style={styles.input}
        />
        <TouchableOpacity onPress={this.addCurrency} style={styles.button}>
          <Text style={styles.buttonText}>Add Currency</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subheading: {
    marginBottom: 10,
  },
  listLabel: {
    fontSize: 18,
    marginTop: 20,
  },
  subtext: {
    color: 'gray',
  },
  input: {
    height: 50,
    backgroundColor: '#eee',
    marginTop: 10,
    paddingHorizontal: 8,
  },
  button: {
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
