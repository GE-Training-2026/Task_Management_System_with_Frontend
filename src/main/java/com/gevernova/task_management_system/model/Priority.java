package com.gevernova.task_management_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Priority {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String level;

}