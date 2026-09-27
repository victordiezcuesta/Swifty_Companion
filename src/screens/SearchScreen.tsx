import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

export default function SearchScreen() {
  const [login, setLogin] = useState('');

  const handleSearch = () => {
    console.log(login); //en la consola muestra el login que hemos ntroducido
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swifty Companion</Text>

      <Text style={styles.subtitle}>
        Search for a 42 student
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter login..."
        placeholderTextColor="#999"
        value={login} //guardamos el valor  que introducimos en la variable login
        onChangeText={setLogin} //cada vez que escribamos algo actualizamos la variable login
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSearch} //Cuando el usuario pulse este botón, ejecuta handleSearch
      >
        <Text style={styles.buttonText}>SEARCH</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },

  input: {
    width: '100%',
    maxWidth: 400,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },

  button: {
    width: '100%',
    maxWidth: 400,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});