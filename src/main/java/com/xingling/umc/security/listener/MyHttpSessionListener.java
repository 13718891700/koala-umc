package com.xingling.umc.security.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * <p>Title:	  MyHttpSessionListener. </p>
 * <p>Description 自定义Session监听器 </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="190332447@qq.com"/>杨文生</a>
 * @CreateDate     2017/5/14 12:52
 */
@WebListener
public class MyHttpSessionListener implements HttpSessionListener {

    private static final Logger logger = LoggerFactory.getLogger(MyHttpSessionListener.class);

    @Override
    public void sessionCreated(HttpSessionEvent se) {
        HttpSession session = se.getSession();
        logger.info("Session 创建...");
        logger.info("sessionId = {}", session.getId() );
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        logger.info("Session 失效...");

    }
}
