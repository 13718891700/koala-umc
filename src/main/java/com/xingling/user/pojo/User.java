package com.xingling.user.pojo;

import com.xingling.pojo.BaseEntiy;
import lombok.Data;

import java.util.Date;

@Data
public class User extends BaseEntiy {

    /**
     * 用户名
     */
    private String userName;
    /**
     * 密码
     */
    private String password;
    /**
     * 真实姓名
     */
    private String realName;
    /**
     * 性别
     */
    private String sex;
    /**
     * 年龄
     */
    private Integer age;
    /**
     * 出生日期
     */
    private Date birthday;
    /**
     * 密码
     */
    private String cellPhone;
    /**
     * 邮箱
     */
    private String email;
    /**
     * 地址
     */
    private String address;
    /**
     * 城市
     */
    private String city;
    /**
     * 国家
     */
    private String country;
    /**
     * 状态
     */
    private Integer status;
    /**
     * 最近登录时间
     */
    private Date lastLoginDatetime = new Date();
    /**
     * 账户禁用
     */
    private boolean enabled = true;
    /**
     * 是否被删除
     */
    private boolean isDeleted = false;
    /**
     * 账户过期
     */
    private boolean isAccountExpired = false;
    /**
     * 密码过期
     */
    private boolean isAccountLocked = false;
    /**
     * 密码过期
     */
    private boolean isCredentialsExpired = false;

}