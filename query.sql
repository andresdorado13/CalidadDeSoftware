Drop table tiposector cascade;
Drop table tiporol cascade;
Drop table tipodepartamento cascade;
Drop table Usuario cascade;
Drop table propuesta cascade;

create table TipoSector(
	id Integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1 ),
	nombre varchar(30) UNIQUE,
	PRIMARY KEY(id)
);

create table TipoRol(
	id Integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1 ),
	nombre varchar(30) UNIQUE,
	PRIMARY KEY(id)
);

create table TipoDepartamento(
	id Integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1 ),
	nombre varchar(30) UNIQUE,
	PRIMARY KEY(id)
);

create table Usuario(
	id Integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1 ),
	nombre varchar(30) not null,
   	cedula Integer UNIQUE,
   	correo varchar(30) not null,
	contraseña varchar(30) not null,
	tipoSectorId Integer not null,
	tipoRolId Integer not null,
	tipoDepartamentoId Integer not null,
	PRIMARY KEY(id),
	FOREIGN KEY(tipoSectorId) REFERENCES TipoSector(id),
	FOREIGN KEY(tipoRolId) REFERENCES TipoRol(id),
	FOREIGN KEY(tipoDepartamentoId) REFERENCES TipoDepartamento(id)
);

create table Propuesta(
	id Integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1 ),
	titulo varchar(30) UNIQUE,
   	fechaPublicacion varchar(30) not null,
   	votos Integer not null,
	usuarioId Integer not null,
	PRIMARY KEY(id, usuarioId),
	FOREIGN KEY(usuarioId) REFERENCES Usuario(id)
);

INSERT INTO tiporol (nombre) VALUES ('Normal');
INSERT INTO tiporol (nombre) VALUES ('Experto');

INSERT INTO tipodepartamento (nombre) VALUES ('Amazonas');
INSERT INTO tipodepartamento (nombre) VALUES ('Antioquia');
INSERT INTO tipodepartamento (nombre) VALUES ('Arauca');
INSERT INTO tipodepartamento (nombre) VALUES ('Atlantico');
INSERT INTO tipodepartamento (nombre) VALUES ('Bogota');
INSERT INTO tipodepartamento (nombre) VALUES ('Bolivar');
INSERT INTO tipodepartamento (nombre) VALUES ('Boyaca');
INSERT INTO tipodepartamento (nombre) VALUES ('Caldas');
INSERT INTO tipodepartamento (nombre) VALUES ('Caqueta');
INSERT INTO tipodepartamento (nombre) VALUES ('Casanare');
INSERT INTO tipodepartamento (nombre) VALUES ('Cauca');
INSERT INTO tipodepartamento (nombre) VALUES ('Cesar');
INSERT INTO tipodepartamento (nombre) VALUES ('Choco');
INSERT INTO tipodepartamento (nombre) VALUES ('Cordoba');
INSERT INTO tipodepartamento (nombre) VALUES ('Cundinamarca');
INSERT INTO tipodepartamento (nombre) VALUES ('Guainia');
INSERT INTO tipodepartamento (nombre) VALUES ('Guaviare');
INSERT INTO tipodepartamento (nombre) VALUES ('Huila');
INSERT INTO tipodepartamento (nombre) VALUES ('La Guajira');
INSERT INTO tipodepartamento (nombre) VALUES ('Magdalena');
INSERT INTO tipodepartamento (nombre) VALUES ('Meta');
INSERT INTO tipodepartamento (nombre) VALUES ('Nariño');
INSERT INTO tipodepartamento (nombre) VALUES ('Norte de Santander');
INSERT INTO tipodepartamento (nombre) VALUES ('Putumayo');
INSERT INTO tipodepartamento (nombre) VALUES ('Quindio');
INSERT INTO tipodepartamento (nombre) VALUES ('Risaralda');
INSERT INTO tipodepartamento (nombre) VALUES ('San Andres y Providencia');
INSERT INTO tipodepartamento (nombre) VALUES ('Santander');
INSERT INTO tipodepartamento (nombre) VALUES ('Sucre');
INSERT INTO tipodepartamento (nombre) VALUES ('Tolima');
INSERT INTO tipodepartamento (nombre) VALUES ('Valle del Cauca');
INSERT INTO tipodepartamento (nombre) VALUES ('Vaupes');
INSERT INTO tipodepartamento (nombre) VALUES ('Vichada');

INSERT INTO tiposector (nombre) VALUES ('Agropecuario');
INSERT INTO tiposector (nombre) VALUES ('Comercio exterior');
INSERT INTO tiposector (nombre) VALUES ('Comercio y servicios');
INSERT INTO tiposector (nombre) VALUES ('Construccion');
INSERT INTO tiposector (nombre) VALUES ('Precios');
INSERT INTO tiposector (nombre) VALUES ('Economia');
INSERT INTO tiposector (nombre) VALUES ('Educacion');
INSERT INTO tiposector (nombre) VALUES ('Tecnologias de informacion');
INSERT INTO tiposector (nombre) VALUES ('Industria');
INSERT INTO tiposector (nombre) VALUES ('Indicadores de competividad');

INSERT INTO usuario (nombre,cedula,correo,contraseña,tiporolid,tiposectorid,tipodepartamentoid) VALUES ('Andres Dorado',1001346393,'andresfdorado.13@gmail.com','andresdorado13',1,5,20);

select u.id,u.nombre,u.cedula,u.correo,u.contraseña,r.nombre,s.nombre,d.nombre
from usuario u,tiporol r,tiposector s,tipodepartamento d
where r.id=u.tiporolid and s.id=u.tiposectorid and d.id=u.tipodepartamentoid