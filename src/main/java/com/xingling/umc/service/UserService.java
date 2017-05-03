package com.xingling.umc.service;

import com.xingling.umc.domain.User;

/**
 * <p>Title:	  IUserService. </p>
 * <p>Description TODO </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="190332447@qq.com"/>杨文生</a>
 * @CreateDate     2017/4/20 13:16
 */
public interface UserService extends IService<User> {

    User getUserByUserName(String username);
}
