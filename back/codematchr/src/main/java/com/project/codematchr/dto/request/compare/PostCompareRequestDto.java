package com.project.codematchr.dto.request.compare;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostCompareRequestDto {
    
    @NotBlank
    private String compareControlGroup;

    @NotBlank
    private String compareExperimentalGroup;

    @NotBlank
    private String compareResult;

}
