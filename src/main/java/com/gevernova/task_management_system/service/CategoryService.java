package com.gevernova.task_management_system.service;

import com.gevernova.task_management_system.exception.CategoryNotFoundException;
import com.gevernova.task_management_system.model.Category;
import com.gevernova.task_management_system.repository.CategoryRepository;
import lombok.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepo;

    public Category create(Category category) { return categoryRepo.save(category); }
    public List<Category> getAll() { return categoryRepo.findAll(); }
    public Category getById(Long id) {
        return categoryRepo.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }
    public Category update(Long id, Category category) {
        Category existing = getById(id);
        existing.setName(category.getName());
        return categoryRepo.save(existing);
    }
    public void delete(Long id) { categoryRepo.delete(getById(id)); }
}
