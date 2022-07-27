# Proyecto Tránsito Capsule Corp

## Desafío

Como líder de proyecto seleccionado por Bulma, tu tarea es desarrollar un primer entregable para presentar, en el cual se pueda consultar por matrícula del automóvil y saber a cuál de las ciudades está asignado el cobro de la multa según corresponda

## Modo de Uso

Primero clonar el repositorio 
El contenido del archivo .env es PASSWORDDB=gxeI89xV0N8Cg6r9 (Cuando el proyecto sea publico quitar esto y dejar que el usuario use su propia BD)
usar los siguientes comandos para iniciar a usar el proyecto
##### npm i
##### npm run build
##### npm run dev

### Formato del Body 

Para probar enviar por postman un JSON en el body con el siguiente formato:

{"registration":"testTag5",
    "localization":[0,100],
    "heigh":60,
    "velocity":150,
    "city":"noRegistra",
    "image":"body.image"
    }