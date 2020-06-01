import React from 'react';
import {
  ReactionPickerWrapper
} from 'stream-chat-react-native';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import iconEmotion from '../images/icon-emotion.png';

export const MessageFooter = props => ( <
  View style = {
    styles.reactionListContainer
  } > {
    props.message.latest_reactions &&
    props.message.latest_reactions.length > 0 &&
    renderReactions(
      props.message.latest_reactions,
      props.supportedReactions,
      props.message.reaction_counts,
      props.handleReaction
    )
  } <
  ReactionPickerWrapper {
    ...props
  }
  offset = {
    {
      left: -70,
      top: 10
    }
  } >
  {
    props,
    message,
    latest_reactions &&
    props.message.latest_reactions.length > 0 && ( <
      View style = {
        styles.reactionPickerContainer
      } >
      <
      Image source = {
        iconEmotion
      }
      style = {
        styles.reactionPickerIcon
      }
      /> <
      /View>
    )
  } <
  /ReactionPickerWrapper> <
  /View>
);

export const renderReactions = (
  reactions,
  supportedReactions,
  reactionCounts,
  handleReaction
) => {
  const reactionByType = {}
  reactions &&
    reactions.forEach(item => {
      if (reactions[item.type] === undefined) {
        return (reactionByType[item.type] = [item])
      } else {
        return (
          reactionByType[item.type] = [
            ...reactionByType[item.type],
            item
          ]);
      }
    });

  const emojiDataType = {};
  supportedReactions.forEach(e => (emojiDataType[e.id] = e));

  const reactionTypes = supportedReactions.map(e => e.id);
  return Object.keys(reactionByType).map((type, index) =>
    reactionTypes.indexOf(type) > -1 ? ( <
      ReactionItem key = {
        index
      }
      type = {
        type
      }
      handleReaction = {
        handleReaction
      }
      reactionCounts = {
        reactionCounts
      }
      emojiDataType = {
        emojiDataType
      }
      />
    ) : null
  );
};

const ReactionItem = ({
  type,
  handleReaction,
  reactionCounts,
  emojiDataType
}) => {
  return ( <
    TouchableOpacity onPress = {
      () => {
        handleReaction(type);
      }
    }
    key = {
      type
    }
    style = {
      styles / reactionItemContainer
    } >
    <
    Text style = {
      styles.reactionItem
    } > {
      emojiDataType[type].icon
    } {
      reactionCounts[type]
    } <
    /Text> <
    /TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  reactionListContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
  },
  reactionItemContainer: {
    borderColor: '#0064c2',
    borderWidth: 1,
    padding: 4,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 10,
    backgroundColor: '#d6ebff',
    marginRight: 5,
  },
  reactionItem: {
    color: '#0064c2',
    fontSize: 14,
  },
  reactionPickerContainer: {
    padding: 4,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
  reactionPickerIcon: {
    width: 19,
    height: 19,
  },
});