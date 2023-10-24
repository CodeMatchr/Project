import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { BOARD_LIST_PATH, COUNT_BY_PAGE, MAIN_PATH, MAIN_ROOM_COUNT_BY_PAGE, WRITE_PATH } from '../../constants';
import BoardListResponseDto from '../../interfaces/response/board/board-list.response.dto';
import UserBoardItem from '../../components/UserBoardItem';
import Pagination from '../../components/Pagination';
import { usePagination } from '../../hooks';
import RoomListResponseDto from '../../interfaces/response/room/room-list.response.dto';
import ChatComePopUP from '../../components/PopUp/ChatComePopUp';
import RoomFullListItem from '../../components/RoomFullListItem';
import { useUserStore } from 'src/store';
import { useCookies } from 'react-cookie';
import { GetUserBoardListResponseDto, GetUserResponseDto, GetUserRoomListResponseDto } from 'src/interfaces/response/User';
import ResponseDto from 'src/interfaces/response/response.dto';
import {  getUserBoardListRequest, getUserRequest, getUserRoomListRequest, patchNicknameRequest, patchProfileImageUrlRequest, patchStateMessageRequest, uploadFileRequest } from 'src/apis';
import { PatchNicknameRequestDto, PatchProfileImageUrlRequestDto, PatchStateMessageRequestDto } from 'src/interfaces/request/user';


