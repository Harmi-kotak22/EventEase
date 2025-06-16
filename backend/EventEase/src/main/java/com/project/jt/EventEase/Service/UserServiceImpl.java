package com.project.jt.EventEase.Service;

import com.project.jt.EventEase.Dao.UserDao;
import com.project.jt.EventEase.Entity.Role;
import com.project.jt.EventEase.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    //  @Autowired
    private UserDao userDao;


    //  @Autowired
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserDao userDao, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public User saveUser(User user) {
        if (!user.getPassword().startsWith("$2a$")) {  // Check if it's already encoded
            System.out.println("📝 Encoding password...");
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        } else {
            System.out.println("⚠️ Password already encoded, skipping encoding.");
        }

        System.out.println("🔑 Final stored password: " + user.getPassword());
        return userDao.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userDao.findById(id);
    }

    @Override
    public User updateUser(Long id, User updatedUser) {
        return userDao.findById(id).map(user -> {
            if (updatedUser.getUsername() != null) {
                user.setUsername(updatedUser.getUsername());
            }
            if (updatedUser.getEmail() != null) {
                user.setEmail(updatedUser.getEmail());
            }
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
                user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }
            if (updatedUser.getRole() != null) {
                user.setRole(updatedUser.getRole());
            }
            return userDao.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }
    public Optional<User> getUserByUsername(String username) {
        return userDao.findByUsername(username);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userDao.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userDao.deleteById(id);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userDao.findByUsername(username);
    }
    @Override
    public Optional<User> findByEmail(String email) {
        return userDao.findByEmail(email);
    }

}
