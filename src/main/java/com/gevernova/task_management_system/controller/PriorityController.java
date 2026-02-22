package com.gevernova.task_management_system.controller;


import com.gevernova.task_management_system.model.Priority;
import com.gevernova.task_management_system.service.PriorityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/priorities")
@RequiredArgsConstructor
public class PriorityController {

    private final PriorityService priorityService;

    @PostMapping
    public ResponseEntity<Priority> create(@RequestBody Priority priority) {
        return ResponseEntity.status(HttpStatus.CREATED).body(priorityService.create(priority));
    }

    @GetMapping
    public List<Priority> getAll() { return priorityService.getAll(); }

    @GetMapping("/{id}")
    public Priority getById(@PathVariable Long id) { return priorityService.getById(id); }

    @PutMapping("/{id}")
    public Priority update(@PathVariable Long id, @RequestBody Priority priority) {
        return priorityService.update(id, priority);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        priorityService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

