package com.gevernova.task_management_system.dto;

import lombok.Data;

@Data
public class TaskRequest {
    private String title;
    private String description;
    private Long userId;
    private Long categoryId;
    private Long priorityId;
}