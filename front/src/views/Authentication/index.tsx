import React from 'react';
import { useState } from 'react';
import './style.css';
import InputBox from '../../components/InputBox';
import { useNavigate } from 'react-router-dom';

import { INPUT_ICON, MAIN_PATH, emailBlanck, emailPattern, telNumberPattern } from '../../constants';
import { useDaumPostcodePopup, Address } from 'react-daum-postcode';
import { useCookies } from 'react-cookie';
import { SignInRequestDto } from '../../interfaces/request/authentication';


//            component           //
export default function Authentication() {

//            state           //
// description : Cookies 상태 //
const [cookies, setCookie] = useCookies();
// description : 로그인 혹은 회원가입 뷰 상태 //
const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');

//            function           //
// description : 네비게이터 함수 //
const navigator = useNavigate();

//            event handler           //


    //            component           //
    // description : 로그인 컴포넌트 //
    const SignInCard = () => {

      //            state           //
      // description : password icon 상태 //
      const [showPassword, setShowPassword] = useState<boolean>(false);

      // description : 로그인 error 상태 //
      const [error, setError] = useState<boolean>(false);
      // description : email 입력값 상태 //
      const [email, setEmail] = useState<string>('');
      // description : password 입력값 상태 //
      const [password, setPassword] = useState<string>('');
      // description : password 찾기 상태 //
      const [passwordForgot, setPasswordForgot] = useState<boolean>(false);


      //            function           //
      //            event handler           //
      // description: password icon 타입 변경 이벤트 //
      const onPasswordIconClickHandler = () => {
        setShowPassword(!showPassword);
      }
      // description : SignUp 페이지 이동 클릭 이벤트 //
      const onSignUpClickHandler = () => {
        setView('sign-up');
      }
      // todo : SignIn Button 클릭 이벤트 //
      const onSignInButtonClickHandler = async () => {

      }

      //            component           //
      //            effect           //
      //            render           //
      return (
        <div className='authentication-card'>
          <div className='authentication-top'>
            <div className='authentication-top-text-box'>
              <div className='authentication-top-text'>Sign in to your account</div>
            </div>
            <div className='authentication-top-member-box'>
              <div className='authentication-top-member-box-left'>Not a member?</div>
              <div className='authentication-top-member-box-right' onClick={onSignUpClickHandler}>Make your account</div>
            </div>
          </div>
          <div className='authentication-middle'>
            <div className='authentication-middle-input-container'>
              <InputBox label='Email address' type='text' placeholder='이메일을 입력해주세요.' error={error} value={email} setValue={setEmail} />
              <InputBox label='Password' labelError={passwordForgot ? 'Forgot Password ?' : ''} type={showPassword ? 'text' : 'password'} icon={showPassword ? INPUT_ICON.ON : INPUT_ICON.OFF} placeholder='비밀번호를 입력해주세요.' error={error} value={password} setValue={setPassword} buttonHandler={onPasswordIconClickHandler}/>
                <div className='authentication-middle-button-box'>
                  {error && error ? 
                    <button className='authentication-middle-button-error'>Sign in</button> : 
                    <button className='authentication-middle-button' onClick={onSignInButtonClickHandler}>Sign in</button>
                  }
                </div>
            </div>
          </div>
          <div className='authentication-bottom'>
            <div className='authentication-bottom-line-box'>
              <div className='divider'></div>
              <div className='authentication-bottom-line-text'>Or continue with</div>
            </div>
            <div className='authentication-bottom-oauth-login-box'>
              <div className='authentication-bottom-oauth-login-github-box'>
                <div className='authentication-bottom-oauth-login-github-logo'></div>
                <div className='authentication-bottom-oauth-login-github'>Github</div>
              </div>
              <div className='authentication-bottom-oauth-login-kakao-box'>
                <div className='authentication-bottom-oauth-login-kakao-logo'></div>
                <div className='authentication-bottom-oauth-login-kakao'>Kakao</div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    //            component           //
    // description : 회원가입 컴포넌트 //
    const SignUpCard = () => {
      //            state           //
      // description: 다음 포스트 (우편번호검색) 팝업 상태 //
      const open = useDaumPostcodePopup();

      // description : 회원가입 페이지 상태 //
      const [page, setPage] = useState<1|2>(1);
      // description : 회원가입 에러 상태 (Next/Sign Up button) //
      const [pageError, setPageError] = useState<boolean>(false);
      // description : password icon 상태 //
      const [showPassword, setShowPassword] = useState<boolean>(false);
      // description : passwordValidation icon 상태 //
      const [showPasswordValidation, setShowPasswordValidation] = useState<boolean>(false);      

      // description : 이메일 상태 //
      const [email, setEmail] = useState<string>('');
      // description : 이메일 패턴 에러 상태 //
      const [emailPatternError, setEmailPatternError] = useState<boolean>(false);
      // description : 이메일 중복 에러 상태 //
      const [emailDuplicationError, setEmailDuplicationError] = useState<boolean>(false);
      // description : 이메일 공백 에러 상태 //
      const [emailBlankError, setEmailBlankError] = useState<boolean>(false);

      // description : 비밀번호 상태 //
      const [password, setPassword] = useState<string>('');
      // description : 비밀번호 에러 상태 //
      const [passwordError, setPasswordError] = useState<boolean>(false);

      // description : 비밀번호 확인 상태 //
      const [passwordValidation, setPasswordValidation] = useState<string>('');
      // description : 비밀번호 확인 에러 상태 //
      const [passwordValidationError, setPasswordValidationError] = useState<boolean>(false); 

      // description : 닉네임 상태 //
      const [nickname, setNickname] = useState<string>('');
      // description : 닉네임 에러상태 //
      const [nicknameError, setNicknameError] = useState<boolean>(false);

      // description : 휴대전화번호 상태 //
      const [telnumber, setTelnumber] = useState<string>('');
      // description : 휴대전화번호 패턴 에러 상태 //
      const [telNumberPatternError, setTelNumberPatternError] = useState<boolean>(false);
      // description : 휴대전화번호 에러 상태 //
      const [telnumberError, setTelnumberError] = useState<boolean>(false);
      
      // description : 주소 상태 //
      const [address, setAddress] = useState<string>('');
      // description : 주소 에러 상태 //
      const [addressError, setAddressError] = useState<boolean>(false);

      // description : 상세주소 입력값 상태 //
      const [addressDetail, setAddressDetail] = useState<string>('');
      // description : 상세주소 에러 상태 //
      const [addressDetailError, setAddressDetailError] = useState<boolean>(false);
            
      //            function           //
      // description : 페이지 1에서 2로 이동시 검증 클릭 함수 //
      const checkPage1 = () => {
        const emailPatternFlag = !emailPattern.test(email);
        const emailBlankFlag = emailBlanck.test(email);
        const passwordFlag = password.length < 8;
        const passwordValidationFlag = password !== passwordValidation;

        setEmailBlankError(emailBlankFlag);
        setEmailPatternError(emailPatternFlag);
        setPasswordError(passwordFlag);
        setPasswordValidationError(passwordValidationFlag);

        if(!emailPatternFlag && !emailBlankFlag && !passwordFlag && !passwordValidationFlag) setPage(2);
      }
      // description : 페이지 2에서 회원가입 버튼 클릭 함수 //
      const checkPage2 = () => {
        const telnumberFlag = !telNumberPattern.test(telnumber);

        setTelnumberError(telnumberFlag);
        setNicknameError(!nickname);
        setAddressError(!address);
        setAddressDetailError(!addressDetail);

        if(!telnumberFlag&& nickname && address && addressDetail) setView('sign-in');
      }

      //            event handler           //
      // description: 주소 검색 버튼 클릭 이벤트 //
      const onAddressIconClickHandler = () => {
        open({ onComplete });
      }
      // description: 주소 검색 완료 이벤트 //
      const onComplete = (data: Address) => {
        const address = data.address;
        setAddress(address);
      }

      // description: password icon 타입 변경 이벤트 //
      const onPasswordIconClickHandler = () => {
        setShowPassword(!showPassword);
      }
      // description: passwordValidation icon 타입 변경 이벤트 //
      const onPasswordValidationIconClickHandler = () => {
        setShowPasswordValidation(!showPasswordValidation);
      }      

      // description : 로그인 버튼 클릭 이벤트 //
      const onSignInClickHandler = () => {
        setView('sign-in');
      }
      // description : Next or Sign Up 버튼 클릭 이벤트 //
      const onNextButtonClickHandler = () => {
        setEmailPatternError(false);
        setEmailDuplicationError(false);
        setEmailBlankError(false);
        setPasswordError(false);
        setPasswordValidationError(false);
        setNicknameError(false);
        setTelnumberError(false);
        setAddressError(false);
        setAddressDetailError(false);

        if(page === 1) checkPage1();
        if(page === 2) checkPage2();
      }
      

      //            component           //
      //            effect           //
      //            render           //
      return (
        <div className='authentication-card'>
          <div className='authentication-top'>
            <div className='authentication-top-text-box'> 
              <div className='authentication-top-text'>Creact account</div>
              <div className='authentication-top-text-opercity'>{`${page}/2`}</div>
            </div>
          </div>
          <div className='authentication-middle'>
            <div className='authentication-middle-input-container'>
              {page === 1 ? (
                <>
                  <InputBox label='Email address *' type='text' placeholder='이메일을 입력해주세요.' error={emailPatternError || emailDuplicationError || emailBlankError} helper={emailPatternError ? '이메일 형식이 맞지 않습니다. 형식에 맞게 다시 입력해주세요.' : emailDuplicationError ? '존재하는 이메일입니다.' : emailBlankError ? '이메일을 입력하지 않았습니다. 이메일을 입력해주세요.' : ''} value={email} setValue={setEmail} />
                  <InputBox label='Password *' type={showPassword ? 'text' : 'password'} icon={showPassword ? INPUT_ICON.ON : INPUT_ICON.OFF} placeholder='비밀번호를 입력해주세요.' error={passwordError} helper={passwordError ? '잘못입력하셨습니다. 다시 비밀번호를 입력해주세요.' : ''} value={password} setValue={setPassword} buttonHandler={onPasswordIconClickHandler}/>
                  <InputBox label='Password Validation *' type={showPasswordValidation ? 'text' : 'password'} icon={showPasswordValidation ? INPUT_ICON.ON : INPUT_ICON.OFF} placeholder='입력하신 비밀번호를 다시 입력해주세요.' error={passwordValidationError} helper={passwordValidationError ? '입력하신 비밀번호를 다시 입력해주세요.' : ''} value={passwordValidation} setValue={setPasswordValidation} buttonHandler={onPasswordValidationIconClickHandler} />
                </>
                ) : (
                <>
                  <InputBox label='Nickname *' type='text' placeholder='닉네임을 입력해주세요.' error={nicknameError} helper={nicknameError ? '닉네임을 입력하지 않았습니다. 다시 입력해주세요.' : ''} value={nickname} setValue={setNickname} />
                  <InputBox label='Telnumber *' type='text' placeholder='휴대전화 번호를 입력해주세요.' error={telnumberError || telNumberPatternError} helper={telnumberError ? '휴대전화 번호를 입력하지 않았습니다. 다시 입력해주세요.' : telNumberPatternError ? '잘못입력하셨습니다. 다시 휴대전화 번호를 입력해주세요.' : ''} value={telnumber} setValue={setTelnumber} />
                  <InputBox label='Address *' type='text' placeholder='주소를 입력해주세요.' icon={INPUT_ICON.ADDRESS} error={addressError} helper={addressError ? '주소를 입력하지 않았습니다. 다시 입력해주세요.' : ''} value={address} setValue={setAddress} buttonHandler={onAddressIconClickHandler} />
                  <InputBox label='Address detail *' type='text' placeholder='상세 주소를 입력해주세요.' error={addressDetailError} helper={addressDetailError ? '상세주소를 입력하지 않았습니다. 다시 입력해주세요.' : ''} value={addressDetail} setValue={setAddressDetail} />
                </>
                )
              }
            </div>
          </div>
        <div className='authentication-bottom'>
            {pageError ?
              <div className='authentication-bottom-button-error'>
              {page === 1 ? 'NEXT' : 'Sign Up '}
              </div>
            :
              <div className='authentication-bottom-button' onClick={onNextButtonClickHandler}>
              {page === 1 ? 'NEXT' : 'Sign Up '}
              </div>
            }
          <div className='authentication-bottom-button-text'>
            이미 계정이 있으신가요? <span className='authentication-emphasis' onClick={onSignInClickHandler} >Sign In</span> 
          </div>
        </div>
      </div>
      )
    }
    
    
//            effect           //
//            render           //
  return (
    <div id='authentication-wrapper'>
      <div className='authentication-left'></div>
      <div className='authentication-right'>
        {view === 'sign-in' ? (<SignInCard/>) : (<SignUpCard/>)}
      </div>
    </div>
  )
}