const boom = require("@hapi/boom");

function validatorHandler(schema, property) {
  //se crea un middleware de forma dinamica, buen ejemplo del uso de un clojure.
  return (req, res, next) => {
    const data = req[property]; //la info puede venir de body si es post o params query si es get etc, para hacerlo dinamico se utiliza property.
    const { error } = schema.validate(data); //devuelve un error si es que lo hay
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;

