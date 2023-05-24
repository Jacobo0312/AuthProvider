package com.icesi.auth_provider.models;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name="users")
public class UserModel {
    @Id
    @Column(name = "username", nullable = false, updatable = false)
    private String username;

    @Column(name="password", nullable = false)
    private String password;

    @Column(name="lastLogin", nullable = false)
    private Date lastLogin;


}
