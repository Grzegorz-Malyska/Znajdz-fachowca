package com.gjm.znajdzfachowcabackend.expert.dao;

import com.gjm.znajdzfachowcabackend.expert.entity.ExpertMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpertMessageRepository extends JpaRepository<ExpertMessage, Long> {
    List<ExpertMessage> findExpertMessagesByContent(String content);
    List<ExpertMessage> findExpertMessagesBySenderName(String senderName);
    ExpertMessage findExpertMessageByContentAndSenderName(String content, String senderName);
}
