package com.xingling.umc.model.dto;

import java.io.Serializable;

/**
 * <p>Title:	  JwtAuthenticationRespDto. </p>
 * <p>Description TODO </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="190332447@qq.com"/>杨文生</a>
 * @CreateDate     2017/8/11 18:51
 */
public class JwtAuthenticationRespDto implements Serializable {

    private static final long serialVersionUID = 1250166508152483573L;

    private final String token;

    public JwtAuthenticationRespDto(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }
}
