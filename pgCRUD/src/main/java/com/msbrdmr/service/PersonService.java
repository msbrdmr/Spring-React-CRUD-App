package com.msbrdmr.service;


import com.msbrdmr.model.Person;
import com.msbrdmr.repository.PersonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    //this class will communicate with the repository layer
    //this class will have the business logic
    //this class will have the methods that will be called by the controller

    @Autowired
    private PersonRepo personRepo;

    public void addPerson(Person person) {
        personRepo.save(person);
    }

    public Person getPerson(int id) {

        return personRepo.findById(id).orElse(null);
    }
    public List<Person> getAllPersons() {
        return personRepo.findAll();
    }

    public void deletePerson(int id) {
        personRepo.deleteById(id);
    }

    public void setPerson(Person person) {
        personRepo.save(person);
    }

    public void updatePerson(Person person) {
        personRepo.save(person);
    }
}
