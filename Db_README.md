## Database Schema & Design

The system uses SQLite with Prisma ORM to model core retail entities and relationships. The schema is optimized for analytical workloads, fast lookups, and dynamic filtering.

### Structure

The database follows a relational model with four main entities:

| Entity     | Purpose                                                                            |
| ---------- | ---------------------------------------------------------------------------------- |
| `Customer` | Stores demographic and regional attributes for buyers.                             |
| `Product`  | Defines inventory items, categories, and searchable tags.                          |
| `Store`    | Represents physical retail locations.                                              |
| `Employee` | Tracks sales staff involved in transactions.                                       |
| `Sale`     | Transaction table linking all related entities with pricing, status, and metadata. |

### Relationships

The `Sale` model acts as the central fact table, connecting to:

```
Customer  ←─┐
Product   ←─┼── Sale (Fact Table)
Store     ←─┤
Employee  ←─┘
```

Each sale record references a customer, product, store, and employee through foreign keys.

### Indexing Strategy

Indexes are applied to support:

* High-volume querying across demographic fields
* Faster search for product attributes and tags
* Efficient analytical sorting by sales metadata such as date, quantity, and payment method

Key indexed fields include:

* `customerName`, `phoneNumber`, `customerRegion`, `age`
* `productCategory`, `brand`, `tags`
* `date`, `quantity`, `paymentMethod`, and all foreign keys

### Performance Benefits

* Supports **1M+ rows** with optimized reads due to indexing and structured relations.
* Enables fast filtering, sorting, and aggregated views in real-time.
* Keeps storage simple and lightweight while still supporting relational constraints.
