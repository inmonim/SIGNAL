package com.ssafysignal.api.global.db.repository;

import com.ssafysignal.api.global.db.entity.ImageFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageFileRepository extends JpaRepository<ImageFile, Integer> {
}
