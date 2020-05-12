import {useState, useEffect} from 'react';

export const useWatchedChannels = (client, changeChannel) => {
    const [activeChannelId, setActiveChannelId] = useState(null);
    const [unreadChannels, setUnreadChannels] = useState([]);
    const [readChannels, setReadChannels] = useState([]);
    const [oneOnOneConversations, setOneOnOneConversations] = useState([]);
    const [hasMoreChannels, setHasMoreChannels] = useState(true);
    
    const filters={
      type: 'messaging',
      example: 'slack-demo',
      members: {
        $in: [client.user.id],
      },
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
        channels.forEach(c => {
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
        setOneOnOneConversations([..._oneOnOneConversations]);
  
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