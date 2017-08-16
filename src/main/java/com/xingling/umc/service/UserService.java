package com.xingling.umc.service;

import com.xingling.service.BaseService;
import com.xingling.umc.model.domain.User;

/**
 * <p>Title:	  UserService <br/> </p>
 * <p>Description 用户service <br/> </p>
 * <p>Company:    http://www.hnxianyi.com  <br/> </p>
 *
 * @Author <a href="190332447@qq.com"/>杨文生</a>  <br/>
 * @Date 2017/5/15 13:49
 */
public interface UserService extends BaseService<User> {

	/**
	 * <p>Title:	  selectUserByUserName. </p>
	 * <p>Description 根据用户名查询用户</p>
	 *
	 * @param
	 * @Author        <a href="190332447@qq.com"/>杨文生</a>
	 * @CreateDate    2017/6/10 14:16
	 * @return        User
	 */
	User selectUserByUserName(String username);
}
