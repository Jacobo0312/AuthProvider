package com.icesi.auth_provider.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name="users")
public class UserModel {
    @Id @Column(name="id", nullable = false)
    private Long id;
    @Column(name="email", nullable = false)
    private String email;

    @Column(name="password", nullable = false)
    private String password;


}
