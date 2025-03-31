package com.csiit.seatease.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csiit.seatease.dto.AuthenticationRequest;
import com.csiit.seatease.entity.Admin;
import com.csiit.seatease.service.AdminService;
import com.csiit.seatease.service.JwtService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;
	
	@Autowired
	private AuthenticationManager authenticationManager;


    @Autowired
    private JwtService jwtService;

	/*
	 * @PostMapping("/saveAdmin") public Admin saveAdmin(@RequestBody Admin admin) {
	 * System.out.println("Called..............."); return
	 * adminService.saveAdmin(admin); }
	 */
	
	@PostMapping("/authenticate")
	public String authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
		System.out.println("authenticate......");
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        if (authentication.isAuthenticated()) {
        	String token = jwtService.generateToken(authenticationRequest.getUsername());
        	System.out.println(token);
        	return token;
        	//return jwtService.generateToken(authenticationRequest.getUserName());
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }

	}

	@PostMapping("/new")
	public String addNewAdmin(@RequestBody Admin admin) {
		return adminService.addNewAdmin(admin);
	}

	
}
