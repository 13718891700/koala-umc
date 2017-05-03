<div id="sidebar" class="sidebar responsive ace-save-state sidebar-fixed">
  <script type="text/javascript">
    try {
      ace.settings.loadState('sidebar')
    } catch (e) {
    }
  </script>
  <div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
    <i id="sidebar-toggle-icon" class="ace-icon fa fa-align-justify ace-save-state"
       data-icon1="ace-icon fa fa-align-justify" data-icon2="ace-icon fa fa-indent"></i>
  </div>
  <ul class="nav nav-list">
  <#list MENU_TREE as x>
    <li class="active open">
      <a href="#" class="dropdown-toggle">
        <i class="menu-icon fa ${(x.icon)!}"></i>
        <span class="menu-text"> ${(x.menuName)!} </span>
          <#if x.subMenu?? && (x.subMenu?size > 0)>
            <b class="arrow fa fa-angle-down"></b>
          <#else>
            <b class="arrow"></b>
          </#if>
      </a>
        <#if x.subMenu?exists>
          <ul class="submenu">
              <#list x.subMenu as sndM>
                <li class="">
                    <#if sndM.subMenu?? && (sndM.subMenu?size > 0)>
                      <a href="#" class="dropdown-toggle">
                        <i class="menu-icon fa fa-caret-right"></i>
                        <span class="menu-text"> ${(sndM.menuName)!} </span>
                        <b class="arrow fa fa-angle-down"></b>
                      </a>
                    <#else>
                      <a data-url="${sndM.url}" href="#${sndM.url}">
                        <i class="menu-icon fa fa-caret-right"></i>
                        <span class="menu-text">${(sndM.menuName)!}</span>
                        <b class="arrow"></b>
                      </a>
                    </#if>
                    <#if sndM.subMenu?? && (sndM.subMenu?size > 0)>
                      <ul class="submenu">
                          <#list sndM.subMenu as snd3M>
                            <li class="">
                              <a data-url="${snd3M.url}" href="#${snd3M.url}">
                                <i class="menu-icon fa fa-caret-right"></i>
                                <span class="menu-text"> ${(snd3M.menuName)!} </span>
                              </a>
                              <b class="arrow"></b>
                            </li>
                          </#list>
                      </ul>
                    </#if>
                </li>
              </#list>
          </ul>
        </#if>
    </li>
  </#list>
  </ul><!-- /.nav-list -->

</div>