//            component           //
// description : 마이페이지 컴포넌트 // 
export default function UserPage() {
//            state           //
// description : 유저 이메일 상태 //
const { userEmail } = useParams();
// description : 유저페이지 여부 상태 //
const [userPage, setUserPage] = useState<boolean>(false);
// description : 로그인 유저 정보 상태 //
const {user, setUser} = useUserStore();
// description : Cookies 상태 //
const [cookies, setCookie] = useCookies();

//            function           //
// description : 네비게이터 //
const navigator = useNavigate();
//            event handler           //

  //            component           //
  const UserPageTop = () => {
    //            state           //
    // description: 인풋 요소 상태 //
    const fileInputRef = useRef<HTMLInputElement>(null);

    // description : 프로필 이미지 상태 //
    const [userProfileImageUrl, setUserProfileImageUrl] = useState<string>('');
    // description : 닉네임 상태 //
    const [userNickname, setUserNickname] = useState<string>('');
    // description : 닉네임 변경 버튼 상태 //
    const [nicknameChange, setNicknameChange] = useState<boolean>(false);
    // description : 상태메세지 상태 //
    const [userStateMessage, setUserStateMessage] = useState<string>('');
    // description : 상태메시지 변경 버튼 상태 //
    const [messageChange, setMessageChange] = useState<boolean>(false);

    //            function           //
    // description : 유저 정보 응답 처리 함수 //
    const getUserResponseHandler = (result: GetUserResponseDto | ResponseDto) => {
      const { code } = result;
      if (code === 'NE') alert('존재하지 않는 사용자 이메일 입니다.!!!');
      if (code === 'DE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { userNickname, userProfileImageUrl, userStateMessage } = result as GetUserResponseDto;
      setUserNickname(userNickname);
      setUserStateMessage(userStateMessage);
      if (userProfileImageUrl) setUserProfileImageUrl(userProfileImageUrl);
      else setUserProfileImageUrl('');

      if (userEmail === user?.userEmail) {
        const after = { userEmail: userEmail as string, userNickname, userProfileImageUrl, userStateMessage };
        setUser(after);
      }
    }
    
    // description: 닉네임 변경 응답 처리 함수 //
    const patchNicknameResponseHandler = (code: string) => {
      if (!user) return;
      if (code === 'NE') alert('존재하지 않는 사용자 이메일 입니다.');
      if (code === 'EN') alert('중복되는 닉네임입니다.');
      if (code === 'VF') alert('잘못된 입력입니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU')  return;

      getUserRequest(user.userEmail).then(getUserResponseHandler);

    }
    
    // description : stateMessage 변경 응답 처리 함수 //
    const patchStateMessageResponseHandler = (code: string) => {
      if (!user) return;
      if (code === 'NE') alert('존재하지 않는 사용자 이메일입니다.');
      if (code === 'VF') alert('잘못된 입력입니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      getUserRequest(user.userEmail).then(getUserResponseHandler);
    }
    
    
    // description: 프로필 이미지 변경 응답 처리 함수 //
    const patchProfileImageResponseHandler = (code: string) => {
      if (!user) return;
      if (code === 'NE') alert('존재하지 않는 사용자 이메일 입니다.');
      if (code === 'VF') alert('잘못된 입력입니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code === 'SU') {
        setUserProfileImageUrl(user.userProfileImageUrl);
        return;
      }

      getUserRequest(user.userEmail).then(getUserResponseHandler);
    }
    
    // description: 프로필 이미지 업로드 응답 처리 함수 //
    const profileUploadResponseHandler = (url: string | null) => {
      if (!user) return;
      if (!url) {
        setUserProfileImageUrl(user.userProfileImageUrl);
        return;
      }

      const data: PatchProfileImageUrlRequestDto = { userProfileImageUrl: url };
      const token = cookies.accessToken;
      patchProfileImageUrlRequest(data, token).then(patchProfileImageResponseHandler);
    }

    //            event handler           //
    // description: 파일 인풋 변경 시 이미지 미리보기 //
    const onImageInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if(!event.target.files || !event.target.files.length) return;

      const data = new FormData();
      data.append('file', event.target.files[0]);
      uploadFileRequest(data).then(profileUploadResponseHandler);
    }
    // description: 프로필 이미지 클릭시 파일 인풋창 열림 이벤트 //
    const onProfileClickHandler = () => {
      if (userEmail !== user?.userEmail) return;
      fileInputRef.current?.click();
    }
    // description: 닉네임 변경 이벤트 //
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setUserNickname(event.target.value);
    }
    // description: 닉네임 변경 버튼 클릭 이벤트 //
    const onNicknameButtonClickHandler = () => {
      if (nicknameChange) {
        const data: PatchNicknameRequestDto = { userNickname };
        const token = cookies.accessToken;
        patchNicknameRequest(data, token).then(patchNicknameResponseHandler);
      }
      setNicknameChange(!nicknameChange);
    }
    // description : 상태메세지 변경 이벤트 //
    const onMessageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setUserStateMessage(event.target.value);
    }
    // description : 상태메세지 변경 버튼 클릭 이벤트 //
    const onMessageButtonClickHandler = () => {
      if (messageChange) {
        const data: PatchStateMessageRequestDto = { userStateMessage };
        const token = cookies.accessToken;
        patchStateMessageRequest(data, token).then(patchStateMessageResponseHandler);
      }
      setMessageChange(!messageChange);
    }
    // description : 글쓰기 버튼 클릭 이벤트 //
    const onWriteClickHandler = () => {
      navigator(WRITE_PATH);
    }

    
    //            component           //
    //            effect           //
    // description: 유저 이메일 상태가 바뀔 때마다 실행 //
    useEffect(() => {
      if (!userEmail) navigator(MAIN_PATH);
      
      const isMyPage = user?.userEmail === userEmail;
      if (isMyPage) {
        if (user?.userProfileImageUrl) setUserProfileImageUrl(user?.userProfileImageUrl);
        else setUserProfileImageUrl('');
        setUserNickname(user?.userNickname as string);
      } else {
        getUserRequest(userEmail as string).then(getUserResponseHandler);
      }

    }, [userEmail , user]);
    
    //            render           //
    return (
      <div className='userpage-top-wrapper'>
        <div className='userpage-profile-box'>
          <div className='userpage-profile-image' style={{ backgroundImage: `url(${userProfileImageUrl})` }} onClick={onProfileClickHandler}>
            <input type='file' style={{display: 'none'}} ref={fileInputRef} accept='image/*' />
          </div>
        </div>
        <div className='userpage-user-info-box'>
          <div className='userpage-user-nickname-box'>
            <div className='userpage-user-nickname-input-box'>
              {nicknameChange ? (
                <input className='userpage-user-nickname-input' type='text' value={userNickname} onChange={onNicknameChangeHandler} /> // false
                ) :(
                <input className='userpage-user-nickname-input' type='text' value={userNickname} readOnly /> // true
                )}
              <div className='userpage-user-nickname-button' onClick={onNicknameButtonClickHandler}></div>
            </div>
            <div className='userpage-user-email'>{userEmail}</div>
          </div>
          <div className='userpage-user-message-box'>
            {messageChange ? (
              <input className='userpage-user-message-text-input' type='text' value={userStateMessage} onChange={onMessageChangeHandler} />
            ) : (
              <div className='userpage-user-message-text'>{userStateMessage}</div>
            )}
            <div className='userpage-user-message-button' onClick={onMessageButtonClickHandler}></div>
          </div>
        </div>
        <div className='userpage-button-box'>
          <div className='userpage-button-text-box'>
            <button className='userpage-button-text' onClick={onWriteClickHandler}>글쓰기</button>
          </div>
        </div>
      </div>
    );
  }
  
  //            component           //
  // description : 마이페이지 내 게시물 //
  const UserPageBoard = () => {

    //            state           //
    // description : 페이지네이션 관련 상태 및 함수 //
    const {totalPage, currentPage, currentSection, onPageClickHandler, onNextClickHandler, onPreviousClickHandler, changeSection} = usePagination();
    
    // description : board 에 해당하는 전체 리스트 상태 //
    const[currentBoardList, setCurrentBoardList] = useState<BoardListResponseDto[]>([]);
    // description: 현재 페이지에서 보여줄 board 리스트 상태 //
    const [viewBoardList, setViewBoardList] = useState<BoardListResponseDto[]>([]);
    
    //            function           //
    // description : 페이지네이션 함수 //
    const getViewBoardList = (boardList : BoardListResponseDto[]) => {
      const startIndex = MAIN_ROOM_COUNT_BY_PAGE * (currentPage -1);
      const lastIndex = boardList.length > MAIN_ROOM_COUNT_BY_PAGE * currentPage ? 
                        MAIN_ROOM_COUNT_BY_PAGE * currentPage : boardList.length;
      const viewBoardList = boardList.slice(startIndex, lastIndex);
      setViewBoardList(viewBoardList);
    }

     // description: 유저 작성 게시물 리스트 불러오기 응답 처리 함수 //
     const getUserBoardListResponseHandler = (responseBody: GetUserBoardListResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('잘못된 입력입니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;
      
      const { boardList } = responseBody as GetUserBoardListResponseDto;
      setCurrentBoardList(boardList);
      getViewBoardList(boardList);
      changeSection(boardList.length, COUNT_BY_PAGE);
      
    }
    

    //            component           //
    //            event handler           //
   
    // 타이틀 클릭시 게시물 리스트로 이동 //
    const onBoardTitleClickHandler = () => {
      navigator(BOARD_LIST_PATH);
    }

    // description: 유저 이메일이 바뀔때 마다 게시물 리스트 불러오기 //
    useEffect(() => {
      if (!userEmail) {
        alert('잘못된 사용자 이메일입니다.');
        navigator(MAIN_PATH);
        return;
      }

      getUserBoardListRequest(userEmail).then(getUserBoardListResponseHandler);
    }, [userEmail]);

    // description : 현재 페이지가 바뀔 때마다 board 리스트 변경 //
    useEffect(() => {
      getViewBoardList(currentBoardList);
    }, [currentPage]);
    
    // description : 현재 섹션이 바뀔 때마다 board 리스트 변경 //
    useEffect(() => {
      changeSection(currentBoardList.length, MAIN_ROOM_COUNT_BY_PAGE);
    }, [currentSection]);

    //            render           //
    return (
      <div className='userpage-board-wrapper'>
        <div className='userpage-board-title' onClick={onBoardTitleClickHandler} >내 게시물</div>
        <div className='userpage-board-contents-list'>
          {viewBoardList.map((item) => (<UserBoardItem item={item} />))}
        </div>
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          onPageClickHandler={onPageClickHandler}
          onNextClickHandler={onNextClickHandler}
          onPreviousClickHandler={onPreviousClickHandler}
        />
      </div>
    );
  } 

  //            component           //
  // description : 마이페이지 코드 비교 로그 //
  const UserPageCodeLog = () => {
    //            state           //
    
    //            function           //
    //            event handler           //
    //            component           //
    //            effect           //
    
    //            render           //
    return (
      <div className='userpage-code-wrapper'>
        {/* <MyCompareCodeList/> */}
      </div>
    );
  } 

  //            component           //
  // description : 마이페이지 채팅방 //
  const UserPageChat = () => {
    //            state           //
    // description : 페이지네이션 //
    const {totalPage, currentPage, currentSection, onPageClickHandler, onNextClickHandler, onPreviousClickHandler, changeSection} = usePagination();
    // description: 현재 페이지에서 보여줄 채팅방 리스트 상태 //
    const [viewChatList, setViewChatList] = useState<RoomListResponseDto[]>([]);
    // description : Chat 에 해당하는 전체 리스트 상태 //
    const[currentChatList, setCurrentChatList] = useState<RoomListResponseDto[]>([]);
    // description : 채팅방 팝업창 상태 //
    const [popUpRoomVisible, setPopUpRoomVisible] = useState<boolean>(false);
    // description : 채팅방 팝업창 상태 //
    const [selectRoomNumber, setSelectRoomNumber] = useState<number>(-1);

    //            function           //
    // description : 페이지네이션 함수 //
    const getViewChatList = (chatList : RoomListResponseDto[]) => {
      const startIndex = MAIN_ROOM_COUNT_BY_PAGE * (currentPage -1);
      const lastIndex = chatList.length > MAIN_ROOM_COUNT_BY_PAGE * currentPage ? 
      MAIN_ROOM_COUNT_BY_PAGE * currentPage : chatList.length;
      
      const viewChatList = chatList.slice(startIndex, lastIndex);
      setViewChatList(viewChatList);
    }
    // description : 사용자 작성 채팅방 리스트 불러오기 응답 처리 함수 //
    const getUserRoomListResponseHandler = (responseBody:GetUserRoomListResponseDto | ResponseDto) => {
      const {code} = responseBody;
      if(code === 'DE') alert('데이터베이스 에러입니다.');
      if(code !== 'SU') return;

      const { roomList } = responseBody as GetUserRoomListResponseDto;
      setCurrentChatList(roomList);
      getViewChatList(roomList);
      changeSection(roomList.length, COUNT_BY_PAGE);
    }
    
    //            event handler           //
    // description : 팝업창 //
    const onRoomListItemClickHandler = (roomNumber: number) => {
      setPopUpRoomVisible(true);
      setSelectRoomNumber(roomNumber);
    }
    //            component           //
    //            effect           //
    // description: 유저 이메일이 바뀔때 마다 채팅방 리스트 불러오기 //
    useEffect(() => {
      if (!userEmail) {
        alert('잘못된 사용자 이메일입니다.');
        navigator(MAIN_PATH);
        return;
      }
      
      getUserRoomListRequest(userEmail).then(getUserRoomListResponseHandler);
      
      console.log("room :" + userEmail);
    }, [userEmail]);
    

    // description : 현재 페이지가 바뀔 때마다 chat 리스트 변경 //
    useEffect(() => {
      getViewChatList(currentChatList);
    }, [currentPage]);
    
    // description : 현재 섹션이 바뀔 때마다 chat 리스트 변경 //
    useEffect(() => {
      changeSection(currentChatList.length, MAIN_ROOM_COUNT_BY_PAGE);
    }, [currentSection]);

    //            render           //
    return (
      <div className='userpage-chat-wrapper'>
        <div className='userpage-chat-title'>
          <div className='userpage-chat-text'>내 채팅방</div>
        </div>
        <div className='userpage-chat-room'>
          {viewChatList.map((item) => (<RoomFullListItem onClick={() => onRoomListItemClickHandler(item.roomNumber)} item={item}/>))}
          {popUpRoomVisible && <div className='chat-room-pop-up'><ChatComePopUP selectRoomNumber={selectRoomNumber} /></div>}
        </div>
        <div className='userpage-chat-pagination'>
          <Pagination
            totalPage={totalPage}
            currentPage={currentPage}
            onPageClickHandler={onPageClickHandler}
            onNextClickHandler={onNextClickHandler}
            onPreviousClickHandler={onPreviousClickHandler}
          />
        </div>
      </div>
    );
  } 
//            effect           //
// description : 유저 이메일 상태가 바뀔때마다 실행 //
useEffect(() => {
  if (!userEmail) navigator(MAIN_PATH);

  const isMyPage = user?.userEmail === userEmail;
  setUserPage(isMyPage);

  console.log("final : " +user?.userEmail);
}, [userEmail, user]);


//            render           //
  return (
    <div id='userpage-wrapper'>
      <div className='userpage-wrapper-box'>
        {userPage && <UserPageTop/> }
        {userPage && <UserPageBoard/> }
        {userPage && <UserPageCodeLog/> }
        {userPage && <UserPageChat/> }
      </div>
    </div>
  )
}