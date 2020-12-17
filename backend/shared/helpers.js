exports.paginator = async (page, model, options) => {
  const collections = await model.countDocuments(options);
  let pages = collections / 10;
  pages = pages % 1 === 0 ? pages : +pages + 1;
  return {
    page: page || 1,
    collections,
    pages,
    skip: page > 1 ? (page * 10) - 10 : 0,
  };
};
