package com.example.backend.common.repository;

import com.example.backend.common.model.Users;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<Users, Long> {

    @Query(value = "SELECT * FROM USERS U WHERE U.USERNAME = :username")
    Users findUserByUsername(@Param("username") String userName);
}
