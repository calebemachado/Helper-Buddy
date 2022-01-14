import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
  View,
  Text,
  Card,
  Button,
  Assets,
  TextField,
  Colors,
} from 'react-native-ui-lib';

const AddHelpTaskPage = () => {
  const [passo, setPasso] = useState(1);

  const adicionarPasso = () => {
    setPasso(passo + 1);
  };

  const removerPasso = () => {
    setPasso(passo - 1);
  };

  return (
    <ScrollView>
      <View flex padding-page>
        <Card height={250} padding-card marginB-s4>
          <Text body>{passo} Passo</Text>
          <TextField
            placeholder="Descreva o que fazer!"
            floatingPlaceholder
            floatingPlaceholderColor={{
              focus: Colors.grey10,
              default: Colors.grey30,
            }}
            containerStyle={{flex: 1}}
            fieldStyle={styles.withUnderline}
          />
          <View row right>
            <Button
              style={{marginRight: 10}}
              text90
              link
              iconSource={Assets.icons.x}
              label="Remover"
              onPress={() => removerPasso()}
            />
          </View>
        </Card>

        <Button
          primary
          outline
          iconSource={Assets.icons.plusSmall}
          label="Adicionar um passo"
          marginB-s4
          onPress={() => adicionarPasso()}
        />

        <Button label="Finalizar" body bg-primaryColor square marginB-s4 />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  withUnderline: {
    borderBottomWidth: 1,
    borderColor: Colors.grey40,
    paddingBottom: 4,
  },
});

export default AddHelpTaskPage;
