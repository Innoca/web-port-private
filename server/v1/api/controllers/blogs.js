import { find } from '../models/Blog';

export function blogs_get_all(req, res, next) {
    find()
        .select('blogTitle blogContent _id blogImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                blogs: docs.map(doc => {
                    return {
                        blogTitle: doc.blogTitle,
                        blogContent: doc.blogContent,
                        blogImage: doc.blogImage,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:2023/blogs/' + doc._id
                        }
                    }
                })
            };

            res.status(200).json(response)



        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}