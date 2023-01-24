package com.ssafysignal.api.global.db.repository;

import com.ssafysignal.api.global.db.entity.ImageFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageFileRepository extends JpaRepository<ImageFile, Integer> {
}
