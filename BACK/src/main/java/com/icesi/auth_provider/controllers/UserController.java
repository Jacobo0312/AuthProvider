package com.icesi.auth_provider.controllers;

import com.icesi.auth_provider.dao.UserDao;
import com.icesi.auth_provider.models.ChangePasswordRequest;
import com.icesi.auth_provider.models.UserModel;
import com.icesi.auth_provider.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserDao userDao;
    private final JWTUtil jwtUtil;

    @Autowired
    public UserController(UserDao userDao, JWTUtil jwtUtil) {
        this.userDao = userDao;
        this.jwtUtil = jwtUtil;
    }

    private boolean validateToken(String token) {
        String userID = jwtUtil.getKey(getToken(token));
        return userID != null;
    }

    private String getToken(String token) {
        return token.split(" ")[1];
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserModel> getUser(@RequestHeader("Authorization") String token, @PathVariable String username) {
        if (!validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String value = jwtUtil.getValue(getToken(token));

        if (!(value.equals("admin") || value.equals(username))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        UserModel user = userDao.getUser(username);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<UserModel>> getUsers(@RequestHeader("Authorization") String token) {
        if (!validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String value = jwtUtil.getValue(getToken(token));

        if (!value.equals("admin")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<UserModel> users = userDao.getUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<Void> deleteUser(@RequestHeader("Authorization") String token, @PathVariable String username) {
        if (!validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String value = jwtUtil.getValue(getToken(token));

        if (!(value.equals("admin") || value.equals(username))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        userDao.deleteUser(username);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserModel user) {
        UserModel loggedUser = userDao.login(user);

        if (loggedUser != null) {
            String token = jwtUtil.create(loggedUser.getUsername());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody UserModel user) {
        UserModel loggedUser = userDao.signUp(user);
        String token = jwtUtil.create(loggedUser.getUsername());
        return ResponseEntity.ok(token);
    }

    @PutMapping("/changePassword/{username}")
    public ResponseEntity<UserModel> changePassword(@RequestHeader("Authorization") String token, @RequestBody ChangePasswordRequest request, @PathVariable String username) {
        if (!validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String value = jwtUtil.getValue(getToken(token));

        if (!value.equals(username)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        UserModel user = userDao.getUser(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        UserModel updatedUser = userDao.changePassword(user, request.getPassword(), request.getNewPassword());
        return ResponseEntity.ok(updatedUser);
    }
}
