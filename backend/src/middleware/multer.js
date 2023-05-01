const multer=require('multer');

const imageFilter = function(req, file, cb) {
    const allowedExtensions = ['.png', '.jpg','.jpeg','.PNG'];
    const fileExtension = file.originalname.slice(-4);
    console.log(fileExtension)
    if (file.mimetype.startsWith('image/') && allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Only PNG and JPG files are allowed'), false);
    }
};

const csvFilter = function(req, file, cb) {
  const allowedExtensions = ['.csv', '.xlsx'];
  const fileExtension = file.originalname.slice(-4);
  console.log(fileExtension,file.mimetype)
  if (file.mimetype.includes('csv') && allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Only Csv and Excel files are allowed'), false);
  }
};

const Multer = multer.diskStorage({
    destination: function(req, file, cb) {
      console.log(file?.fieldname)
      if(file?.fieldname==='employeePhoto'){
        cb(null, './uploads/employees');

      }else{
        cb(null, './uploads/managers');
      }
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname);
    }
  });
  

  const CsvMulter = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/attendance');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname);
    }
  });

  const multerUpload = multer({
    limits: { fileSize: 1024 * 1024 *5 }, // Limit file size to 1MB
    fileFilter: imageFilter, 
    storage: Multer
  });

  const CsvMulterUpload=multer({
    limits:{fileSize:1024*1024*5},
    fileFilter:csvFilter,
    storage:CsvMulter
  })


module.exports={multerUpload,CsvMulterUpload}