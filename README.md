# Database Model

```mermaid
erDiagram
    User {
        Int id PK
        String email "UNIQUE"
        String firstname
        String lastname
        DateTime createdAt
        DateTime updatedAt
    }
    UserPreference {
        String id PK
        Int user_id FK
        Boolean receiveEmail
        DateTime createdAt
        DateTime updatedAt
    }
    Product {
        String id PK
        String name
        String description
        String category
        Float price
        Int stock
        DateTime createdAt
        DateTime updatedAt
    }
    Order {
        String id PK
        Int user_id FK
        Int product_id FK
        String status
        DateTime createdAt
        DateTime updatedAt
    }
    User ||--|| UserPreference : "Setup"
    User ||--o{ Order : "Place"
    Order }o--o{ Product : "Place" 
  