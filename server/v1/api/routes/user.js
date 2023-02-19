import { Router } from 'express';
import { Types } from 'mongoose';
const router = Router();
import { hash as _hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';


import User, { find, deleteOne } from '../models/user';

router.post('/signup', (req, res, next) => {
    find({
        email: req.body.email
    })
    .exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({
                message: "Email already exists"
            })
        } else {
            _hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
            } else {
                const user = new User({
                    _id: new Types.ObjectId(),
                    email: req.body.email,
                    password: hash
            }); 
            user
            .save()
            .then(result => {
                console.log(result)
                res.status(201).json({
                    message: 'User created'
                })
            })
            .catch( err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
        }
            
        });
        }
    })

    
});

router.post('/login', (req, res, next) => {
    find({ email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Mail not found, user doesn\'t exist'
            })
        }
        compare(req.body.password, user[0].password, (err,result) => {
            if(err) {
                return res.status(402).json({
                    message: 'Auth failed'
                })
            }
            if (result) {
                const token = sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, process.env.JWT_KEY, 
                {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
        
                });
            }
            res.status(404).json({
                message: 'Auth failed'
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }) 
})

router.delete('/:id', (req,res,next) => {
    deleteOne({ _id: req.params.id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "User deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }) 
})



export default router;
