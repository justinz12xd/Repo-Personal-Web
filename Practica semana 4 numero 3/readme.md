# 🖥 Práctica #2 - Arquitectura del Dominio con Métodos Asíncronos

```mermaid
erDiagram
    USUARIO ||--o{ ADOPCION : realiza
    USUARIO ||--o{ PUBLICACION : crea
    USUARIO ||--o{ DONACION : realiza
    USUARIO ||--o{ VOLUNTARIO : participa
    
    ANIMAL ||--o{ PUBLICACION : "aparece en"
    ANIMAL ||--o{ SEGUIMIENTO : recibe
    ANIMAL ||--o{ CAUSA_URGENTE : "tiene"
    ANIMAL }o--|| ESPECIE : "es de tipo"
    ANIMAL }o--|| REFUGIO : "reside en"
    ANIMAL }o--o| SUPERVISOR : "es supervisado por"
    
    REFUGIO ||--o{ ANIMAL : alberga
    REFUGIO ||--o{ SUPERVISOR : emplea
    REFUGIO ||--o{ CAUSA_URGENTE : gestiona
    
    PUBLICACION ||--o{ ADOPCION : genera
    
    CAMPANIA ||--o{ VOLUNTARIO : "tiene"
    CAMPANIA }o--|| TIPO_CAMPANIA : "es de tipo"
    
    SUPERVISOR ||--o{ SEGUIMIENTO : realiza
    
    CAUSA_URGENTE ||--o{ DONACION : recibe

    USUARIO {   
        uuid id_usuario PK
        varchar nombre
        varchar email UK
        varchar contrasenia
        varchar telefono
        varchar direccion
        date fecha_registro
    }
    
    ANIMAL {
        uuid id_animal PK
        varchar nombre
        uuid id_especie FK
        varchar edad
        varchar estado
        text descripcion
        text fotos
        varchar estado_adopcion
        uuid id_refugio FK
    }
    
    ESPECIE {
        uuid id_especie PK
        varchar nombre UK
    }
    
    REFUGIO {
        uuid id_refugio PK
        varchar nombre
        varchar direccion
        varchar telefono
        text descripcion
    }
    
    PUBLICACION {
        uuid id_publicacion PK
        varchar titulo
        text descripcion
        timestamptz fecha_subida
        varchar estado
        uuid id_usuario FK
        uuid id_animal FK
    }
    
    ADOPCION {
        uuid id_adopcion PK
        timestamptz fecha_adopcion
        varchar estado
        uuid id_publicacion FK
        uuid id_usuario FK
    }
    
    SUPERVISOR {
        uuid id_supervisor PK
        varchar nombre
        int total_animales
        uuid id_refugio FK
        uuid id_animal FK
    }
    
    SEGUIMIENTO {
        uuid id_seguimiento PK
        varchar titulo
        text observaciones
        timestamptz fecha_seguimiento
        uuid id_animal FK
        uuid id_supervisor FK
    }
    
    CAMPANIA {
        uuid id_campania PK
        uuid id_tipo_campania FK
        varchar titulo
        text descripcion
        timestamptz fecha_inicio
        timestamptz fecha_fin
        varchar lugar
        varchar organizador
        varchar estado
    }
    
    TIPO_CAMPANIA {
        uuid id_tipo_campania PK
        varchar nombre
        text descripcion
    }
    
    VOLUNTARIO {
        uuid id_voluntario PK
        varchar rol
        varchar estado
        uuid id_usuario FK
        uuid id_campania FK
    }
    
    CAUSA_URGENTE {
        uuid id_causa_urgente PK
        varchar titulo
        text descripcion
        numeric meta
        timestamptz fecha_limite
        uuid id_refugio FK
        uuid id_animal FK
    }
    
    DONACION {
        uuid id_donacion PK
        numeric monto
        timestamptz fecha
        uuid id_usuario FK
        uuid id_causa_urgente FK
    }