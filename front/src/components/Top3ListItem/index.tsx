import React, { useEffect, useState } from 'react';

import './style.css';
import BoardListResponseDto from '../../interfaces/response/board/board-list.response.dto';
import { dateFormat } from '../../utils';
import GetBoardResponseDto from 'src/interfaces/response/board/get-board.response.dto';
import ResponseDto from 'src/interfaces/response/response.dto';
import { BOARD_DETAIL_PATH, MAIN_PATH } from 'src/constants';
import { useNavigate } from 'react-router-dom';
import { getBoardRequest } from 'src/apis';

interface Props {
    item: BoardListResponseDto;
}

// component //
export default function Top3ListItem({item} : Props) {

    // state //
    const { boardNumber, boardTitle, boardContents, boardImageUrl } = item;
    const { boardViewCount, boardCommentCount, boardFavoriteCount } = item;
    const { boardWriteDatetime, boardUserNickname, boardUserProfileImageUrl } = item;

    const boardBackground = boardImageUrl ? { backgroundImage : `url(${boardImageUrl})` } : { backgroundColor: 'rgba(0, 0, 0, 0.6)' };
    const writerBackground = boardUserProfileImageUrl ? { backgroundImage : `url(${boardUserProfileImageUrl})` } : { backgroundColor: 'rgba(0, 0, 0, 0.6)' };

    const [board, setBoard] = useState<GetBoardResponseDto | null>(null);

    // 네비게이터 함수 //
    const navigator = useNavigate();
    
    // function //
    const getBoardResponseHandler = (responseBody: GetBoardResponseDto | ResponseDto) => {
        const { code } = responseBody;
    
        if (code === 'NB') alert('존재하지 않는 게시물입니다.');
        if (code === 'VF') alert('게시물번호가 잘못되었습니다.');
        if (code === 'DE') alert('데이터베이스 에러입니다.');
        if (code !== 'SU') {
          navigator(MAIN_PATH);
          return;
        }
    
        setBoard(responseBody as GetBoardResponseDto);
        }
    

    // event handler //
    const onBoardClickHandler = () => {
        getBoardRequest(boardNumber).then(getBoardResponseHandler);
        navigator(BOARD_DETAIL_PATH(boardNumber));
    }

    // effect //

    // render //
    return (
        <div className='top3-board-list' style={boardBackground} onClick={onBoardClickHandler}>
            <div className='top3-board-list-top'>
                <div className='top3-board-list-top-profile' style={writerBackground}></div>
                    <div className='top3-board-list-top-box'>
                        <div className='top3-board-list-top-profile-nickname'>{boardUserNickname}</div>
                        <div className='top3-board-list-top-board-date'>{ dateFormat(boardWriteDatetime) }</div>
                    </div>
                </div>
                <div className='top3-board-list-mid'>
                    <div className='top3-board-list-mid-title'>{ boardTitle }</div>
                    <div className='top3-board-list-mid-contents'>
                        { boardContents.length > 40 ? boardContents.substring(0,37) + "..." : boardContents }
                        </div>
                </div>
                <div className='top3-board-list-bottom'>
                    <div className='top3-board-list-bottom-comment'>{`댓글 ${boardCommentCount}`}</div>
                    <div className='top3-board-list-bottom-favorite'>{`좋아요 ${boardFavoriteCount}`}</div>
                     <div className='top3-board-list-bottom-view'>{`조회수 ${boardViewCount}`}</div>
                </div>
        </div>
    )
}
