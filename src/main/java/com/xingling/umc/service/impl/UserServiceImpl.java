package com.xingling.umc.service.impl;

import com.xingling.umc.domain.User;
import com.xingling.umc.service.UserService;
import org.springframework.stereotype.Service;

/**
 * <p>Title:	  UserServiceImpl. </p>
 * <p>Description TODO </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="190332447@qq.com"/>杨文生</a>
 * @CreateDate     2017/4/20 13:16
 */
@Service
public class UserServiceImpl extends BaseService<User> implements UserService {

    @Override
    public User getUserByUserName(String username) {
        return null;
    }
}
