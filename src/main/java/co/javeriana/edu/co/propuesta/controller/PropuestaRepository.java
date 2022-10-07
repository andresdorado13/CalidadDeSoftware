package co.javeriana.edu.co.propuesta.controller;

import co.javeriana.edu.co.propuesta.entity.Propuesta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropuestaRepository extends JpaRepository<Propuesta, Integer> {
}