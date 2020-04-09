const getAll = async function(selectParams) {
  return new Promise((resolve, reject) => {
    console.log(this);
    const query = this.find().exec((err, docs) => {
      if (docs) {
        console.log("dsfsfd");
        console.log(docs);
        resolve(docs);
      } else {
          console.log("dsfsfd");
        console.log(err);
        reject(err);
      }
    });
  });
}

module.exports = {
  getAll,
};
