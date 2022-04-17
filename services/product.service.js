const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();

  }

  async generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()

      })

    }
  }

  async create(data) {
    if (data) {
      this.products.push(data);
      return true;
    }
    else {
      return false;
    }

  }

  async find() {
    return this.products;
  }

  async findOne(id) {
    //const name = this.getTotal();
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is block');
    }
    return product;

  }


  async update(id, data) { //HECHO
    var index = this.products.indexOf(await this.findOne(id));
    if (index !== -1) {
      this.products[index] = data;
      return this.products[index];
    }
    else {
      throw boom.notFound('Product not found');
    }

  }

  async updatePatch(id, data) { //HECHO
    var index = this.products.indexOf(await this.findOne(id));
    if (index !== -1) {
      const product = this.products[index];
      this.products[index] = { ...product, ...data, };
      return this.products[index];
    }
    else {
      throw boom.notFound('Product not found');
    }


  }



  async delete(id) {//HECHO
    var i = this.products.indexOf(await this.findOne(id));

    if (i !== -1) {
      this.products.splice(i, 1);
      return true;
    }
    else {
      throw boom.notFound('Product not found');
    }

  }
}


module.exports = ProductsService;
