import React, { useRef, useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import './style.css';
import usePathStore from 'src/store/path.store';
import { socket } from 'src/utils/soket';
import { MessageDto } from 'src/types';
import moment from 'moment';
import useRoomChatStore from 'src/store/roomChat.store';
import { useRoomStore, useUserStore } from 'src/store';
import { useStore } from 'zustand';
import useUserChatStore from 'src/store/userChat.store';
import { GetUserResponseDto } from 'src/interfaces/response/User';

interface Props {
  roomNumber: string | undefined;
  // item : GetUserResponseDto;
}


// component //
export default function RealtimeChat({ roomNumber }: Props) {

  // state //
  // Send Button Ref 상태 //
  const sendButtonRef = useRef<HTMLDivElement | null>(null);
  // Room Container Ref 상태 //
  const roomContainerRef = useRef<HTMLDivElement | null>(null);
  // path 상태 변경 함수 //
  const { setPath } = usePathStore();
  // room 상태 및 변경 함수 //
  const { roomChat, setRoomChat } = useRoomChatStore();
  // 사용자 정보 상태 //
  const { id, nickname } = useUserChatStore();
  // 소켓 연결 상태 //
  const [isSocketConnected, setSocketConnected] = useState<boolean>(socket.connected);
  // 메세지 상태 //
  const [message, setMessage] = useState<string>('');
  // 메세지 리스트 상태 //
  const [messageList, setMessageList] = useState<MessageDto[]>([]);

  const {roomTitle, roomPassword, roomImage, roomImageUrl, resetRoom, setRoomNumber, setRoomImageUrl, setRoomImage, setRoomPassword, setRoomTitle } = useRoomStore();

  const {user} = useUserStore();

  const userImageBackground = (profileImage: string | null) =>  profileImage ? { backgroundImage : `url(${profileImage})` } : { backgroundColor : 'rgba(0, 0, 0, 0.6)' };

  // function //

  // event handler ///
  // 메세지 값 변경 처리 //
  const onMessageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const message = event.target.value;
    setMessage(message);
  }
  // Enter Key 누름 처리 //
  const onEnterKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    if(!sendButtonRef.current) return;
    sendButtonRef.current.click();
  }
  // 전송 버튼 클릭 처리 //
  const onSendButtonClickHandler = () => {
    if(!message.trim()) return;
    if(!roomNumber) return;
    // if(!user) return;
    console.log(user?.userEmail);
    const datetime = moment().format('YYYY-MM-DD hh:mm:ss a');
    console.log(roomNumber);
    const data: MessageDto = { id, room: roomNumber, profileImage: String(user?.userProfileImageUrl), nickname: String(user?.userNickname), message, datetime };
    socket.emit('send', data);
    setMessage('');
  }
  // Socket Receive 이벤트 처리 //
  const onReceiveHandler = (messageObject: MessageDto) => {
    const newMessageList = [...messageList];
    newMessageList.push(messageObject);
    setMessageList(newMessageList);
  }
  socket.on('receive', onReceiveHandler);

  // component : 채팅 메세지 아이템 컴포넌트 //
  interface ChatMessageItmeProps {
    messageItem: MessageDto;
  }
  const ChatMessageItem = ({messageItem}: ChatMessageItmeProps) => {
    const { profileImage, nickname, message, datetime } = messageItem;
    
    if(id === messageItem.id)
    return(
      <div className='chat-bottom-mid-my-chat'>
            <div className='chat-my-datetime'>{datetime}</div>
            <div className='chat-my-contents'>{message}</div>
      </div>
    );

    return(
      <div className='chat-bottom-mid-chat'>
          <div className='chat-user-profile-image' style={userImageBackground(profileImage)}>icon</div>
          <div className='chat-user-nickname'>{nickname}</div>
          <div className='chat-contents'>{message}</div>
          <div className='chat-datetime'>{datetime}</div>
      </div>
    );
  }

  // effect //
  // 첫 마운트 시 소켓 연결 //
  let effectFlag = true;
  useEffect(() => {
    if(!effectFlag) return;
    effectFlag = false;

    const onConnect = () => {
      console.log(socket.id)
      setSocketConnected(true);
    };

    const onDisConnect = () => {
      setSocketConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisConnect);

    socket.emit('join', roomNumber );
  },[]);

  useEffect(() => {
    if(!roomContainerRef.current) return;
    roomContainerRef.current.scrollTop = roomContainerRef.current.scrollHeight;
  }, [messageList])

  // render //
  return (
    <div className='chat-bottom'>
      <div className='chat-bottom-top'>채팅</div>
      <div className='chat-bottom-mid' ref={roomContainerRef}>
        { messageList.map(messageItem => <ChatMessageItem messageItem={messageItem} />) }
        <div className='chat-bottom-bottom'>
          <input className='chat-bottom-bottom-input' placeholder='채팅 메세지를 입력해주세요.' type='text' value={message} onChange={onMessageChangeHandler} onKeyDown={onEnterKeyDownHandler}/>
          <div className='chat-bottom-bottom-button' ref={sendButtonRef} onClick={onSendButtonClickHandler}>전송</div>
        </div>
      </div>    
    </div>
  )
}
