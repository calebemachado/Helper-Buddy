import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {errorMessage, setErrorMessage} = useState('');

  const authenticate = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('Email informado já está sendo utilizado!');
        }

        if (error.code === 'auth/invalid-email') {
          setErrorMessage('Email informado inválido!');
        }

        if (error.code === 'auth/weak-password') {
          setErrorMessage('Senha inválida ou fraca!');
        }

        setTimeout(
          function () {
            setErrorMessage('');
          }.bind(this),
          3000,
        );
      });
  };

  return (
    <View style={styles.container}>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#353535"
          onChangeText={e => setEmail(e)}
          autoComplete="off"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Senha"
          placeholderTextColor="#353535"
          secureTextEntry={true}
          onChangeText={p => setPassword(p)}
          autoComplete="off"
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={authenticate}>
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputView: {
    backgroundColor: '#d9d9d9',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 10,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: '#3c6e71',
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#284b63',
  },

  loginText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#ffffff',
  },

  error: {
    fontSize: 18,
    fontWeight: '400',
    color: '#bc4749',
    margin: 20,
  },
});

export default LoginPage;
