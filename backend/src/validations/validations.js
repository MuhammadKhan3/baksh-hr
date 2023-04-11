const {body, validationResult} = require('express-validator');
const User =require('../models/user')
const {managerImage}=require('../middleware/multer')

exports.validRole=[
    body('roleName').notEmpty().isString().isLength({ min: 3}),
    (req,res,next)=>{
        console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]


exports.validUser=[
  body('email')
  .notEmpty()
  .isString()
  .isLength({ min: 3}),

  body('password').notEmpty().isString().isLength({ min: 3}),
  (req,res,next)=>{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      User.findOne({where:{email:req.body.email}})
      .then(user => {
        if (user) {
          console.log('ht,,,')
          return res.status(200).json({msg:'E-mail already exist',flag:false});
        }
      });
      next();
  }
]




exports.validManager=[  
  (req,res,next)=>{
    req.body=JSON.parse(JSON.stringify(req.body));
    next();
  },
  body('name')
  .notEmpty().withMessage('Name is required'),
  body('phone')
  .notEmpty()
  .withMessage('Phone is required')
  .isLength({min:11,max:15})
  .withMessage('Phone Length 11 greater than')

  ,
  body('email')
    .isEmail().withMessage('Email is not valid')
    .normalizeEmail()
    .custom((email)=>{
      return User.findOne({where:{email:email}})
      .then(user => {
        if (user) {
          return Promise.reject('E-mail already exist');
        }
      });
    })
    ,
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('status')
  .notEmpty().withMessage('Status is required'),
  body('module').notEmpty().withMessage('Module must not be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];


// Edit Manager validation
exports.validEditManager=[  
  (req,res,next)=>{
    req.body=JSON.parse(JSON.stringify(req.body));
    next();
  },
  body('name')
  .notEmpty().withMessage('Name is required'),
  body('phone')
  .notEmpty()
  .withMessage('Phone is required')
  .isLength({min:11,max:15})
  .withMessage('Phone Length 11 greater than')

  ,
  body('email')
    .isEmail().withMessage('Email is not valid')
    .normalizeEmail()
    .custom((email)=>{
      return User.findOne({where:{email:email}})
      .then(user => {
        if (!user) {
          return Promise.reject('E-mail not exist');
        }
      });
    })
    ,
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('status')
  .notEmpty().withMessage('Status is required'),
  body('module').notEmpty().withMessage('Module must not be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
// Close Edit Validation Manager


// Login Validation Manager
exports.validLogin=[  
  
  body('email')
    .isEmail().withMessage('Email is not valid')
    .normalizeEmail()
    .custom((email)=>{
      return User.findOne({where:{email:email}})
      .then(user => {
        if (!user) {
          throw new Error('E-mail Not Exist');
        }
        if(user.status==='inactive'){
          throw new Error('Your account is blocked');
        }
      });
    })
    ,
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  (req, res, next) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Close Validation Login
exports.permission=[

]



exports.validEmployee=[
  body('name').notEmpty().withMessage('Name is required'),
  body('fatherName').notEmpty().withMessage('Father Name is required'),
  body('dob').notEmpty().withMessage('Date of Birth is required'),
  body('gender').notEmpty().withMessage('Gender is required').isIn(['male', 'female', 'other']).withMessage('Invalid Gender'),
  body('contactOne').notEmpty().withMessage('Primary Phone is required'),
  body('contactTwo').optional().notEmpty().withMessage('Secondary Phone is required'),
  body('localAddress').notEmpty().withMessage('Local Address is required'),
  body('nationality').notEmpty().withMessage('Nationality is required'),
  body('permanentAddress').notEmpty().withMessage('Permanent Address is required'),
  // body('referenceOne').notEmpty().withMessage('Reference One is required'),
  // body('referenceOnePhone').notEmpty().withMessage('Reference One Phone is required'),
  // body('referenceTwo').notEmpty().withMessage('Reference Two is required'),
  // body('referenceTwoPhone').notEmpty().withMessage('Reference Two Phone is required'),
  body('martialStatus').notEmpty().withMessage('Marital Status is required'),
  body('departmentId').notEmpty().withMessage('Department ID is required'),
  body('designationId').notEmpty().withMessage('Designation ID is required'),
  body('dateofJoining').notEmpty().withMessage('Date of Joining is required'),
  body('email').notEmpty().withMessage('Email is required')
  .isEmail()
  .withMessage('Invalid Email')
  .custom((email)=>{
      return User.findOne({where:{email:email}})
      .then(user => {
        if (user) {
          return Promise.reject('E-mail already exist');
        }
      })
  }),
  body('password').notEmpty().withMessage('Password is required'),
  body('status').notEmpty().withMessage('Status is required'),
  body('bloodGroup').notEmpty().withMessage('Blood Group is required'),
  body('emergencyContact').notEmpty().withMessage('Emergency Contact is required'),
  body('kinname').notEmpty().withMessage('Next of Kin Name is required'),
  body('relation').notEmpty().withMessage('Relation is required'),
  body('kinPhone').notEmpty().withMessage('Next of Kin Phone is required'),
  body('holderName').notEmpty().withMessage('Account Holder Name is required'),
  body('accountNumber').notEmpty().withMessage('Account Number is required'),
  body('bankId').notEmpty().withMessage('Bank Name is required'),
  body('branch').notEmpty().withMessage('Branch is required'),
  body('salaryType').notEmpty().withMessage('Salary Type is required'),
  body('salary').notEmpty().withMessage('Salary is required'),
  (req, res, next) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]



exports.validSalaryType=[
  
  
  
  body('leaveType').notEmpty().withMessage('Leave Type is required').isLength({min:3,max:100}),
  body('creditTypeValue').notEmpty().withMessage('Credit Type is required').isLength({min:3,max:100}),
  body('creditLeave').notEmpty().isNumeric().withMessage('Credit Leave of Birth is required'),
  body('description').isLength({min:0,max:2000}).withMessage('Descripiton Less than 2000')
]