package com.javaSpringRestAPI.repository;

import com.javaSpringRestAPI.model.Cat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
/**
 *
 * @author Sean Bradley
 */
@Repository
public interface CatRepository extends JpaRepository<Cat, Long>{
    
}
