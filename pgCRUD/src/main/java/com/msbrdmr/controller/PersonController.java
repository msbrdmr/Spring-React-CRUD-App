package com.msbrdmr.controller;


import com.google.gson.Gson;
import com.msbrdmr.model.Person;
import com.msbrdmr.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/person")
@CrossOrigin(origins = "https://spring-react-crud-app-1.onrender.com", maxAge = 3600, allowedHeaders = "*", allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, exposedHeaders = {"Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"})
public class PersonController {

    @Autowired
    private PersonService personService;

    @GetMapping("/{id}")
    public String getPerson(@PathVariable int id) {
        Gson gson = new Gson();
        return gson.toJson(personService.getPerson(id));
    }

    @PostMapping("/add")
    public String addPerson(@RequestBody Person personRequest) {
        personService.addPerson(personRequest);
        return "Person added successfully";
    }

    @GetMapping("/get")
    public String getAllPersons() {
        Gson gson = new Gson();
        return gson.toJson(personService.getAllPersons());
    }

    @PutMapping("/update/{id}")
    public String updatePerson(@RequestBody Person person, @PathVariable String id) {

        System.out.println("incoming person: " + person+ " id: " + id);
        Person personRequest = personService.getPerson(Integer.parseInt(id));
        personRequest.setName(person.getName());
        personRequest.setBirthdate(person.getBirthdate());
        personService.setPerson(personRequest);
        return "Person updated successfully";
    }

    @DeleteMapping("/delete/{id}")
    public String deletePerson(@PathVariable int id) {
        personService.deletePerson(id);
        return "Person deleted successfully";
    }

}
