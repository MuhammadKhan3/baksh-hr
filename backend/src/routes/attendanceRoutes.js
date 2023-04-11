const express = require ('express');
const router = express.Router();
const 
{   getAttendance,
    setAttendance,
    updateAttendance,
    deleteAttendnace
} = require('../controllers/attendance.controller');


//Attendace routes
router.route('/').get(getAttendance).post(setAttendance);
router.route('/:id').put(updateAttendance).delete(deleteAttendnace);


module.exports = router;