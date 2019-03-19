package com.gjm.znajdzfachowcabackend.rate.dao;

import com.gjm.znajdzfachowcabackend.rate.entity.Rate;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public interface RateRepository extends CrudRepository<Rate, Long> {
    Rate findRateByRaterName(String raterName);
}
