package com.xingling.umc.controller;

import com.github.pagehelper.Page;
import com.xingling.controller.BaseController;
import com.xingling.exception.BusinessException;
import com.xingling.umc.model.domain.User;
import com.xingling.umc.service.UserService;
import com.xingling.wrap.WrapMapper;
import com.xingling.wrap.Wrapper;
import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.common.message.Message;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;
import java.util.UUID;

/**
 * <p>Title:	  koala-umc <br/> </p>
 * <p>Description TODO <br/> </p>
 * <p>Company:    http://www.hnxianyi.com  <br/> </p>
 *
 * @Author <a href="190332447@qq.com"/>杨文生</a>  <br/>
 * @Date 2017/6/2 13:11
 */
@Controller
@RequestMapping(value = "/umc/user", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class UserController extends BaseController{

    @Resource
    private UserService userService;

	@Qualifier("getRocketMQProducer")
	@Resource
	private DefaultMQProducer defaultMQProducer;


	@ResponseBody
    @RequestMapping(value = "/queryUserListWithPage", method= RequestMethod.GET)
    public Wrapper<?> queryUserListWithPage(Page<User> page, User user) {
        List<User> userList;
        try {
            userList = userService.selectAll();
        } catch (BusinessException ex) {
            logger.error("查询用户列表, 出现异常={}", ex.getMessage(), ex);
            return WrapMapper.wrap(Wrapper.ERROR_CODE, ex.getMessage());
        } catch (Exception ex) {
            logger.error("查询用户列表, 出现异常:{}", ex.getMessage(), ex);
            return WrapMapper.error();
        }
        return WrapMapper.wrap(Wrapper.SUCCESS_CODE, Wrapper.SUCCESS_MESSAGE, userList);
    }

	@ResponseBody
	@RequestMapping(value = "/sendMsg", method= RequestMethod.GET)
	public Wrapper<?> sendMsg() {
		try {
			Message msg = new Message("testTopic",// topic
					"testTag",// tag
					UUID.randomUUID().toString(),//key用于标识业务的唯一性
					("Hello RocketMQ !!!!!!!!!!" ).getBytes()// body 二进制字节数组
			);
			defaultMQProducer.send(msg);
		} catch (BusinessException ex) {
			logger.error("查询用户列表, 出现异常={}", ex.getMessage(), ex);
			return WrapMapper.wrap(Wrapper.ERROR_CODE, ex.getMessage());
		} catch (Exception ex) {
			logger.error("查询用户列表, 出现异常:{}", ex.getMessage(), ex);
			return WrapMapper.error();
		}
		return WrapMapper.wrap(Wrapper.SUCCESS_CODE, Wrapper.SUCCESS_MESSAGE);
	}
}
