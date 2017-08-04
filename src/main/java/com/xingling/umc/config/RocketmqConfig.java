package com.xingling.umc.config;

import com.xingling.umc.rocketmq.MessageListener;
import com.xingling.umc.rocketmq.MessageProcessor;
import com.xingling.umc.rocketmq.RocketMQException;
import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.client.producer.TransactionMQProducer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * <p>Title:	  koala-umc <br/> </p>
 * <p>Description TODO <br/> </p>
 * <p>Company:    http://www.hnxianyi.com  <br/> </p>
 *
 * @Author <a href="190332447@qq.com"/>杨文生</a>  <br/>
 * @Date 2017/8/3 17:10
 */
@Configuration
public class RocketmqConfig {

	public static final Logger LOGGER = LoggerFactory.getLogger(RocketmqConfig.class);

	@Value("${rocketmq.groupName}")
	private String groupName;
	@Value("${rocketmq.transactionProducerGroupName}")
	private String transactionProducerGroupName;
	@Value("${rocketmq.namesrvAddr}")
	private String namesrvAddr;
	@Value("${rocketmq.instanceName}")
	private String instanceName;
	@Value("${rocketmq.maxMessageSize}")
	private int maxMessageSize;
	@Value("${rocketmq.sendMsgTimeout}")
	private int sendMsgTimeout;
	@Value("${rocketmq.topic}")
	private String topic;
	@Value("${rocketmq.tag}")
	private String tag;
	@Value("${rocketmq.consumeThreadMin}")
	private int consumeThreadMin;
	@Value("${rocketmq.consumeThreadMax}")
	private int consumeThreadMax;

	@Autowired
	@Qualifier("messageProcessorImpl")
	private MessageProcessor messageProcessor;

	@Bean
	public DefaultMQProducer getRocketMQProducer() throws RocketMQException {
		DefaultMQProducer producer;
		producer = new DefaultMQProducer(groupName);
		producer.setNamesrvAddr(namesrvAddr);
		producer.setInstanceName(instanceName);
		producer.setMaxMessageSize(maxMessageSize);
		producer.setSendMsgTimeout(sendMsgTimeout);
		try {
			producer.start();
			LOGGER.info(String.format("DefaultMQProducer is start ! groupName:[%s],namesrvAddr:[%s]", this.groupName, this.namesrvAddr));
		} catch (MQClientException e) {
			LOGGER.error(String.format("DefaultMQProducer is error {}", e.getMessage(), e));
			throw new RocketMQException(e);
		}
		LOGGER.info("DefaultMQProducer TransactionMQProducer Started.");
		return producer;
	}

	@Bean
	public TransactionMQProducer transactionProducer() throws RocketMQException{
		/**
		 * 一个应用创建一个Producer，由应用来维护此对象，可以设置为全局对象或者单例<br>
		 * 注意：ProducerGroupName需要由应用来保证唯一<br>
		 * ProducerGroup这个概念发送普通的消息时，作用不大，但是发送分布式事务消息时，比较关键，
		 * 因为服务器会回查这个Group下的任意一个Producer
		 */
		TransactionMQProducer producer = new TransactionMQProducer(transactionProducerGroupName);
		producer.setNamesrvAddr(namesrvAddr);
		producer.setInstanceName(instanceName);
		// 事务回查最小并发数
		producer.setCheckThreadPoolMinSize(2);
		// 事务回查最大并发数
		producer.setCheckThreadPoolMaxSize(2);
		// 队列数
		producer.setCheckRequestHoldMax(2000);
		try {
			producer.start();
			LOGGER.info(String.format("TransactionMQProducer is start ! groupName:[%s],namesrvAddr:[%s]", this.groupName, this.namesrvAddr));
		} catch (MQClientException e) {
			LOGGER.error(String.format("TransactionMQProducer is error {}", e.getMessage(), e));
			throw new RocketMQException(e);
		}
		LOGGER.info("RocketMq TransactionMQProducer Started.");
		return producer;
	}

	@Bean
	public DefaultMQPushConsumer getRocketMQConsumer() throws RocketMQException {
		DefaultMQPushConsumer consumer = new DefaultMQPushConsumer(groupName);
		consumer.setNamesrvAddr(namesrvAddr);
		consumer.setConsumeThreadMin(consumeThreadMin);
		consumer.setConsumeThreadMax(consumeThreadMax);
		MessageListener messageListener = new MessageListener();
		messageListener.setMessageProcessor(messageProcessor);
		consumer.registerMessageListener(messageListener);

		new Thread(new Runnable() {
			@Override
			public void run() {
				try {
					Thread.sleep(5000);//延迟5秒再启动，主要是等待spring事件监听相关程序初始化完成，否则，回出现对RocketMQ的消息进行消费后立即发布消息到达的事件，然而此事件的监听程序还未初始化，从而造成消息的丢失
					/**
					 * Consumer对象在使用之前必须要调用start初始化，初始化一次即可<br>
					 */
					try {
						consumer.subscribe(topic,tag);
						consumer.start();
						LOGGER.info("consumer is start !!! groupName:{},topic:{},namesrvAddr:{}",groupName,topic,namesrvAddr);
					} catch (Exception e) {
						LOGGER.error("consumer is start !!! groupName:{},topic:{},namesrvAddr:{}",groupName,topic,namesrvAddr,e);
						e.printStackTrace();
					}
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}

		}).start();
		return consumer;
	}

}

