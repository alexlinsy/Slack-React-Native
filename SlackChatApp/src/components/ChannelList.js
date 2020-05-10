import React, {useState, useEffect} from 'react';
import {
  View, 
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  SectionList,
} from 'react-native';

const useWatchedChannels = (client, changeChannel) => {
  const [activeChannelId, setActiveChannelId] = useState(null);
  const [unreadChannels, setUnreadChannels] = useState([]);
  const [readChannels, setReadChannels] = useState([]);
  const [oneOnOneConversations, setOneOnOneConversations] = useState(true);
  const [hasMoreChannels, setHasMoreChannels] = useState(true);
  
  const filters={
    type: 'messaging',
    example: 'slack-demo',
    members: {
      $in: [client.user.id]
    }
  };

  const sort = {has_unread: -1, cid: -1};
  const options = {limit: 30, state: true};

  useEffect(() => {
    if(!hasMoreChannels) {
      return;
    }

    let offset = 0;
    const _unreadChannels = [];
    const _readChannels = [];
    const _oneOnOneConversations = [];

    async function fetchChannels() {
      const channels = await client.queryChannels(filters, sort, {
        ...options,
        offset,
      });

      offset = offset + channels.length;
      channels.forEacch(c => {
        if(c.countUnread() > 0) {
          _unreadChannels.push(c);
        } else if(Object.keys(c.state.members).length === 2) {
          _oneOnOneConversations.push(c);
        } else {
          _readChannels.push(c);
        }
      });

      setUnreadChannels([..._unreadChannels]);
      setReadChannels([..._readChannels]);
      setOneOnOneConversations([...oneOnOneConversations]);

      if(channels.length === options.limit) {
        fetchChannels();
      } else {
        setHasMoreChannels(false);
        setActiveChannelId(_readChannels[0].id);
        changeChannel(_readChannels[0].id);
      }
    }
    fetchChannels();
  }, [client]);

  return {
    activeChannelId,
    setActiveChannelId,
    unreadChannels,
    setUnreadChannels,
    readChannels,
    setReadChannels,
    oneOnOneConversations,
    setOneOnOneConversations,
  };
};

function ChannelList() {
  const renderChannelListItem = (item) => <Text>{item}</Text>;
  
  return (
    <SafeAreaView>
      <View
       style={styles.container}
      >
        <View style={styles.headerContainer}>
          <TextInput 
            style={styles.inputSearchBox}
            placeholderTextColor="grey"
            placeholder="Jump to"
          />
        </View>

        <SectionList 
          style={styles.sectionList}
          sections={[
            {
               title: 'Unread',
               data: [],
            },
            {
                title: 'Channels',
                data: [],
            },
            {
                title: 'Direct Message',
                data: [],
            },
          ]}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, section}) => {
            return renderChannelListItem(item);
          }}
          renderSectionHeader={({section: {title}}) => (
            <View style={styles.groupTitleContainer}>
              <Text style={styles.groupTitle}>{title}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
  headerContainer: {
    padding: 10,
    marginRight: 10,
  },
  inputSearchBox: {
    backgroundColor: '#2e0a2f',
    padding: 10,
  },
  sectionList: {
    flexGrow: 1,
    flexShrink: 1,
  },
  groupTitleContainer: {
    padding: 10,
    borderBottomColor: '#995d9a',
    borderBottomWidth: 0.3,
    marginBottom: 7,
    backgroundColor: '#3F0E40',
  },
  groupTitle: {
    color: 'white',
    fontWeight: '100',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
  },
});

export default ChannelList;