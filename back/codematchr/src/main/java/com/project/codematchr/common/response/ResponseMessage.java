package com.project.codematchr.common.response;

public interface ResponseMessage {
    // 성공 Message
    String SUCCESS = "Success";

    // 요청 매개변수 검증 실패 Message
    String REQUEST_PARAMETER_VALIDATION_FAIL = "Request Parameter Validation Fail";

    // 존재하는 사용자 이메일 Message
    String EXISTED_USER_EMAIL = "Existed User Email";

    // 존재하지 않는 사용자 이메일 Message
    String NO_EXISTED_USER_EMAIL = "No Existed User Email";

    // 존재하는 사용자 닉네임 Message
    String EXISTED_USER_NICKNAME = "Existed User Nickname";

    // 존재하지 않는 사용자 닉네임 Code
    String NO_EXISTED_USER_NICKNAME = "NN";

    // 존재하는 휴대전화 번호 Message
    String EXISTED_USER_TELNUMBER = "Existed User Telnumber";

    // 로그인 실패 Message
    String SIGN_IN_FAIL = "Sign In Fail";

    // 비밀번호 변경 실패 Message
    String PASSWORD_CHANGE_FAIL = "Password Change Fail";

    // 설정되어 있는 비밀번호 Message
    String EXISTED_USER_PASSWORD = "EXISTED USER PASSWORD";

    // 인증 실패 Message
    String AUTHENTICATION_FAIL = "Authentication Fail";

    // 권한 없음 Message
    String NO_PERMISSION = "No Permission";

    // 존재하지 않는 게시물 번호 Message
    String NO_EXISTED_BOARD_NUMBER = "No Existed Board Number";

    // 존재하지 않는 비교 분석 결과 번호 Message
    String NO_EXISTED_COMPARE_RESULT_NUMBER = "No Existed Compare Result Number";

    // 존재하지 않는 비교 분석 결과 Message
    String NO_EXISTED_COMPARE_RESULT = "No Exsited Compare Result";

    // 데이터베이스 에러 Message
    String DATABASE_ERROR = "Database Error";

    // 존재하지 않는 다인원 채팅방 Message (NR)
    String NO_EXISTED_ROOM_NUMBER = "No Existed Room Number";

    // 이미 설정되어 있는 다인원 채팅방 제목(기존 다인원 채팅방 제목) Message (ER)
    String EXISTED_ROOM_TITLE = "Existed Room Number";

    // 이미 설정되어 있는 다인원 채팅방 비밀번호(기존 다인원 채팅방 비밀번호) Message
    String EXISTED_ROOM_PASSWORD = "Existed Room Password";
}
