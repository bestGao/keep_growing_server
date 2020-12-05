module.exports = (app) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const modelname = new Schema(
    {
      title: { type: String, default: '' },
      obj: {}, //对象类型
      createdAt: { type: Date },
      updatedAt: { type: Date },
      remark: { type: String, default: '' },
    },
    {
      collection: 'article',
      toObject: { virtuals: true },
      toJSON: { virtuals: true },
    }
  )

  return mongoose.model('WebArticles', modelname)
}
