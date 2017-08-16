package com.xingling.umc.security.core;

import com.xingling.umc.model.domain.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class SecurityUser extends User implements UserDetails
{

    private static final long serialVersionUID = 1L;

    public SecurityUser(User user) {
        if(user != null)
        {
            this.setId(user.getId());
            this.setUserName(user.getUserName());
            this.setPassword(user.getPassword());
            this.setSalt(user.getSalt());
	        //this.setRoles(user.getRoles());
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        /*Set<SimpleGrantedAuthority> authorities = new HashSet<>();
	    List<Role> roles = this.getRoles();
	    for (Role role : roles) {
		    SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.getRoleName());
		    authorities.add(authority);
	    }*/
	    return null;
    }

	@Override
	public String getPassword() {
		return super.getPassword();
	}

	@Override
	public String getUsername() {
		return super.getUserName();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
