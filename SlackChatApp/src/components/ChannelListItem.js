import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';


export function ChannelListItem({
  channel,
  setActiveChannelId,
  changeChannel,
  isOneOnOneConversation,
  isUnread,
  activeChannelId,
  currentUserId,
}) {
  /**
   * Prefix could be one of following
   *
   * '#' - if its a normal group channel
   * empty circle - if its direct message or oneOnOneConversation with offline user
   * green circle - if its direct message or oneOnOneConversation with online user
   */
  let ChannelPrefix = null;
  /**
   * Its the label component or title component to show for channel
   * For normal group channel, its the name of the channel - channel.data.name
   * For oneOnOneConversation, its the name of other user (on other end of chat).
   */
  let ChannelTitle = null;
  /**
   * Id of other user in oneOnOneConversation. This will be used to decide ChannelTitle
   */
  let otherUserId;
  /**
   * Number of unread mentions (@vishal) in channel
   */
  let countUnreadMentions = channel.countUnreadMentions();

  if(isOneOnOneConversation) {
    // If its a oneOnOneConversation, then we need to display the name of the other user.
    // For this purpose, we need to find out, among two members of this channel,
    // which one is current user and which one is the other one.
    const memberIds = Object.keys(channel.state.member);
    otherUserId = memberIds[0] === currentUserId ? memberIds[1] : memberIds[0];
    ChannelPrefix = channel.state.members[otherUserId].user.online? (
      <PresenceIndicator online={true} />
    ) : (
      <PresenceIndicator online={false} />
    );

    ChannelTitle = (
      <Text style={isUnread? styles.unreadChannelTitile : styles.channelTitle}>
          {channel.state.members[otherUserId].user.name}
      </Text>
    );
  } else {
    ChannelPrefix = <Text style={styles.channelTitlePrefix}>#</Text>;
    ChannelTitle = (
      <Text style={isUnread? styles.unreadChannelTitile : styles.channelTitle}>
        {channel.data.name && channel.data.name.toLowerCase().replace(' ', '_')}
      </Text>
    );
  }

  return(
    <TouchableOpacity
       key={channel.id}
       onPress={() => {
           setActiveChannelId(channel.id);
           changeChannel(channel.id);
       }}
       style={{
           ...styles.channelRow,
           backgroundColor: activeChannelId === channel.id ? '#0676db' : undefined
       }}
    >
      <View style={styles.channelTitileContainer}>
        {ChannelPrefix}
        {ChannelTitle}   
      </View>
      {countUnreadMentions > 0 && (
        <View style={styles.unreadMentionsContainer}>
          <Text style={styles.unreadMetionsText}>{countUnreadMentions}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const PresenceIndicator = ({online}) => (
  <View style={online? styles.onlineCircle: styles.offlineCircle} />
);

const textStyles = {
  fontFamily: 'Lato-Regular',
  color: 'white',
  fontSize: 18
};

StyleSheet.create({
  onlineCircle: {
    width: 10,
    height: 10,
    borderRadius: 100/2,
    backgroundColor: 'green'
  },
  offlineCircle: {
    width: 10,
    height: 10,
    borderRadius: 100/2,
    borderColor: 'white',
    borderWidth: 0.3,
    backgroundColor: 'transparent'
  },
  channelRow: {
    padding: 3,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    marginRight: 5
  },
  channelTitileContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  unreadChannelTitile: {
    marginLeft: 3,
    fontWeight: 'bold',
    padding: 5,
    ...textStyles
  },
  channelTitle: {
    padding: 5,
    fontWeight: '300',
    paddingLeft: 10,
    ...textStyles
  },
  channelTitlePrefix: {
    fontWeight: '300',
    ...textStyles
  },
  unreadMentionsContainer: {
    backgroundColor: 'red',
    borderRadius: 20,
    alignSelf: 'center',
    marginRight: 20
  },
  unreadMentionsText: {
    color: 'white',
    padding: 3,
    paddingRight: 6,
    paddingLeft: 6,
    fontSize: 15,
    fontWeight: '900',
    fontFamily: 'Lato-Regular'
  }
});