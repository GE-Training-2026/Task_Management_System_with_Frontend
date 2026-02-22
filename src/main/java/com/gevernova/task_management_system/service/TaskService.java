package com.gevernova.task_management_system.service;

import com.gevernova.task_management_system.dto.*;
import com.gevernova.task_management_system.exception.CategoryNotFoundException;
import com.gevernova.task_management_system.exception.PriorityNotFoundException;
import com.gevernova.task_management_system.exception.TaskNotFoundException;
import com.gevernova.task_management_system.exception.UserNotFoundException;
import com.gevernova.task_management_system.model.*;
import com.gevernova.task_management_system.repository.*;
import lombok.*;
import org.springframework.stereotype.*;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepo;
    private final UserRepository userRepo;
    private final CategoryRepository categoryRepo;
    private final PriorityRepository priorityRepo;

    public Task create(TaskRequest req) {
        User user = userRepo.findById(req.getUserId())
                .orElseThrow(() -> new UserNotFoundException(req.getUserId()));
        Category category = categoryRepo.findById(req.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException(req.getCategoryId()));
        Priority priority = priorityRepo.findById(req.getPriorityId())
                .orElseThrow(() -> new PriorityNotFoundException(req.getPriorityId()));

        Task task = new Task(null, req.getTitle(), req.getDescription(),
                Task.Status.PENDING, user, category, priority);
        return taskRepo.save(task);
    }

    public List<Task> getAll() { return taskRepo.findAll(); }

    public Task getById(Long id) {
        return taskRepo.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    public Task update(Long id, TaskRequest req) {
        Task task = getById(id);
        task.setTitle(req.getTitle());
        task.setDescription(req.getDescription());
        return taskRepo.save(task);
    }

    public Task updateStatus(Long id, Task.Status status) {
        Task task = getById(id);
        task.setStatus(status);
        return taskRepo.save(task);
    }

    public void delete(Long id) { taskRepo.delete(getById(id)); }
}
