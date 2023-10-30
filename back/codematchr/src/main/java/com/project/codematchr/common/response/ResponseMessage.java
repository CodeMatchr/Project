package com.project.codematchr.common.response;

public interface ResponseMessage {
    String SUCCESS = "Success";

    String REQUEST_PARAMETER_VALIDATION_FAIL = "Request Parameter Validation Fail";

    String EXISTED_USER_EMAIL = "Existed User Email";

    String NO_EXISTED_USER_EMAIL = "No Existed User Email";

    String EXISTED_USER_NICKNAME = "Existed User Nickname";

    String NO_EXISTED_USER_NICKNAME = "NN";

    String EXISTED_USER_TELNUMBER = "Existed User Telnumber";

    String SIGN_IN_FAIL = "Sign In Fail";

    String PASSWORD_CHANGE_FAIL = "Password Change Fail";

    String EXISTED_USER_PASSWORD = "EXISTED USER PASSWORD";

    String AUTHENTICATION_FAIL = "Authentication Fail";

    String NO_PERMISSION = "No Permission";

    String NO_EXISTED_BOARD_NUMBER = "No Existed Board Number";

    String NO_EXISTED_COMPARE_RESULT_NUMBER = "No Existed Compare Result Number";

    String NO_EXISTED_COMPARE_RESULT = "No Exsited Compare Result";

    String DATABASE_ERROR = "Database Error";

    String NO_EXISTED_ROOM_NUMBER = "No Existed Room Number";

    String EXISTED_ROOM_TITLE = "Existed Room Number";

    String EXISTED_ROOM_PASSWORD = "Existed Room Password";

    String NOT_CORRECT_PASSWORD =  "Not Correct Password";
    
}
