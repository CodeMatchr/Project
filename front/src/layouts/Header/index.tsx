import React, { useState } from 'react';
import './style.css';

// component //
export default function Header() {

    // state //
    // 로그인 상태 //
    const [signIn, setSignIn] = useState<boolean>(false);
    // 검색어 상태 //
    const [searchWord, setSearchWord] = useState<String>('');
    // 검색 아이콘 버튼 클릭 상태 //
    const [searchIconState, setSearchIconState] = useState<boolean>(false);


    // function //

    // event handler //

    // 검색 아이콘 버튼 클릭 이벤트 //
    const onSearchIconButtonClickHandler = () => {
        if (searchIconState) setSearchIconState(false);
        else setSearchIconState(true);
    }

    // effect //

    // render //
    return (
        <div id='header'>
            <div className='header-box'>
                <div className='header-left'>
                    <div className='header-left-logo-icon'>logo</div>
                    <div className='header-left-logo-text'>Code Matchr</div>
                </div>
                <div className='header-right'>
                    {/* Sign in, Sign out, Search, Profile */}
                    <div className='header-right-sign-in-button'>Sign-In</div>
                    <div className='header-right-sign-out-button'>Sign-Out</div>
                    {(searchIconState) ? (
                        <div className='header-right-search'>
                            <input className='header-right-search-input' placeholder='검색어를 입력해주세요.' />
                            <div className='header-right-search-icon-button' onClick={onSearchIconButtonClickHandler}>icon</div>
                        </div>) : (
                            <div className='header-right-search-icon-only'>
                                <div className='header-right-search-icon-button' onClick={onSearchIconButtonClickHandler}>icon</div>
                            </div>
                        )
                    }
                    <div className='header-right-profile-button'>profile</div>
                </div>
            </div>
        </div>
    )
}
