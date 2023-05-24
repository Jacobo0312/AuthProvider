package com.icesi.auth_provider.controllers;


import com.icesi.auth_provider.dao.UserDao;
import com.icesi.auth_provider.models.ChangePasswordRequest;
import com.icesi.auth_provider.models.UserModel;
import com.icesi.auth_provider.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private JWTUtil jwtUtil;

    private boolean validateToken(String token) {
        token=getToken(token);
        String userID = jwtUtil.getKey(token);
        return userID != null;
    }

    private String getToken(String token) {
        return token.split(" ")[1];
    }


    @RequestMapping(method = RequestMethod.GET, value = "/users/{username}")
    public UserModel getUser(@RequestHeader(value = "Authorization") String token, @PathVariable String username) {
        String value=jwtUtil.getValue(getToken(token));

        if (!validateToken(token)) {
            throw new RuntimeException("Invalid token. Please log in again.");
        }

        if (!(value.equals("admin") || value.equals(username))) {
            throw new RuntimeException("Invalid token. Please log in again.");
        }

        UserModel user = userDao.getUser(username);
        return user;
    }


    @RequestMapping(method = RequestMethod.GET, value = "/users")
    public List<UserModel> getUsers(@RequestHeader(value = "Authorization") String token) {
        if (!validateToken(token)) {
            throw new RuntimeException("Invalid token. Please log in again.");
        }

        String value=jwtUtil.getValue(getToken(token));

        if (!value.equals("admin")) {
            throw new RuntimeException("Invalid token. Please log in again.");
        }

        return userDao.getUsers();
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/users/{username}")
    public void deleteUser(@RequestHeader(value = "Authorization") String token, @PathVariable String username) {
        if (!validateToken(token)) {
            throw new RuntimeException("Invalid token. Please log in again.");
        }

        String value = jwtUtil.getValue(getToken(token));

        if (!(value.equals("admin") || value.equals(username))) {
            throw new RuntimeException("Invalid token. Please log in again.");
        }

        userDao.deleteUser(username);
    }


    @RequestMapping(method = RequestMethod.POST, value = "/login")
    public String login(@RequestBody UserModel user) {
        try {
            UserModel loggedUser = userDao.login(user);
            if (loggedUser != null) {
                String token = jwtUtil.create(loggedUser.getUsername());
                return token;
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(method = RequestMethod.POST, value = "/signup")
    public String signUp(@RequestBody UserModel user) {
        UserModel loggedUser = userDao.signUp(user);
        String token = jwtUtil.create(loggedUser.getUsername());
        return token;
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/changePassword/{username}")
    public UserModel changePassword(@RequestHeader(value = "Authorization") String token, @RequestBody ChangePasswordRequest request, @PathVariable String username) {        if (!validateToken(token)) {
            throw new RuntimeException("Invalid token. Please log in again.");
        }

        String value = jwtUtil.getValue(getToken(token));

        if (!value.equals(username)) {
            throw new RuntimeException("Invalid token. Please log in again.");
        }

        UserModel user = userDao.getUser(username);




        return userDao.changePassword(user,request.getPassword(), request.getNewPassword());
    }


}


