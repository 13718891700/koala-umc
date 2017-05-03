package com.xingling.umc.security.session;

import org.apache.shiro.session.mgt.SimpleSession;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Date;

/**
 * <p>Title:	  Session. </p>
 * <p>Description TODO </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="190332447@qq.com"/>杨文生</a>
 * @CreateDate     2017/1/7 11:55
 */
public class Session extends SimpleSession {

    private static final long serialVersionUID = -7125642695178165650L;
    
    static int bitIndexCounter = 0;
    
    private static final int USER_AGENT_BIT_MASK = 1 << bitIndexCounter++;
    
    private static final int STATUS_BIT_MASK = 1 << bitIndexCounter++;

    private  Date stopTimestamp;

    @Override
    public Date getStopTimestamp() {
        return stopTimestamp;
    }

    @Override
    public void setStopTimestamp(Date stopTimestamp) {
        this.stopTimestamp = stopTimestamp;
    }

    public static enum OnlineStatus {
        on_line("在线"), hidden("隐身"), force_logout("强制退出");
        private final String info;

        private OnlineStatus(String info) {
            this.info = info;
        }

        public String getInfo() {
            return info;
        }
    }

    /**
     * 用户浏览器类型
     */
    private String userAgent;

    /**
     * 在线状态
     */
    private OnlineStatus status = OnlineStatus.on_line;

    /**
     * 用户登录时系统IP
     */
    private String systemHost;

    public Session() {
        super();
    }

    public Session(String host) {
        super(host);
    }


    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public OnlineStatus getStatus() {
        return status;
    }

    public void setStatus(OnlineStatus status) {
        this.status = status;
    }

    public String getSystemHost() {
        return systemHost;
    }

    public void setSystemHost(String systemHost) {
        this.systemHost = systemHost;
    }

    /**
     * 属性是否改变 优化session数据同步
     */
    private transient boolean attributeChanged = false;

    public void markAttributeChanged() {
        this.attributeChanged = true;
    }

    public void resetAttributeChanged() {
        this.attributeChanged = false;
    }

    public boolean isAttributeChanged() {
        return attributeChanged;
    }

    @Override
    public void setAttribute(Object key, Object value) {
        super.setAttribute(key, value);
    }


    @Override
    public Object removeAttribute(Object key) {
        return super.removeAttribute(key);
    }


    private void writeObject(ObjectOutputStream out) throws IOException {
        out.defaultWriteObject();
        short alteredFieldsBitMask = getAlteredFieldsBitMask();
        out.writeShort(alteredFieldsBitMask);
        if (userAgent != null) {
            out.writeObject(userAgent);
        }
        if (status != null) {
            out.writeObject(status);
        }

    }

    private void readObject(ObjectInputStream in) throws IOException, ClassNotFoundException {
        in.defaultReadObject();
        short bitMask = in.readShort();

        if (isFieldPresent(bitMask, USER_AGENT_BIT_MASK)) {
            this.userAgent = (String) in.readObject();
        }
        if (isFieldPresent(bitMask, STATUS_BIT_MASK)) {
            this.status = (OnlineStatus) in.readObject();
        }
    }
    private short getAlteredFieldsBitMask() {
        int bitMask = 0;
        bitMask = userAgent != null ? bitMask | USER_AGENT_BIT_MASK : bitMask;
        bitMask = status != null ? bitMask | STATUS_BIT_MASK : bitMask;
        return (short) bitMask;
    }

    private static boolean isFieldPresent(short bitMask, int fieldBitMask) {
        return (bitMask & fieldBitMask) != 0;
    }
}
