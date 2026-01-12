import { Text, View } from 'react-native';
import { ChatComponentStyles } from './chat.component.styles';
import { useEffect, useRef, useState } from 'react';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { ImageComponent } from '../../shared/components/image.component';

export const ChatComponent = ({ payload }: any) => {
  /**
   * States
   */
  const [chats, setChats] = useState<Record<string, string>[]>([]);

  /**
   * Effects
   */
  useEffect(() => {
    if (Object.keys(payload).length !== 0) {
      const currentChats = chats;
      setChats([
        {
          ...payload,
          timestamp: new Date().getTime(),
        },
        ...currentChats,
      ]);
    }
  }, [payload]);

  return (
    <View style={ChatComponentStyles.wrapper}>
      {chats.length === 0 ? (
        <NoChatPresentComponent />
      ) : (
        <ChatPresentComponent chats={chats} />
      )}
    </View>
  );
};

const NoChatPresentComponent = () => (
  <View style={ChatComponentStyles.noChatsPresentWrapper}>
    <Text style={ChatComponentStyles.noChatsPresentWrapper__instruction}>
      Comments will appear here.
    </Text>
  </View>
);

const ChatPresentComponent = ({ chats }: any) => {
  /**
   * Handlers
   */
  const _listRenderItem = ({ item }: Record<string, any>) => {
    return <ChatThreadComponent payload={item} />;
  };

  const _listItemKeyExtractor = ({
    username,
    timestamp,
  }: Record<string, any>) => `${username}_${timestamp}`;

  return (
    <View style={ChatComponentStyles.chatPresentWrapper}>
      <Animated.FlatList
        data={chats}
        renderItem={_listRenderItem}
        itemLayoutAnimation={LinearTransition}
        keyExtractor={_listItemKeyExtractor}
      />
    </View>
  );
};

const ChatThreadComponent = ({
  payload: { username, avatar, comment, name },
}: any) => {
  return (
    <View style={ChatComponentStyles.chatPresentWrapper__thread}>
      <View style={ChatComponentStyles.chatPresentWrapper__thread__avatar}>
        <ImageComponent uri={avatar} />
      </View>
      <View style={ChatComponentStyles.chatPresentWrapper__thread__info}>
        <Text
          style={ChatComponentStyles.chatPresentWrapper__thread__info__username}
        >
          {name}
        </Text>
        <Text
          style={ChatComponentStyles.chatPresentWrapper__thread__info__comment}
        >
          {comment}
        </Text>
      </View>
    </View>
  );
};
