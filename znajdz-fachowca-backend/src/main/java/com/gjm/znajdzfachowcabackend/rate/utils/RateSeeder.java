package com.gjm.znajdzfachowcabackend.rate.utils;

import com.gjm.znajdzfachowcabackend.rate.dao.RateRepository;
import com.gjm.znajdzfachowcabackend.rate.entity.Rate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class RateSeeder {
    private RateRepository rateRepository;

    @Autowired
    public RateSeeder(RateRepository rateRepository) {
        this.rateRepository = rateRepository;
    }

    @PostConstruct
    public void seedDatabaseByRates() {
        boolean seedAction = false;

        if (seedAction) {
            Rate rate = new Rate();
            rate.setDateOfAdd(LocalDate.now());
            rate.setDescription("opis dobrej oceny 4/5 gwiazdek");
            rate.setRate(4);
            rate.setRaterName("gjm");
            rateRepository.save(rate);

            Rate rate1 = new Rate();
            rate1.setDateOfAdd(LocalDate.of(2017, 5, 5));
            rate1.setDescription("opis zlej oceny 1/5 gwiazdek");
            rate1.setRate(1);
            rate1.setRaterName("liv");
            rateRepository.save(rate1);

            Rate rate2 = new Rate();
            rate2.setDateOfAdd(LocalDate.of(2016, 4, 4));
            rate2.setDescription("opis sredniej oceny 3/5 gwiazdek");
            rate2.setRate(3);
            rate2.setRaterName("mk");
            rateRepository.save(rate2);
        }
    }
}
