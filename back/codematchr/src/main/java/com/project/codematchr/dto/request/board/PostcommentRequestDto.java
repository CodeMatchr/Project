package com.project.codematchr.dto.request.board;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostcommentRequestDto {
  
  @NotBlank
  private String commentContents;

}
