package com.gjm.znajdzfachowcabackend.expert.service;

import com.gjm.znajdzfachowcabackend.expert.entity.Expert;
import com.gjm.znajdzfachowcabackend.expert.entity.ExpertMessage;
import com.gjm.znajdzfachowcabackend.rate.entity.Rate;

import java.util.List;

public interface ExpertService {
    List<Expert> getExpertsByCityAndCategoryName(String city, String categoryName);

    void addExpert(Expert expert);

    void rateExpert(String name, Rate rate);

    void updateExpertByName(String name, Expert newExpert);
    Expert loginInExpert(String name, String password);

    void sendPrivateMessage(String name, ExpertMessage privateMessage);
    void deletePrivateMessage(String expertName, ExpertMessage privateMessage);
}
