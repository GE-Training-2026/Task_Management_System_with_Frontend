package com.gevernova.task_management_system.repository;

import com.gevernova.task_management_system.model.Priority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriorityRepository extends JpaRepository<Priority, Long> {}