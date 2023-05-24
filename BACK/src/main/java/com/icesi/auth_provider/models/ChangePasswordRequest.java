package com.icesi.auth_provider.models;

import lombok.Data;

@Data
public class ChangePasswordRequest {
    private String password;
    private String newPassword;

}