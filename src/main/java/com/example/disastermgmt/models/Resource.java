package com.example.disastermgmt.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "resources")
@Data
@NoArgsConstructor
public class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // Water, Medicine, Food, Blankets

    private Integer quantity;

    private String unit; // Liters, Boxes, Kg, Pieces

    private String location; // Warehouse A, Base Camp B

    private String category; // Medical, Supplies, Food

    public Resource(String name, Integer quantity, String unit, String location, String category) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.location = location;
        this.category = category;
    }
}
