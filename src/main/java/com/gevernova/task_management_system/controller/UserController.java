package com.gevernova.task_management_system.controller;


import com.gevernova.task_management_system.dto.UserRequest;
import com.gevernova.task_management_system.model.User;
import com.gevernova.task_management_system.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<User> create(@RequestBody UserRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(req));
    }

    @GetMapping
    public List<User> getAll() { return userService.getAllUsers(); }

    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) { return userService.getUser(id); }

    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody UserRequest req) {
        return userService.updateUser(id, req);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
