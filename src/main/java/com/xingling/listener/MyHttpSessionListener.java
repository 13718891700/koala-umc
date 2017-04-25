package com.xingling.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContext;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * <p>Title:	  MyHttpSessionListener. </p>
 * <p>Description session监听 </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="190332447@qq.com"/>杨文生</a>
 * @CreateDate     2017/4/19 14:37
 */
@WebListener
public class MyHttpSessionListener implements HttpSessionListener,HttpSessionAttributeListener {

	private static Logger logger = LoggerFactory.getLogger(MyHttpSessionListener.class);
	
	/**
	 * 新建一个会话时候触发也可以说是客户端第一次和服务器交互时候触发
	 */
	@Override
	public void sessionCreated(HttpSessionEvent event) {
		logger.info("session创建,最大过期时间为："+ event.getSession().getMaxInactiveInterval()+"秒");
		ServletContext context=event.getSession().getServletContext();
        Integer count=(Integer)context.getAttribute("count");   
        if(count==null){   
            count=new Integer(1);   
        }else{   
            int co = count.intValue();   
            count= new Integer(co+1);   
        }   
        logger.info("【当前用户人数："+count+"】");   
        context.setAttribute("count", count);//保存人数 
	}
	/**
	 * 销毁会话的时候  一般来说只有某个按钮触发进行销毁 或者配置定时销毁 
	 */
	@Override
	public void sessionDestroyed(HttpSessionEvent event) {
		logger.info("session销毁");
		ServletContext context=event.getSession().getServletContext();
        Integer count=(Integer)context.getAttribute("count"); 
        if(null != count){
        	int co=count.intValue();   
        	count=new Integer(co-1);   
        	context.setAttribute("count", count);   
        	logger.info("【当前用户人数："+count+"】");  
        }
	}

	/**
	 * 在session中添加对象时触发此操作 笼统的说就是调用setAttribute这个方法时候会触发的
	 */
	@Override
	public void attributeAdded(HttpSessionBindingEvent arg0) {
		
	}

	/**
	 * 修改、删除session中添加对象时触发此操作  笼统的说就是调用 removeAttribute这个方法时候会触发的
	 */
	@Override
	public void attributeRemoved(HttpSessionBindingEvent arg0) {
		
	}

	/**
	 * 在Session属性被重新设置时
	 */
	@Override
	public void attributeReplaced(HttpSessionBindingEvent arg0) {
		
	}

}
