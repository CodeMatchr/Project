package com.project.codematchr.entity;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import com.project.codematchr.dto.request.authentication.SignUpRequestDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="user")
@Table(name="user")
public class UserEntity {

    @Id
    private String userEmail;
    private String userPassword;
    private String userNickname;
    private String userStateMessage;
    private String userTelnumber;
    private String userAddress;
    private String userAddressDetail;
    private String userProfileImageUrl;

    public UserEntity(SignUpRequestDto dto) {
    this.userEmail = dto.getUserEmail();
    this.userPassword = dto.getUserPassword();
    this.userNickname = dto.getUserNickname();
    this.userStateMessage = dto.getUserStateMessage();
    this.userTelnumber = dto.getUserTelnumber();
    this.userAddress = dto.getUserAddress();
    this.userAddressDetail = dto.getUserAddressDetail();
    }

    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname;
    }

    public void setUserStateMessage(String userStateMessage) {
        this.userStateMessage = userStateMessage;
    }

    public void setUserProfileImageUrl(String userProfileImageUrl) {
        this.userProfileImageUrl = userProfileImageUrl;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }
    
}
