# 🎯 EDD: Microservicios con Kafka

Este proyecto demuestra cómo implementar microservicios utilizando Kafka y NestJS. Incluye ejemplos de configuración, producción y consumo de mensajes, así como la integración con bases de datos y otros servicios.

---

## 📋 Tabla de Contenidos

- [Objetivo del Proyecto](#-objetivo-del-proyecto)
- [Tecnologías Usadas](#-tecnologías-usadas)
- [Conocimientos Previos Recomendados](#-conocimientos-previos-recomendados)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Configuración de Kafka](#-configuración-de-kafka)
- [Instalación](#-instalación)
- [Ejecutar el Proyecto](#-ejecutar-el-proyecto)
- [Ejecutar los Tests](#-ejecutar-los-tests)
- [Licencia](#-licencia)

---

## 🎯 Objetivo del Proyecto

El objetivo de este proyecto es proporcionar una guía práctica para implementar EDD con varios microservicios.
- En api se implementa un microservicio que produce mensajes a un topic de Kafka.
- En consumer se implementa un microservicio que consume mensajes de un topic de Kafka.

---

## 📦 Tecnologías Usadas

- [NestJS](https://nestjs.com/) como framework principal
- [Kafka](https://kafka.apache.org/) para mensajería
- [Docker](https://www.docker.com/) para contenerización
- [Makefile](https://www.gnu.org/software/make/) para automatización de tareas
- [Vitest](https://vitest.dev/) para testing

---

## 📚 Conocimientos Previos Recomendados

### ¿Qué es EDD (Event-Driven Design)?
Event-Driven Design (Diseño orientado a eventos) es un estilo arquitectónico en el que los componentes del sistema se comunican principalmente a través de eventos.

### ¿Qué es un evento?
Un evento es algo que sucede en el sistema y que puede ser interesante para otros componentes. Por ejemplo:

- UsuarioRegistrado
- PedidoCreado
- ProductoAgotado

### ¿Cómo funciona EDD?
El flujo típico es:

1. Un productor (emisor) genera un evento.
2. Uno o más consumidores (receptores) escuchan ese evento y reaccionan en consecuencia.

La lógica del sistema se construye en torno a estos eventos.

### Tipos de comunicación en EDD
 - Sincrónica: menos común en EDD (tipo REST o RPC). 
 - Asíncrona: más común, usando colas o buses de eventos.

#### Ventajas:
- Desacoplamiento entre componentes. 
- Escalabilidad y extensibilidad. 
- Mayor claridad en flujos de negocio complejos.

#### Desventajas:
- Dificultad para depurar. 
- Mayor complejidad en la gestión de estados/eventos. 
- Requiere buenas prácticas para evitar el "infierno de eventos".

### ¿Qué es Kafka?
Apache Kafka es una plataforma de streaming distribuida diseñada para manejar flujos de datos en tiempo real. Es ideal para implementar arquitecturas event-driven.

### Conceptos clave de Kafka
- Producer: Publica eventos (mensajes). 
- Topic: Canal donde se publican los eventos. 
- Partition: Cada topic se divide en particiones para escalabilidad. 
- Consumer: Lee eventos de un topic. 
- Broker: Nodo del clúster de Kafka que almacena los eventos. 
- Consumer Group: Un grupo de consumidores que procesan eventos de forma cooperativa.

#### Ejemplo práctico
Supongamos que tienes un sistema de pedidos:

1. El microservicio Pedidos crea un pedido y publica un evento PedidoCreado en el topic pedidos.
2. El microservicio Facturación escucha el topic pedidos, detecta PedidoCreado y genera una factura.
3. El microservicio Inventario también escucha ese evento y actualiza el stock.

---

## 📦 Estructura del Proyecto

```text
kafka-microservices/
├── api/
│   ├── config/ # Environment variables
│   ├── src/
│       ├── shared/
│       ├── users/
│       ├── test/
│           ├── application/   # Tests unitarios
├── event-consumer/
│   ├── config/ # Environment variables
│   ├── src/
│       ├── shared/
│       ├── users/
```

---

## ⚙️ Configuración de Kafka

Para configurar Kafka, necesitas tener un clúster de Kafka en funcionamiento.

La primera vez que se lanza el proyecto, se debe generar la configuración de Kafka (carpeta kafka-data).
```bash
make format-kafka
```

---

## 💾 Instalación

```bash
pnpm install
```

---

## 🚀 Ejecutar el Proyecto

Para el entorno local, se debe lanzar el siguiente comando:

```bash
make docker-up
```

Para el entorno de producción, se debe lanzar el siguiente comando:

```bash
docker compose -f docker-compose-prod.yml up --build -d
```

---

## 🧪 Ejecutar los Tests

Dentro del microservicio de api, puedes ejecutar los tests con el siguiente comando:
```bash
pnpm test
```

---

## 📝 Licencia

Este proyecto está licenciado bajo la licencia MIT.

En la raíz del repositorio encontrarás un archivo llamado `LICENSE` que contiene el texto completo de la licencia. Este archivo indica los términos bajo los cuales puedes usar, modificar y distribuir este proyecto.

La licencia MIT es muy permisiva, permitiendo el uso libre del código siempre que se mantenga el aviso de copyright y la licencia original.

No se requiere configuración adicional para usar el proyecto bajo esta licencia, simplemente respeta las condiciones indicadas en el archivo `LICENSE`.
