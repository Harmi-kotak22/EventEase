package com.project.jt.EventEase.Service;

import com.project.jt.EventEase.Entity.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    //Optional<User> getUserByUsername(Long id);
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    User updateUser(Long id, User user);
    void deleteUser(Long id);

    Optional<User> getUserByUsername(String username);


    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
}
