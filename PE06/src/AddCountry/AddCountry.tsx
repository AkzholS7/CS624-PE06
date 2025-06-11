import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CountryType } from '../types/types';
import { colors } from '../theme';

type Props = {
  addCountry: (country: CountryType) => void;
};

export default function AddCountry({ addCountry }: Props) {
  const [name, setName] = useState('');
  const [currency, setCurrency] = useState('');

  const submit = () => {
    if (!name || !currency) {
      Alert.alert('Fill both fields');
      return;
    }
    addCountry({ name, currency });
    setName('');
    setCurrency('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Country</Text>
      <TextInput
        placeholder="Country Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Currency"
        style={styles.input}
        value={currency}
        onChangeText={setCurrency}
      />
      <TouchableOpacity onPress={submit}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Add Country</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 30,
    color: 'white',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#666',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
