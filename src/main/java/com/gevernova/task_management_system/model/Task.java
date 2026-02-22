package com.gevernova.task_management_system.model;


import jakarta.persistence.Enumerated;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@Setter
@Getter
@AllArgsConstructor public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    private User user;

    @ManyToOne
    private Category category;

    @ManyToOne
    private Priority priority;

    public enum Status { PENDING, IN_PROGRESS, DONE }

}