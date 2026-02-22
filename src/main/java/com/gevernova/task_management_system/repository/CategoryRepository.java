package com.gevernova.task_management_system.repository;

import com.gevernova.task_management_system.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {}