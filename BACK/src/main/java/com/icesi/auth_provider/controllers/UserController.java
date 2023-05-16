package com.icesi.auth_provider.controllers;


import com.icesi.auth_provider.dao.UserDao;
import com.icesi.auth_provider.models.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserDao userDao;

    @RequestMapping(method = RequestMethod.GET, value = "/users/{id}")
    public UserModel getUser(@PathVariable Long id) {
        UserModel user = userDao.getUser(id);
        return user;
    }


    @RequestMapping(method = RequestMethod.GET, value = "/users")
    public List<UserModel> getUsers() {
        return userDao.getUsers();
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userDao.deleteUser(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/login")
    public UserModel login(@RequestBody UserModel user) {
        return userDao.login(user);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/signup")
    public UserModel signUp(@RequestBody UserModel user) {
        return userDao.signUp(user);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/changePassword")
    public UserModel changePassword(@RequestBody UserModel user) {
        return userDao.changePassword(user);
    }




}


