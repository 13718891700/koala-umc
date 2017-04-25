package com.xingling.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Created by wangsongtao on 16/3/2.
 */
@Configuration
@ConfigurationProperties(prefix = RestConfig.REST_PREFIX)
public class RestConfig {

    public final static String REST_PREFIX="restful";


    /**
     * 订单中心的URL地址
     */
    private String ofc;

    /**
     * 用户中心UAM地址
     */
    private String uam;
    
    /**
     * 资源中心View调用
     */
    private String rmc;

    /**
     * 客户中心
     */
    private String csc;
    
    /** 运输中心 */
    private String tfc;
    
    /** 仓储中心 */
    private String whc;

    /** 地址中心*/
    private String addr;

    /**
     * 对接平台
     */
    private String epc;

    /**
     * 结算中心
     */
    private String ac;

    public String getTfc() {
		return tfc;
	}

	public void setTfc(String tfc) {
		this.tfc = tfc;
	}

	public String getWhc() {
		return whc;
	}

	public void setWhc(String whc) {
		this.whc = whc;
	}

	public String getOfc() {
        return ofc;
    }

    public void setOfc(String ofc) {
        this.ofc = ofc;
    }

    public String getUam() {
        return uam;
    }

    public void setUam(String uam) {
        this.uam = uam;
    }

    public String getRmc() {
        return rmc;
    }

    public void setRmc(String rmc) {
        this.rmc = rmc;
    }

    public String getCsc() {
        return csc;
    }

    public void setCsc(String csc) {
        this.csc = csc;
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }

    public String getEpc() {
        return epc;
    }

    public void setEpc(String epc) {
        this.epc = epc;
    }

    public String getAc() {
        return ac;
    }

    public void setAc(String ac) {
        this.ac = ac;
    }
}
