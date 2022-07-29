# Proyecto Tránsito Capsule Corp

## Desafío

Como líder de proyecto seleccionado por Bulma, tu tarea es desarrollar un primer entregable para presentar, en el cual se pueda consultar por matrícula del automóvil y saber a cuál de las ciudades está asignado el cobro de la multa según corresponda

## Modo de Uso

Primero clonar el repositorio
El contenido del archivo .env es PASSWORDDB
usar los siguientes comandos para iniciar a usar el proyecto

##### npm i
##### npm run build
##### npm run dev

## Levantar una Multa
Para simular el sensor se envía la siguiente información
### Formato del Body 

Para probar enviar por postman un JSON en el body con el siguiente formato:

{"localization":[0,100],
    "heigh":60,
    "velocity":150,
    "city":"noRegistra",
    "image":"body.image"
    }
Usando un método post a la siguiente url

##### localhost:8080/multas/levantarmulta?matricula=hlk125

## consultar estado de multas

hacer una petición get

##### localhost:8080/multas?matricula=hlk125