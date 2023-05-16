package com.icesi.auth_provider.dao;

import com.icesi.auth_provider.models.UserModel;

import java.util.List;

public interface UserDao {

    List<UserModel> getUsers();
    UserModel getUser(Long id);
    void deleteUser(Long id);
    UserModel saveUser(UserModel user);
    UserModel updateUser(UserModel user);
    UserModel verifyCredentials(UserModel user);

}
