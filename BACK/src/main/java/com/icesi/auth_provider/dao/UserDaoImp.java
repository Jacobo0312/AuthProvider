

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
    public UserModel saveUser(UserModel user) {

        //Hash password
        String hash = Hashing.sha256()
                .hashString(user.getPassword(), StandardCharsets.UTF_8)
                .toString();

        user.setPassword(hash);

        entityManager.persist(user);
        return user;
    }

    @Override
    public UserModel updateUser(UserModel user) {
        entityManager.merge(user);
        return user;
    }

    @Override
    public UserModel verifyCredentials(UserModel user) {
        String hash = Hashing.sha256()
                .hashString(user.getPassword(), StandardCharsets.UTF_8)
                .toString();
        user.setPassword(hash);


        String query = "FROM UserModel WHERE email = :email AND password = :password";

        List<UserModel> users = entityManager.createQuery(query)
                .setParameter("email", user.getEmail())
                .setParameter("password", user.getPassword())
                .getResultList();

        return !users.isEmpty() ? users.get(0) : null;
    }


}
