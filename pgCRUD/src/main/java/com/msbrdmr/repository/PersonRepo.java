package com.msbrdmr.repository;

import com.msbrdmr.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;


@RepositoryRestResource
public interface PersonRepo extends JpaRepository<Person, Integer> {
    //Repo is intermediary between the database and the code
    //Person is the entity and Integer is the type of the primary key
    //this repositoru allows me to access the data in the database, create, read, update, delete operations
    //this repository will translate the code to SQL queries and execute them on the database

    List<Person> findByBirthdate(String birthdate);
}
