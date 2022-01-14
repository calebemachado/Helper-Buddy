import React, {useCallback} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';

import {Button, View, Text} from 'react-native-ui-lib';
import Section from '../components/Section';

const HomePage = ({navigation}) => {
  const signOut = useCallback(() => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Button
            label="Criar Tarefa"
            onPress={() => navigation.navigate('AddHelpTaskPage')}
          />
          <Button label="Sair" onPress={signOut} />
          <Section title="Helper Buddy">
            <Text>Hello world</Text>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
