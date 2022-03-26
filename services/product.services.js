const faker = require('faker');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();

  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),

      })

    }
  }

  create(data) {
    if (data) {
      this.products.push(data);
      return true;
    }
    else {
      return false;
    }

  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find(item => item.id === id);
  }


  update(id, data) {
    var index = this.products.indexOf(this.findOne(id));
    if (index !== -1) {
      this.products[index] = data;
      return this.products[index];
    }
    else {
      return null;
    }


  }

  updatePatch(id, data) {
    var index = this.products.indexOf(this.findOne(id));
    if (index !== -1) {
      const product = this.products[index];
      this.products[index] = { ...product, ...data, };
      return this.products[index];
    }
    else {

      return null;
    }


  }



  delete(id) {
    var i = this.products.indexOf(this.findOne(id));

    if (i !== -1) {
      this.products.splice(i, 1);
      return true;
    }
    else {
      return false;
    }

  }
}


module.exports = ProductsService;
