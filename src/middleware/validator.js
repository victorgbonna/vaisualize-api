module.exports = (Schema) => (req, res, next) => {
    const { body, query, paramas } = req;
    const payload = { ...body, ...paramas, ...query };
    const { error } = Schema.validate(payload, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        error: { message: error.details.map((error) => error.message) },
      });
    }  
    next();
  };
  