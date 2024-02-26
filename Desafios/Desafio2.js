 const fs = require ("fs");

 class ProductManager {
   constructor(path) {
     this.path = path;
     try {
       const data = readFileSync(this.path, "utf8");
       this.products = JSON.parse(data);
     } catch (error) {
       this.products = [];
     }
   }
 
   saveProducts() {
     const data = JSON.stringify(this.products);
     fs.writeFileSync(this.path, data, "utf8");
   }
 
   getProducts() {
     return this.products;
   }
 
   getProductById(id) {
     const product = this.products.find(p => p.id === id);
     if (!product) {
       throw new Error(`Product with id ${id} not found`);
     }
     return product;
   }
 
   addProduct({ title, description, price, thumbnail, code, stock }) {
     if (this.products.some(p => p.code === code)) {
       throw new Error(`Product with code ${code} already exists`);
     }
     const id = this.generateId();
     const product = { id, title, description, price, thumbnail, code, stock };
     this.products.push(product);
     this.saveProducts();
     return product;
   }
 
   updateProduct(id, fields) {
     const productIndex = this.products.findIndex(p => p.id === id);
     if (productIndex < 0) {
       throw new Error(`Product with id ${id} not found`);
     }
     const product = { id, ...fields };
     this.products[productIndex] = product;
     this.saveProducts();
     return product;
   }
 
   deleteProduct(id) {
     const productIndex = this.products.findIndex(p => p.id === id);
     if (productIndex < 0) {
       throw new Error(`Product with id ${id} not found`);
     }
     this.products.splice(productIndex, 1);
     this.saveProducts();
   }
 
   generateId() {
     let id = 1;
     if (this.products.length > 0) {
       id = this.products[this.products.length - 1].id + 1;
     }
     return id;
   }
 }
 
 // Creo instancia de ProductManager
 const manager = new ProductManager("products.json");
 
 // Obtengo productos (devuelve un array con los productos)
 console.log(manager.getProducts());
 
 // Agrego producto
 const product = manager.addProduct({
   title: "producto prueba",
   description: "Este es un producto prueba",
   price: 200,
   thumbnail: "Sin imagen",
   code: "abc123",
   stock: 25,
 });
 console.log(product); //Muestro el objeto producto con id generado
 
 // Obtengo productos (devuelve el array con el producto agregado)
 console.log(manager.getProducts());
 
 // Obtengo producto por id (devuelve el objeto producto)
 console.log(manager.getProductById(product.id));
 
 // Actualizo producto
 const updatedProduct = manager.updateProduct(product.id, { price: 300, stock: 10 });
 console.log(updatedProduct); // Muestro el objeto producto actualizado
 
 // Elimino producto
 manager.deleteProduct(product.id);