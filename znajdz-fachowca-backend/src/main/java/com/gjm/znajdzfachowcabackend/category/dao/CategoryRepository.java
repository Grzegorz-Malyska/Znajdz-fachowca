package com.gjm.znajdzfachowcabackend.category.dao;

import com.gjm.znajdzfachowcabackend.category.entity.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {
    Category findCategoryByName(String name);
}