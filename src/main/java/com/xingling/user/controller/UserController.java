package com.xingling.user.controller;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xingling.controller.BaseController;
import com.xingling.exception.BusinessException;
import com.xingling.user.pojo.User;
import com.xingling.user.service.UserService;
import com.xingling.wrap.WrapMapper;
import com.xingling.wrap.Wrapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller  
@RequestMapping("/user") 
public class UserController extends BaseController {
	
	@Resource
	private UserService userService;

	@ResponseBody
	@RequestMapping(value = "/queryUserListWithPage", method= RequestMethod.POST)
	public Wrapper<?> queryUserListWithPage(Page<User> page) {
		List<User> list;
		PageInfo<User> pageInfo;
		try {
			PageHelper.startPage(page.getPageNum(), page.getPageSize());
			PageHelper.orderBy("update_time DESC");
			list = userService.selectAll();
			pageInfo = new PageInfo<>(list);
		} catch (BusinessException ex) {
			logger.error("分页查询用户列表, 出现异常={}", ex.getMessage(), ex);
			return WrapMapper.wrap(Wrapper.ERROR_CODE, ex.getMessage());
		} catch (Exception ex) {
			logger.error("分页查询用户列表, 出现异常:{}", ex.getMessage(), ex);
			return WrapMapper.error();
		}
		return WrapMapper.wrap(Wrapper.SUCCESS_CODE, Wrapper.SUCCESS_MESSAGE, pageInfo);
	}
}
