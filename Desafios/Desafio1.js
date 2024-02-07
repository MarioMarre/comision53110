class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(p => p.id === id);
      if (!product) {
        throw new Error(`El producto con id ${id} no se encuentra`);
      }
      return product;
    }
  
    addProduct({ title, description, price, thumbnail, code, stock }) {
      if (this.products.some(p => p.code === code)) {
        throw new Error(`Producto con codigo ${code} ya existe`);
      }
      const id = this.generateId();
      const product = { id, title, description, price, thumbnail, code, stock };
      this.products.push(product);
      return product;
    }
  
    generateId() {
      let id;
      do {
        id = Math.floor(Math.random() * 1000000);
      } while (this.products.some(p => p.id === id));
      return id;
    }
  }
  
  // Creo instancia de ProductManager
  const manager = new ProductManager();
  
  // Obtengo productos (devuelve array vacio)
  console.log(manager.getProducts());
  
  // Agrego productos
  const product = manager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });
  console.log(product); // Muestro el objeto de producto con id generado
  
  // Obtengo productos (devuelve el array con el producto agregado))
  console.log(manager.getProducts());
  
  // Agrego producto con codigo repetido (muestra error)
  try {
    manager.addProduct({
      title: "otro producto",
      description: "Este es otro producto",
      price: 100,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 10,
    });
  } catch (error) {
    console.log(error.message);
  }
  
  // Obtengo producto por id (devuelvo el objeto producto)
  console.log(manager.getProductById(product.id));
  
  // Obtengo producto por id inexistente (muestra error)
  try {
    manager.getProductById(999999);
  } catch (error) {
    console.log(error.message);
  }
