import React from 'react';

import './style.css';
import BoardListResponseDto from '../../interface/response/board/board-list.response.dto';
import { dateFormat } from '../../utils';

interface Props{
    item: BoardListResponseDto;
}

// component //
export default function Top3ListItem({item} : Props) {

    // state //
    const { boardNumber, boardTitle, boardContents, boardImageUrl } = item;
    const { boardViewCount, boardCommentCount, boardFavoriteCount } = item;
    const { boardWriteDatetime, boardWriterNickname, boardWriterProfileImageUrl } = item;

    const boardBackground = boardImageUrl ? { backgroundImage : `url(${boardImageUrl})` } : { backgroundColor: 'rgba(0, 0, 0, 0.6)' };
    const writerBackground = boardWriterProfileImageUrl ? { backgroundImage : `url(${boardWriterProfileImageUrl})` } : { backgroundColor: 'rgba(0, 0, 0, 0.6)' };



    // function //

    // event handler //

    // effect //

    // render //
    return (
        <div className='top3-board-list' style={boardBackground}>
            <div className='top3-board-list-top'>
                <div className='top3-board-list-top-profile' style={writerBackground}></div>
                    <div className='top3-board-list-top-box'>
                        <div className='top3-board-list-top-profile-nickname'>{boardWriterNickname}</div>
                        <div className='top3-board-list-top-board-date'>{ dateFormat(boardWriteDatetime) }</div>
                    </div>
                </div>
                <div className='top3-board-list-mid'>
                    <div className='top3-board-list-mid-title'>{ boardTitle }</div>
                    <div className='top3-board-list-mid-contents'>{ boardContents }</div>
                </div>
                <div className='top3-board-list-bottom'>
                    <div className='top3-board-list-bottom-comment'>{`댓글 ${boardCommentCount}`}</div>
                    <div className='top3-board-list-bottom-favorite'>{`좋아요 ${boardFavoriteCount}`}</div>
                     <div className='top3-board-list-bottom-view'>{`조회수 ${boardFavoriteCount}`}</div>
                </div>
        </div>
    )
}
