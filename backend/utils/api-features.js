class ApiFeatures {
  constructor(model, queryString) {
    this.model = model;
    this.queryString = queryString;
  }

  limitFields() {
    const { fields = "-__v" } = this.queryString;

    this.model = this.model.select(fields.split(","));

    return this;
  }

  paginate() {
    const { page = 1, limit = 10 } = this.queryString;

    const skip = (page * 1 - 1) * limit * 1;

    this.model = this.model.skip(skip).limit(Number(limit));

    return this;
  }

  filter() {
    const { page, limit, sort, fields, search, ...filter } = this.queryString;

    const searchTerm = search?.trim?.()?.toLowerCase?.() || "";
    const hasFilter = Object.keys(filter).length > 0;

    let findQuery = {};

    if (!!searchTerm) {
      findQuery = {
        $or: [
          { name: { $regex: search.trim(), $options: "i" } },
          {
            description: { $regex: search.trim(), $options: "i" },
          },
        ],
      };
    }

    if (hasFilter) {
      const filterParams = JSON.parse(
        JSON.stringify(filter).replace(
          /\b(gt|gte|lt|lte)\b/g,
          (match) => `$${match}`
        )
      );
      for (const key in filterParams) {
        findQuery[key] = filterParams[key];
      }
    }

    this.model = this.model
      .find(findQuery)
      .collation({ locale: "fa", strength: 1 });

    return this;
  }

  sort() {
    const { sort: sortBy = "createdAt" } = this.queryString;

    this.model = this.model.sort(sortBy);

    return this;
  }
}

module.exports = { ApiFeatures };
