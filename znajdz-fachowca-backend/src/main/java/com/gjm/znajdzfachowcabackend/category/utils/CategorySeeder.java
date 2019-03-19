package com.gjm.znajdzfachowcabackend.category.utils;

import com.gjm.znajdzfachowcabackend.category.dao.CategoryRepository;
import com.gjm.znajdzfachowcabackend.category.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class CategorySeeder {
    private CategoryRepository categoryRepository;
    private String[] categoriesNames = {
            "okna",
            "drzwi",
            "dachy",
            "ogrodzenia",
            "podłogi",
            "łazienki",
            "remonty",
            "kuchnie",
            "projektowanie",
            "hydraulika",
            "budowa domów",
            "naprawa AGD",
            "elewacje",
            "instalacje gazowe",
            "instalacje wodne",
            "instalacje elektryczne",
            "ogrzewanie",
            "centralne ogrzewanie",
            "balustrady",
            "bramy garażowe",
            "brukarstwo"
    };

    @Autowired
    public CategorySeeder(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @PostConstruct
    public void seedDatabaseByCategories() {
        for(String categoryName : categoriesNames) {
            if(categoryRepository.findCategoryByName(categoryName) == null) {
                Category category = new Category();
                category.setName(categoryName);

                categoryRepository.save(category);
            }
        }
    }
}
