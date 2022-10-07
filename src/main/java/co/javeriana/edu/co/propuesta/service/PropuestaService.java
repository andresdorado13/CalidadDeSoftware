package co.javeriana.edu.co.propuesta.service;

import co.javeriana.edu.co.propuesta.controller.PropuestaRepository;
import co.javeriana.edu.co.propuesta.entity.Propuesta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PropuestaService {
    @Autowired
    private PropuestaRepository repo;

    public List<Propuesta> listAll()
    {
        return this.repo.findAll();
    }

    public void save(Propuesta product) {
        repo.save(product);
    }

    public Propuesta get(Integer id) {
        return repo.findById(id).get();
    }

    public void delete(Integer id) {
        repo.deleteById(id);
    }

    public void saveOrUpdate(Propuesta books)
    {
        repo.save(books);
    }



}