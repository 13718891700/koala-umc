package com.xingling.umc.rocketmq;

import org.apache.rocketmq.common.message.MessageExt;
import org.springframework.stereotype.Component;

/**
 * <p>Title:	  koala-umc <br/> </p>
 * <p>Description TODO <br/> </p>
 * <p>Company:    http://www.hnxianyi.com  <br/> </p>
 *
 * @Author <a href="190332447@qq.com"/>杨文生</a>  <br/>
 * @Date 2017/8/4 12:55
 */
@Component
public class MessageProcessorImpl implements MessageProcessor {
	@Override
	public boolean handleMessage(MessageExt messageExt) {
		System.out.println("receive : " + messageExt.toString());
		return true;
	}
}

