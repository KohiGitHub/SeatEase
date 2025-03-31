package com.csiit.seatease.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csiit.seatease.dto.AuthenticationRequest;
import com.csiit.seatease.dto.AuthenticationResponse;
import com.csiit.seatease.dto.PasswordChangeRequest;
import com.csiit.seatease.entity.Admin;
import com.csiit.seatease.entity.Exam;
import com.csiit.seatease.entity.Seat;
import com.csiit.seatease.entity.Student;
import com.csiit.seatease.service.JwtService;
import com.csiit.seatease.service.StudentService;
import com.csiit.seatease.service.StudentUserDetails;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/student")
public class StudentController {

	@Autowired
	private StudentService studentService;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("/saveExam")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Exam saveExam(@RequestBody Exam exam) {
		System.out.println("SAVE EXAM");
		return studentService.saveExam(exam);
	}

	@PostMapping("/saveStudent/{examId}")
	public Student saveStudent(@PathVariable("examId") long examId, @RequestBody Student student) {
		return studentService.saveStudent(examId, student);
	}

	@GetMapping("/listExam")
	public List<Exam> listExam() {
		return studentService.listExam();
	}

	@GetMapping("listStudents/{examId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public List<Student> getStudentByExamId(@PathVariable("examId") long examId) {
		return studentService.getStudentByExamId(examId);
	}

	@GetMapping("/getExamById/{examId}")
	public Exam getExamById(@PathVariable("examId") long examId) {
		return studentService.getExamById(examId);
	}

	@PutMapping("/updateExam/{examId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Exam updateExam(@PathVariable("examId") long examId, @RequestBody Exam exam) {
		return studentService.updateExam(examId, exam);
	}

	@GetMapping("/getStudentById/{studentId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Student getStudentById(@PathVariable("studentId") long studentId) {
		Student s = studentService.getStudentById(studentId);
			return s;
	}

	@PutMapping("/updateStudent/{studentId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Student updateStudent(@PathVariable("studentId") long studentId, @RequestBody Student student) {
		return studentService.updateStudent(studentId, student);
	}

	@DeleteMapping("/deleteExam/{examId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public void deleteExam(@PathVariable("examId") long examId) {
		studentService.deleteExam(examId);
	}

	@DeleteMapping("/deleteStudent/{studentId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public void deleteStudent(@PathVariable("studentId") long studentId) {
		studentService.deleteStudent(studentId);
	}

	@GetMapping("/generateSeat/{examId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Seat generateSeat(@PathVariable("examId") long examId) {
		return studentService.generateSeat(examId);
	}

	@PostMapping("/authenticate")
	public AuthenticationResponse authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				authenticationRequest.getUsername(), authenticationRequest.getPassword()));
		if (authentication.isAuthenticated()) {
			StudentUserDetails stUD = (StudentUserDetails) authentication.getPrincipal();
			Student student = stUD.getStudent();
			String token = jwtService.generateToken(authenticationRequest.getUsername());
			AuthenticationResponse authenticationResponse = new AuthenticationResponse(token, student);
			return authenticationResponse;
		} else {
			throw new UsernameNotFoundException("invalid user request !");
		}

	}

	@PostMapping("/changePassword")
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public String changePassword(@RequestBody PasswordChangeRequest passwordChangeRequest) {
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				passwordChangeRequest.getUsername(), passwordChangeRequest.getPassword()));
		if(authentication.isAuthenticated()) {
		studentService.changePassword(passwordChangeRequest.getUsername(), passwordChangeRequest.getNewPassword());
		return "Password Changed Successfully. Login with the new password.";
		}else {
			throw new UsernameNotFoundException("invalid user request !");
		}
		
	}
	
	@GetMapping("/showLayout/{seatId}/{roomId}/{seatName}")
	@PreAuthorize("hasAuthority('ROLE_USER')")
    public void showLayout(@PathVariable("seatId") long seatId,@PathVariable("roomId") long roomId,@PathVariable("seatName") String seatName) {
		System.out.println(":::::: "+seatId +" : "+roomId+" : "+seatName);
		studentService.showLayout(seatId,roomId,seatName);
	}
			

}
