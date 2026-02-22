package com.gevernova.task_management_system.controller;

import com.gevernova.task_management_system.dto.TaskRequest;
import com.gevernova.task_management_system.model.Task;
import com.gevernova.task_management_system.service.*;
import lombok.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> create(@RequestBody TaskRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.create(req));
    }

    @GetMapping
    public List<Task> getAll() { return taskService.getAll(); }

    @GetMapping("/{id}")
    public Task getById(@PathVariable Long id) { return taskService.getById(id); }

    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @RequestBody TaskRequest req) {
        return taskService.update(id, req);
    }

    @PutMapping("/{id}/status")
    public Task updateStatus(@PathVariable Long id, @RequestParam Task.Status status) {
        return taskService.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
