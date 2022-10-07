package co.javeriana.edu.co.propuesta.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Propuesta {
    private int idPropuesta;

    private int votacion;

    private String fecha;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getIdPropuesta() {
        return idPropuesta;
    }

    public void setIdPropuesta(int idPropuesta) {
        this.idPropuesta = idPropuesta;
    }

    public int getVotacion() {
        return votacion;
    }

    public void setVotacion(int votacion) {
        this.votacion = votacion;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }
}
