package com.gjm.znajdzfachowcabackend.category.service.impl;

import com.gjm.znajdzfachowcabackend.category.dao.CategoryRepository;
import com.gjm.znajdzfachowcabackend.category.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<String> getAllCategoriesNames() {
        List<String> categoriesNames = new LinkedList<>();
        categoryRepository.findAll()
                .forEach(c -> categoriesNames.add(c.getName()));

        return categoriesNames;
    }
}
