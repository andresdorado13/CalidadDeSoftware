package co.javeriana.edu.co.propuesta.controller;

import co.javeriana.edu.co.propuesta.entity.Propuesta;
import co.javeriana.edu.co.propuesta.service.PropuestaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PropuestaController
{
    @Autowired
    private final PropuestaService PropuestaService;
    public PropuestaController(PropuestaService bookService)
    {
        this.PropuestaService = bookService;
    }

    @GetMapping("/")
    public List<Propuesta> list()
    {
        return PropuestaService.listAll();
    }

    @DeleteMapping("/propuestas/{bookid}")
    private void deletePropuesta(@PathVariable("bookid") int bookid)
    {
        PropuestaService.delete(bookid);
    }

    //crear propuesta
    @PostMapping("/propuestas")
    private int saveBook(@RequestBody Propuesta propuesta)
    {
        PropuestaService.saveOrUpdate(propuesta);
        return propuesta.getIdPropuesta();
    }
    //actualizar por id
    @PutMapping("/propuestas/{bookid}")
    private Propuesta update(@RequestBody Propuesta books,@PathVariable("bookid") int bookid)
    {
        PropuestaService.saveOrUpdate(books);
        return books;
    }
}
