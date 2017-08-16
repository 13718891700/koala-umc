package com.xingling.umc.service.impl;

import com.xingling.service.impl.BaseServiceImpl;
import com.xingling.umc.mapper.UserMapper;
import com.xingling.umc.model.domain.User;
import com.xingling.umc.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * <p>Title:	  koala-umc <br/> </p>
 * <p>Description TODO <br/> </p>
 * <p>Company:    http://www.hnxianyi.com  <br/> </p>
 *
 * @Author <a href="190332447@qq.com"/>杨文生</a>  <br/>
 * @Date 2017/5/15 13:50
 */
@Service
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService{

	@Resource
	private UserMapper userMapper;

	@Override
	public User selectUserByUserName(String username) {
		return userMapper.selectUserByUserName(username);
	}
}
