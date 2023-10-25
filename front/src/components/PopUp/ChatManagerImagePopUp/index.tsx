import React, { useState, useRef, ChangeEvent, useEffect, SetStateAction, Dispatch } from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH, ROOM_DETAIL_PATH, ROOM_PATH } from '../../../constants';
import { useRoomStore } from 'src/store';
import { useCookies } from 'react-cookie';
import { PatchRoomImageUrlRequestDto } from 'src/interfaces/request/room';
import { PatchRoomImageUrlRequest, getRoomRequest, uploadFileRequest } from 'src/apis';
import GetRoomResponseDto from 'src/interfaces/response/room/get-room.response.dto';
import ResponseDto from 'src/interfaces/response/response.dto';

interface Props {
    selectRoomNumber : number;
    setPopUpImageState : Dispatch<SetStateAction<boolean>>;
}

//            component           //
// description : 채팅방 매니저 팝업창 //
export default function ChatManagerImagePopUp({selectRoomNumber, setPopUpImageState} : Props) {
    //            state           //
    
    const { roomNumber, roomTitle, roomPassword, roomImage, roomImageUrl, resetRoom, setRoomNumber, setRoomImageUrl, setRoomImage, setRoomPassword, setRoomTitle } = useRoomStore();

    const [cookies, setCookie] = useCookies();

    // 채팅방 상태 //
    const [room, setRoom] = useState<GetRoomResponseDto | null>(null);

    // description : 채팅방 나가기 버튼 상태 //
    const [roomExit, setRoomExit] = useState<boolean>(false);

    // description : 파일 업로드 버튼 //
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [roomNumberFlag, setRoomNumberFlag] = useState<boolean>(true);

    // 이미지를 저장할 상태 //
    const [roomImageState, setRoomImageState] = useState<string>('');

    //            function           //
    // 네비게이터 //
    const navigator = useNavigate();

    // 파일 업로드 //
    const fileUpload = async () => {
    if (roomImage === null) return null;
  
    const data = new FormData();
    data.append('file', roomImage);
  
    const imageUrl = await uploadFileRequest(data);
    return imageUrl;
    }

    // 채팅방 불러오기 응답 처리 //
    const getRoomResponseHnadler = (responseBody : GetRoomResponseDto | ResponseDto) => {
        const {code} = responseBody;
        if (code == 'NR') alert('존재하지 않는 채팅방입니다.');
        if (code != 'SU') {
            navigator(MAIN_PATH);
            return;
        }

        const room = responseBody as GetRoomResponseDto;
    
        setRoom(room);
        setRoomNumber(room.roomNumber);
        setRoomImageUrl(room.roomImageUrl);
    }

    // Room imageUrl 변경 이벤트 //
    const onImageInputChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files || !event.target.files.length) return;
        const imageUrl = URL.createObjectURL(event.target.files[0]);
        setRoomImageState(imageUrl);
        setRoomImage(event.target.files[0])
    }

    const patchRoomImageUrlResponseHandler = (code: string) => {
        if (code == 'NR') alert ('존재하지 않는 다인원 채팅방 번호입니다.');
        if (code == 'NP') alert ('권한이 없습니다.');
        if (code != 'SU') return;

        const accessToken = cookies.accessToken;
        getRoomRequest(roomNumber, accessToken).then(getRoomResponseHnadler);
        if(!roomNumber) return;
        navigator(ROOM_DETAIL_PATH(roomNumber));
    }

    //            event handler           //
    // description : 변경 버튼 클릭 이벤트 //
    const onChangeClickHandler = async () => {
        const token = cookies.accessToken;

        const imageUrl = roomImage ? await fileUpload() : roomImage;

        const data : PatchRoomImageUrlRequestDto = {
            roomImageUrl : imageUrl
        }

        PatchRoomImageUrlRequest(roomNumber, data, token).then(patchRoomImageUrlResponseHandler);
    }
    // description : 취소 버튼 클릭 이벤트 //
    const onCancelClickHandler = () => {
        setPopUpImageState(false);
    }
    // description : 파일 업로드 버튼 클릭 이벤트 //
    const onFileUploadClickHandler = () => {
        if(!fileInputRef.current) return;
        fileInputRef.current.click();
    }

    //            effect           //
    useEffect(() => {
        console.log(`roomNumber : ${roomNumber}`)
        if(roomNumberFlag) {
            setRoomNumberFlag(false);
            return;
        }
        if(!roomNumber) {
            alert('채팅방 번호가 잘못되었습니다.');
            navigator(MAIN_PATH);
            return;
        }
        const accessToken = cookies.accessToken;
        getRoomRequest(roomNumber, accessToken).then(getRoomResponseHnadler);
        }, [roomNumber, roomTitle, roomPassword, roomImage, roomImageUrl]);
    
    //            render           //
    return (
    <div id='popup-manager-wrapper'>
        <div className='popup-manager-box'>
            <div className='popup-manager-top-box'>
                <div className='popup-manager-top-title'>채팅방 이미지 변경</div>
            </div>
            <div className='popup-manager-middle-box'>
                <div className='popop-manager-middle-file-box'>
                    <div className='popup-manager-middle-file'>
                       <div className='popup-manager-middle-file-button' onClick={onFileUploadClickHandler}>File<input className='file-button' ref={fileInputRef} type='file'accept='image/*' style={{ display: 'none' }} onChange={onImageInputChangeHandler}></input></div>
                    </div>
                </div>
                <div className='popup-manager-middle-text-box'>
                    <div className='popup-manager-middle-text'>
                        <input className='popup-manager-middle-text-input' placeholder='변경할 채팅방 이미지 파일을 업로드 해주세요.'></input>
                    </div>
                </div>
            </div>
            <div className='popup-manager-bottom-box'>
                <div className='popup-manager-bottom-button-change-box'>
                    <button className='popup-manager-bottom-button-change' onClick={onChangeClickHandler}>변경</button>
                </div>
                <div className='popup-manager-bottom-button-cancel-box'>
                    <button className='popup-manager-bottom-button-cancel' onClick={onCancelClickHandler}>취소</button>
                </div>
            </div>
        </div>
    </div>
  )
}
