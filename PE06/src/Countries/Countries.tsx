import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { CountryType } from '../types/types';
import { colors } from '../theme';

type Props = {
  countries: CountryType[];
  navigation: any;
};

export default function Countries({ countries, navigation }: Props) {
  return (
    <ScrollView contentContainerStyle={[!countries.length && { flex: 1 }]}>
      <View style={[!countries.length && { justifyContent: 'center', flex: 1 }]}>
        {!countries.length ? (
          <Text style={styles.empty}>No countries added yet!</Text>
        ) : (
          countries.map((country, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('Country', { country })}
            >
              <View style={styles.item}>
                <Text style={styles.name}>{country.name}</Text>
                <Text style={styles.currency}>{country.currency}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },
  name: {
    fontSize: 20,
  },
  currency: {
    color: 'gray',
  },
  empty: {
    alignSelf: 'center',
    fontSize: 18,
    marginTop: 100,
  },
});
