package com.ssafysignal.api.global.common.db.repository;

import com.ssafysignal.api.global.common.db.entity.ImageFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageFileRepository extends JpaRepository<ImageFile, Integer> {
}
