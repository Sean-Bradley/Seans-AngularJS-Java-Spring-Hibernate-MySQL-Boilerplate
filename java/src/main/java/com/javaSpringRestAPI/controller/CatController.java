package com.javaSpringRestAPI.controller;

import com.javaSpringRestAPI.exception.ResourceNotFoundException;
import com.javaSpringRestAPI.model.Cat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import com.javaSpringRestAPI.repository.CatRepository;
import javax.transaction.Transactional;

/**
 *
 * @author Sean Bradley
 */
@RestController
@RequestMapping("/")
public class CatController {

    @Autowired
    CatRepository catRepository;

    @GetMapping("/cats")
    public List<Cat> getAllCats() {
        List<Cat> cats = catRepository.findAll();
        //for (Cat c : cats) {
        //    System.out.println(c.getName());
        //}
        return cats;
    }

    @Transactional
    @PostMapping("/cats")
    public Cat createCat(@Valid @RequestBody Cat cat) {
        //System.out.println("adding " + cat.getName());
        return catRepository.save(cat);
    }

    @GetMapping("/cats/{id}")
    public Cat getCatById(@PathVariable(value = "id") Long catId) {
        return catRepository.findById(catId)
                .orElseThrow(() -> new ResourceNotFoundException("Cat", "id", catId));
    }

    @Transactional
    @PutMapping("/cats/{id}")
    public Cat updateCat(@PathVariable(value = "id") Long catId, @Valid @RequestBody Cat updatedCat) {

        Cat cat = catRepository.findById(catId)
                .orElseThrow(() -> new ResourceNotFoundException("Cat", "id", catId));

        cat.setName(updatedCat.getName());

        cat = catRepository.save(cat);
        return cat;
    }

    @Transactional
    @DeleteMapping("/cats/{id}")
    public ResponseEntity<?> deleteCat(@PathVariable(value = "id") Long catId) {
        Cat cat = catRepository.findById(catId)
                .orElseThrow(() -> new ResourceNotFoundException("Cat", "id", catId));

        //System.out.println("deleting " + cat.getName());
        catRepository.delete(cat);

        return ResponseEntity.ok().build();
    }
}
