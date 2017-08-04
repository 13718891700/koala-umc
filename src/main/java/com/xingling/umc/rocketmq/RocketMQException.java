package com.xingling.umc.rocketmq;

/**
 * <p>Title:	  koala-umc <br/> </p>
 * <p>Description TODO <br/> </p>
 * <p>Company:    http://www.hnxianyi.com  <br/> </p>
 *
 * @Author <a href="190332447@qq.com"/>杨文生</a>  <br/>
 * @Date 2017/8/4 12:51
 */
public class RocketMQException extends Exception{
	public RocketMQException() {
		super();
	}

	public RocketMQException(String message) {
		super(message);
	}

	public RocketMQException(String message, Throwable cause) {
		super(message, cause);
	}

	public RocketMQException(Throwable cause) {
		super(cause);
	}

	protected RocketMQException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}
}