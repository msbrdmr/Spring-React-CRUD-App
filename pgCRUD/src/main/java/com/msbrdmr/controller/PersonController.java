package com.msbrdmr.controller;
import com.msbrdmr.model.Person;
import com.msbrdmr.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/persons")
@CrossOrigin(origins = "https://spring-react-crud-app-1.onrender.com")
public class PersonController {
    @Autowired
    private PersonService personService;

    @GetMapping("/{id}")
    public Person getPerson(@PathVariable int id) {
        return personService.getPerson(id);
    }

    @PostMapping("/add")
    public String addPerson(@RequestBody Person personRequest) {
        personService.addPerson(personRequest);
        return "Person added successfully";
    }

    @GetMapping("/getAll")
    public List<Person> getAllPersons() {
        return personService.getAllPersons();
    }

    @PutMapping("/update/{id}")
    public String updatePerson(@RequestBody Person person, @PathVariable int id) {
        person.setId(id);
        personService.updatePerson(person);
        return "Person updated successfully";
    }

    @DeleteMapping("/delete/{id}")
    public String deletePerson(@PathVariable int id) {
        personService.deletePerson(id);
        return "Person deleted successfully";
    }
}
