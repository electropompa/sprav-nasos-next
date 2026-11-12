# Таблица posts

ID | bigint | NOT NULL | AUTO_INCREMENT

Заголовок

slug

content

data

author?

# Таблица products

```sql
CREATE TABLE products (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id INT UNSIGNED NOT NULL,
  brand_id INT UNSIGNED NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  sku VARCHAR(100) NULL,
  name VARCHAR(500) NOT NULL,
  description MEDIUMTEXT NULL,
  price DECIMAL(12,2) NULL,
  old_price DECIMAL(12,2) NULL,
  currency CHAR(3) NOT NULL DEFAULT 'RUB',
  stock_status ENUM('in_stock','on_order','out_of_stock') NOT NULL DEFAULT 'on_order',
  image_url VARCHAR(500) NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  source VARCHAR(50) NULL,
  external_id VARCHAR(190) NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_source (source, external_id),
  KEY idx_cat_price (category_id, is_active, price),
  KEY idx_cat_brand (category_id, brand_id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);
```

# Таблица categories

```sql
CREATE TABLE categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  parent_id INT UNSIGNED NULL,
  slug VARCHAR(190) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  sort INT NOT NULL DEFAULT 0,
  FOREIGN KEY (parent_id) REFERENCES categories(id)
);
```

# Таблица brands

```sql
CREATE TABLE brands (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(190) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL
);
```

# Таблица атрибутов

### Справочник атрибутов (единый для всех источников)
```sql
CREATE TABLE attributes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(100) NOT NULL UNIQUE,     -- 'max_head', 'power_kw', 'pump_type'
  name VARCHAR(255) NOT NULL,            -- 'Максимальный напор'
  type ENUM('number','enum','bool','text') NOT NULL,
  unit VARCHAR(20) NULL,                 -- базовая единица: 'м', 'кВт', 'м³/ч'
  sort INT NOT NULL DEFAULT 0
);
```

### Значения для enum-атрибутов
```sql
CREATE TABLE attribute_options (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  attribute_id INT UNSIGNED NOT NULL,
  slug VARCHAR(190) NOT NULL,
  value VARCHAR(255) NOT NULL,           -- 'Скважинный', 'Центробежный'
  sort INT NOT NULL DEFAULT 0,
  UNIQUE KEY uq_attr_slug (attribute_id, slug),
  FOREIGN KEY (attribute_id) REFERENCES attributes(id)
);
```

### Какие атрибуты показывать как фильтры в категории (и как)
```sql
CREATE TABLE category_attributes (
    category_id INT UNSIGNED NOT NULL,
    attribute_id INT UNSIGNED NOT NULL,
    is_filter TINYINT(1) NOT NULL DEFAULT 1,
    sort INT NOT NULL DEFAULT 0,
    PRIMARY KEY (category_id, attribute_id)
);
```


### Значения у товаров
```sql
CREATE TABLE product_attribute_values (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT UNSIGNED NOT NULL,
    attribute_id INT UNSIGNED NOT NULL,
    option_id INT UNSIGNED NULL,           -- для enum
    value_num DECIMAL(14,4) NULL,          -- для number (в базовой единице)
    value_bool TINYINT(1) NULL,
    value_text VARCHAR(1000) NULL,
    KEY idx_enum (attribute_id, option_id, product_id),
    KEY idx_num  (attribute_id, value_num, product_id),
    KEY idx_prod (product_id, attribute_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```