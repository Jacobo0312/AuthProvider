

package com.icesi.auth_provider.dao;

import com.icesi.auth_provider.models.UserModel;
import com.icesi.auth_provider.utils.HashPBKDF2;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.PersistenceContext;
import javax.persistence.EntityManager;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;

@Repository
@Transactional
public class UserDaoImp implements UserDao {


    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<UserModel> getUsers() {
        String query = "FROM UserModel";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public UserModel getUser(String username) {
        return entityManager.find(UserModel.class, username);
    }

    @Override
    public void deleteUser(String username) {
        UserModel user = entityManager.find(UserModel.class, username);
        entityManager.remove(user);
    }


    @Override
    public UserModel changePassword(UserModel user,String password,String newPassword) {

        boolean validation = false;
         try {
              validation = HashPBKDF2.validatePassword(password, user.getPassword());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }

         if (!validation) {
             throw new RuntimeException("Invalid password");
         }


        String hash = null;
        try {
            hash = HashPBKDF2.generateStrongPasswordHash(newPassword);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }

        user.setPassword(hash);
        entityManager.merge(user);
        



        return null;

    }

    @Override
    public UserModel signUp(UserModel user) {
        UserModel existingUser = entityManager.createQuery("SELECT u FROM UserModel u WHERE u.username = :username", UserModel.class)
                .setParameter("username", user.getUsername())
                .getResultList()
                .stream()
                .findFirst()
                .orElse(null);

        if (existingUser != null) {
            throw new IllegalArgumentException("El nombre de usuario ya está en uso");
        }

        String hash = null;
        try {
            hash = HashPBKDF2.generateStrongPasswordHash(user.getPassword());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }

        user.setPassword(hash);
        user.setLastLogin(new java.util.Date());

        entityManager.persist(user);
        return user;
    }


    @Override
    public UserModel login(UserModel user) {

        String password = user.getPassword();

        String query = "FROM UserModel WHERE username = :username";

        List<UserModel> users = entityManager.createQuery(query)
                .setParameter("username", user.getUsername())
                .getResultList();

        boolean validation = false;

        user = !users.isEmpty() ? users.get(0) : null;

        if (user != null) {
            try {
                validation = HashPBKDF2.validatePassword(password, user.getPassword());
            } catch (NoSuchAlgorithmException e) {
                throw new RuntimeException(e);
            } catch (InvalidKeySpecException e) {
                throw new RuntimeException(e);
            }
            user.setLastLogin(new java.util.Date());
            entityManager.persist(user);
        }

        return validation ? user : null;
    }


}
