import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {NavigationContainer} from '@react-navigation/native';

import ChannelList from './src/components/ChannelList';

const ChannelScreen = ({navigation, route}) => (
  <SafeAreaView>
      <Text>Channel Screen</Text>
    </SafeAreaView>
);

const ChannelListDrawer = (props) => (
  <SafeAreaView>
    <ChannelList />
  </SafeAreaView>
);

const Drawer = createDrawerNavigator();

const App = () => (
  <NavigationContainer>
    <View style={styles.container}>
      <Drawer.Navigator
        drawerContent={ChannelListDrawer}
        drawerStyle={styles.drawerNavigator}
      >
        <Drawer.Screen name="ChannelScreen" component={ChannelScreen} />
      </Drawer.Navigator>
    </View>
  </NavigationContainer>
)

const styles = StyleSheet.create({
  channelScreenSaveAreaView: {
    backgroundColor: 'white'
  },
  channelScreenContainer: {
    flexDirection:'column',
    height: '100%'
  },
  container: {
    flex: 1,
  },
  drawerNavigator: {
    backgroundColor: '#3F0E40',
    width: 350,
  },
  chatContainer: {
    backgroundColor: 'white',
    flexGrow: 1,
    flexShrink: 1
  }
});

export default App;
