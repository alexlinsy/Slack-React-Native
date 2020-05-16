import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import ChannelList from './src/components/ChannelList';
import {StreamChat} from 'stream-chat';
import {ChannelHeader} from './src/components/ChannelHeader';

const chatClient = new StreamChat('q95x9hkbyd6p');
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmlzaGFsIn0.LpDqH6U8V8Qg9sqGjz0bMQvOfWrWKAjPKqeODYM0Elk';
const user = {
  id: 'vishal',
  name: 'Vishal',
};

chatClient.setUser(user, userToken);

function ChannelScreen({navigation, route}) {
  const [channel, setChannel] = useState(null);
  useEffect(() => {
    if(!channel) {
      navigation.openDrawer();
    }
    const channelId = route.params ? route.params.channelId : null;
    const _channel = chatClient.channel('messaging', channelId);
    setChannel(_channel);
  }, [route.params])

  return (
    <SafeAreaView style={styles.channelScreenSaveAreaView}>
      <View style={styles.channelScreenContainer}>
        <ChannelHeader 
          navigation={navigation}
          channel={channel}
          client={chatClient}
        />
      </View>
    </SafeAreaView>
  );
}

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
