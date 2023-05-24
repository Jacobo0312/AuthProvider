package com.icesi.auth_provider.dao;

import com.icesi.auth_provider.models.UserModel;

import java.util.List;

public interface UserDao {

    List<UserModel> getUsers();
    UserModel getUser(String username);
    void deleteUser(String username);
    UserModel signUp(UserModel user);
    UserModel changePassword(UserModel user,String password, String newPassword);

    UserModel login(UserModel user);
}
