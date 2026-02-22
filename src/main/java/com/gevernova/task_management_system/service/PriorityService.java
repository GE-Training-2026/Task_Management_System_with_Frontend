package com.gevernova.task_management_system.service;


import com.gevernova.task_management_system.exception.PriorityNotFoundException;
import com.gevernova.task_management_system.model.Priority;
import com.gevernova.task_management_system.repository.PriorityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PriorityService {

    private final PriorityRepository priorityRepo;

    public Priority create(Priority priority) { return priorityRepo.save(priority); }
    public List<Priority> getAll() { return priorityRepo.findAll(); }
    public Priority getById(Long id) {
        return priorityRepo.findById(id)
                .orElseThrow(() -> new PriorityNotFoundException(id));
    }
    public Priority update(Long id, Priority priority) {
        Priority existing = getById(id);
        existing.setLevel(priority.getLevel());
        return priorityRepo.save(existing);
    }
    public void delete(Long id) { priorityRepo.delete(getById(id)); }
}
