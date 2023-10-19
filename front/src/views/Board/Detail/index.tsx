import React from 'react';
import './style.css'

// component //
export default function BoardDetail() {

    // state //

    // function //

    // event handler //

    // effect //

    // render //
    return (
        <div id='board-detail-wrapper'>
            <div className='board-detail-button-box'>
                    <div className='board-detail-update-button'>수정</div>
                    <div className='board-detail-delete-button'>삭제</div>
            </div>
            <div className='board-detail-box'>    
                <div className='board-detail-list'>
                    <div className='board-detail-data'>
                        <div className='board-detail-write-datetime'>작성일자</div>
                        <div className='board-detail-title'>게시물 제목</div>
                    </div>
                    <div className='board-detail-writer-profile'>
                        <div className='board-detail-writer-profile-image'></div>
                        <div className='board-detail-writer-nickname'>User Nickname</div>
                    </div>
                </div>
                <div className='board-detail-body'>
                    <div className='board-detail-body-contents'>게시물 내용</div>
                    <div className='board-detail-body-image-box'>
                        <img className='board-detail-image' src="" alt="board-detail-image" />
                    </div>
                </div>
                <div className='board-detail-show-button'>
                    <div className='board-detail-favorite-icon-box'>
                        <div className='board-detail-favorite-show-icon'></div>
                        <div className='board-detail-favorite'>좋아요 수</div>
                    </div>
                    <div className='board-detail-comment-icon-box'>
                        <div className='board-detail-comment-show-icon'></div>
                        <div className='board-detail-comment'>댓글수</div>
                    </div>
                </div>

                <div className='board-detail-favorite-list'>
                    <div className='board-detail-favorite-list-title'>좋아요 수</div>
                    <div className='board-detail-favorite-list-user'>
                        {/* component ? */}
                        <div className='favorite-list-item-box'>
                            <div className='favorite-list-item-writer-profile'>
                                <div className='favorite-list-item-profile-image'></div>
                                <div className='favorite-list-item-writer-data'>
                                    <div className='favorite-list-item-writer-nickname'>User Nickname</div>
                                    <div className='favorite-list-item-write-time'>write datetime</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='board-detail-comment-list'>
                    <div className='board-detail-comment-list-title'>댓글수</div>
                    <div className='board-detail-comment-list-user'>
                        {/* component ? */}
                        <div className='comment-list-item-box'>
                            <div className='comment-list-item-writer-profile'>
                                <div className='comment-list-item-profile-image'></div>
                                <div className='comment-list-item-writer-data'>
                                    <div className='comment-list-item-writer-nickname'>User Nickname</div>
                                    <div className='comment-list-item-write-time'>write datetime</div>
                                </div>
                            </div>
                            <div className='comment-list-item-comment'></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
