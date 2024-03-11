package com.msbrdmr.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor(force = true)
@Data
@Entity
@Table(name = "person")
public class Person {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private int id;
    private String name;

    @Column(name = "birthday")
    private String birthdate;


    public Person(String name, String birthdate) {
        this.name = name;
        this.birthdate = birthdate;
    }

}