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
        Int id PK
        Int user_id FK
        Boolean receiveEmail
        DateTime createdAt
        DateTime updatedAt
    }
    Product {
        Int id PK
        String name
        String description
        String category
        Float price
        Int stock
        DateTime createdAt
        DateTime updatedAt
    }
    Order {
        Int id PK
        Int user_id FK
        Int product_id FK
        String status
        DateTime createdAt
        DateTime updatedAt
    }
    Document {
      Int id PK
      String fileName
      String mimeType
      Int size
      String url "UNIQUE"
      DateTime createdAt
    }
    User ||--|| UserPreference : "Setup"
    User ||--o{ Order : "Place"
    Order }o--o{ Product : "Place"
    User ||--o{ Document : "Place"
  