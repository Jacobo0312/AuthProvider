

package com.icesi.auth_provider.dao;

import com.icesi.auth_provider.models.UserModel;
import com.google.common.hash.Hashing;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.PersistenceContext;
import javax.persistence.EntityManager;
import java.nio.charset.StandardCharsets;
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
    public UserModel getUser(Long id) {
        return entityManager.find(UserModel.class, id);
    }

    @Override
    public void deleteUser(Long id) {
        UserModel user = entityManager.find(UserModel.class, id);
        entityManager.remove(user);
    }


    @Override
    public UserModel changePassword(UserModel user) {
        String hash = Hashing.sha256()
                .hashString(user.getPassword(), StandardCharsets.UTF_8)
                .toString();

        String query = "FROM UserModel WHERE username = :username";

        List<UserModel> users = entityManager.createQuery(query)
                .setParameter("username", user.getPassword())
                .getResultList();

        if (!users.isEmpty()) {
             user = users.get(0);
            user.setPassword(hash);
            entityManager.persist(user);
            return user;
        }

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

        String hash = Hashing.sha256()
                .hashString(user.getPassword(), StandardCharsets.UTF_8)
                .toString();

        user.setPassword(hash);
        user.setLastLogin(new java.util.Date());

        entityManager.persist(user);
        return user;
    }



    @Override
    public UserModel login(UserModel user) {
        String hash = Hashing.sha256()
                .hashString(user.getPassword(), StandardCharsets.UTF_8)
                .toString();

        String query = "FROM UserModel WHERE username = :username AND password = :password";

        List<UserModel> users = entityManager.createQuery(query)
                .setParameter("username", user.getUsername())
                .setParameter("password", hash)
                .getResultList();
        
        user = !users.isEmpty() ? users.get(0) : null;

        if (user != null) {
            user.setLastLogin(new java.util.Date());
            entityManager.persist(user);
        }

        return user;
    }


}
