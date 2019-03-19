package com.gjm.znajdzfachowcabackend.expert.dao;

import com.gjm.znajdzfachowcabackend.category.entity.Category;
import com.gjm.znajdzfachowcabackend.expert.entity.Expert;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpertRepository extends CrudRepository<Expert, Long> {
    List<Expert> findExpertsByCityAndCategories(String city, List<Category> categories);
    Expert findExpertByName(String name);
}
