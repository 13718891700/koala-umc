package com.xingling.umc.rocketmq;

import com.xingling.umc.config.RocketmqConfig;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import org.apache.rocketmq.common.message.MessageExt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

/**
 * <p>Title:	  koala-umc <br/> </p>
 * <p>Description TODO <br/> </p>
 * <p>Company:    http://www.hnxianyi.com  <br/> </p>
 *
 * @Author <a href="190332447@qq.com"/>杨文生</a>  <br/>
 * @Date 2017/8/4 12:54
 */
public class MessageListener implements MessageListenerConcurrently {

	public static final Logger logger = LoggerFactory.getLogger(RocketmqConfig.class);

	private MessageProcessor messageProcessor;

	public void setMessageProcessor(MessageProcessor messageProcessor) {
		this.messageProcessor = messageProcessor;
	}

	@Override
	public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
		for (MessageExt messageExt : msgs){
			boolean result = messageProcessor.handleMessage(messageExt);
			if (!result && messageExt.getReconsumeTimes() == 3) {
				//多次重试消费失败后，持久化操作
				logger.info("重试结束");
				return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
			}
			if (!result){
				return ConsumeConcurrentlyStatus.RECONSUME_LATER;
			}
			logger.info("消费失败，当前次数：" + messageExt.getReconsumeTimes());
		}
		return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
	}
}