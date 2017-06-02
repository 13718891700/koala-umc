package com.xingling.umc.model;

import com.xingling.pojo.BaseEntiy;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.Date;

@Data
@Table(name = "xl_user")
public class User extends BaseEntiy{

    /**
     * 用户名
     */
    @Column(name = "user_name")
    private String userName;
    /**
     * 密码
     */
    @Column(name = "password")
    private String password;
    /**
     * 真实姓名
     */
    @Column(name = "real_name")
    private String realName;
    /**
     * 性别
     */
    @Column(name = "sex")
    private String sex;
    /**
     * 年龄
     */
    @Column(name = "age")
    private Integer age;
    /**
     * 出生日期
     */
    @Column(name = "birthday")
    private Date birthday;
    /**
     * 密码
     */
    @Column(name = "cell_phone")
    private String cellPhone;
    /**
     * 邮箱
     */
    @Column(name = "email")
    private String email;
    /**
     * 地址
     */
    @Column(name = "address")
    private String address;
    /**
     * 城市
     */
    @Column(name = "city")
    private String city;
    /**
     * 国家
     */
    @Column(name = "country")
    private String country;
    /**
     * 状态
     */
    @Column(name = "status")
    private Integer status;
    /**
     * 盐值
     */
    @Column(name = "salt")
    private String salt;
    /**
     * 最近登录时间
     */
    @Transient
    private Date lastLoginDatetime = new Date();
    /**
     * 账户禁用
     */
    @Transient
    private boolean enabled = true;
    /**
     * 是否被删除
     */
    @Transient
    private boolean isDeleted = false;
    /**
     * 账户过期
     */
    @Transient
    private boolean isAccountExpired = false;
    /**
     * 密码过期
     */
    @Transient
    private boolean isAccountLocked = false;
    /**
     * 密码过期
     */
    @Transient
    private boolean isCredentialsExpired = false;

}