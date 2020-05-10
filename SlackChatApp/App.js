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
import {StreamChat} from 'stream-chat';

const chatClient = new StreamChat('q95x9hkbyd6p');
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmlzaGFsIn0.LpDqH6U8V8Qg9sqGjz0bMQvOfWrWKAjPKqeODYM0Elk';
const user = {
  id: 'vishal',
  name: 'Vishal',
};

chatClient.setUser(user, userToken);


const ChannelScreen = ({navigation, route}) => (
  <SafeAreaView>
      <Text>Channel Screen</Text>
    </SafeAreaView>
);

const ChannelListDrawer = props => (
  <ChannelList 
    client={chatClient}
    changeChannel={channelId => {
      props.navigation.jumpTo('ChannelScreen', {
        channelId
      });
    }}
  />
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
