import UserQuery from '../models/Queries';
const mongoose = require('mongoose')


// Get all queries
export function queries_get_all(req, res, next) {
    UserQuery.find()
        .select(' _id userQuery')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                queries: docs.map(doc => {
                    return {
                        userQuery: doc.userQuery,
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


// Add a query

export function add_userQuery(req, res, next) {
    const query = new UserQuery({
        _id: new mongoose.Types.ObjectId(),
        userQuery: req.body.userQuery,
        userId: req.body.userId
    });

    query.save()
        
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'Query added successfully',
                createdQuery: {
                    userQuery: result.userQuery,
                    userId: result.userId,
                    _id: result._id
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
    

}



// Collect one query by its id
// figure out why you have to use the specific query id instead of the userId
export function queries_get_one(req, res, next) {
    const id = req.params.queryId;
    UserQuery.findById(id)
        .exec()
        .then(doc => {
            console.log(doc)
            if (doc) {
                res.status(200).json({
                    userQuery: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:2023/blogs/' + doc.id
                    }
                })
            } else {
                res.status(404).json({
                    message: "No valid entry found for provided ID"
                })
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        });
}

// Delete a query
// Delete a blog by its id
export function query_delete_one(req, res, next)  {
    const id = req.params.queryId;
    UserQuery.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Query Deleted',
                
                
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
