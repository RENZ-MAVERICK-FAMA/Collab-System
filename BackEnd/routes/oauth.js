    var express = require('express');
    const { authenticateUser } = require('./authenticate');
    const router = express.Router();
    const dotenv= require('dotenv');
    const Student = require('../models/student');
    const Teacher = require('../models/teacher');
    const Principal = require('../models/principal');
    const Grade = require('../models/grades');
    dotenv.config();
    const {OAuth2Client} = require('google-auth-library');
    const CLIENT_ID="585693082003-bviabtonu1a3qa8gdp74gl7jo4fj4boc.apps.googleusercontent.com"
    const CLIENT_SECRET="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"

    async function getUserData(access_token){

      
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();

    return data;
    }
    
    router.get('/',  async function (req, res, next) {
      
    const code = req.query.code;
    console.log(code);

    try {
      const redirectUrl ='http://127.0.0.1:5000/oauth';
      const oAuth2Client = new OAuth2Client(
          CLIENT_ID,
          CLIENT_SECRET,
          redirectUrl
      );
  
      const tokenResponse = await oAuth2Client.getToken(code); 
      await oAuth2Client.setCredentials(tokenResponse.tokens);
      console.log('Tokens acquired '); 
      const user = oAuth2Client.credentials;
      console.log('credentials',user);  
        
      const ticket = await oAuth2Client.verifyIdToken({
          idToken:user.id_token,
          audience:CLIENT_ID,
      });
      console.log('ticket',ticket);
      
      const userData = await getUserData(user.access_token);
     

      const existingStudent = await Student.findOne({ firstName: userData.given_name });
      const existingTeacher = await Teacher.findOne({ firstName: userData.given_name });
      const principal = await Principal.findOne({ firstName: userData.given_name });
      if (existingStudent) {
      
        const grade = await Grade.findById(existingStudent);
        // const userType = 'student';
        // req.session.user = {
        //   userType: 'student',
          
        // };

              res
            
            .cookie('isloggedin', true, { httpOnly: true })
            .cookie('firstName', existingStudent.firstName, { httpOnly: true })
            .cookie('lastName', existingStudent.lastName, { httpOnly: true })
            .cookie('lrn', existingStudent.lrn, { httpOnly: true })
            .cookie('parentsName', existingStudent.parentsName, { httpOnly: true })
            .cookie('address', existingStudent.address, { httpOnly: true })
            .cookie('Gmail', existingStudent.Gmail, { httpOnly: true })
            .cookie('birthdate', existingStudent.birthdate, { httpOnly: true })
            .cookie('picture', userData.picture, { httpOnly: true }) 
          .cookie('_id',existingStudent._id,{httpOnly: true})
            .cookie('city',existingStudent.city,{httpOnly:true})
            // .cookie('userType', 'student', { httpOnly: true })
            console.log('Student already exists in the database:', existingStudent);

            const studentData = {
          message: 'logged in successfully' ,ticket, isloggedin:true,
          studentDetails: {
            firstName: existingStudent.firstName,
            lastName: existingStudent.lastName,
            lrn: existingStudent.lrn,
            parentsName: existingStudent.parentsName,
            address: existingStudent.address,
            Gmail: existingStudent.Gmail,
            birthdate: existingStudent.birthdate,
            picture:  userData.picture,
            _id: existingStudent._id,
            city: existingStudent.city,
            password: existingStudent.password,
            
           
          }};
          // ?type=${userType}&
      
          res.redirect(`/studentview?data=${encodeURIComponent(JSON.stringify(studentData))}`);
  // res.json({studentData});
  
  // res.redirect(`http://localhost:3000/student?userType=${userType}`)
          
      } else if (existingTeacher) {
        const userType = 'teacher';
        req.session.user = {
          userType: 'teacher',
          
        };
        res
        
        .cookie('userType', 'teacher', { httpOnly: true })
        .cookie('isloggedin', true, { httpOnly: true })
        .cookie('firstName', existingTeacher.firstName, { httpOnly: true })
        .cookie('lastName', existingTeacher.lastName, { httpOnly: true })
        .cookie('teacherID', existingTeacher.teacherID, { httpOnly: true })
        .cookie('position', existingTeacher.position, { httpOnly: true })
        .cookie('address', existingTeacher.address, { httpOnly: true })
        .cookie('contactInfo', existingTeacher.contactInfo, { httpOnly: true })
        .cookie('contactNumber', existingTeacher.contactNumber, { httpOnly: true })
        .cookie('picture', userData.picture, { httpOnly: true }) 
        .cookie('_id', existingTeacher._id,{httpOnly: true})
        .cookie('city',existingTeacher.city,{httpOnly:true})
        // .cookie('userType', 'teacher', { httpOnly: true })
        console.log('Teacher already exists in the database:', existingTeacher);
        const teacherData = {
        message: 'logged in successfully', isloggedin:true,
        teacherDetails: {
          firstName: existingTeacher.firstName,
          lastName: existingTeacher.lastName,
          teacherID: existingTeacher.teacherID,
          position: existingTeacher.position,
          address: existingTeacher.address,
          contactInfo: existingTeacher.contactInfo,
          contactNumber: existingTeacher.contactNumber,
          picture: userData.picture,
          _id: existingTeacher._id,
          city: existingTeacher.city,
          
        },userType: 'teacher'  };
        res.redirect(`/teacherview?type=${userType}&data=${encodeURIComponent(JSON.stringify(teacherData))}`);
      }
      else if (Principal) {
        const userType = 'principal';
        req.session.user = {
          userType: 'principal',
          
        };
        res
       
        .cookie('isloggedin', true, { httpOnly: true })
        .cookie('firstName', principal.firstName, { httpOnly: true })
        .cookie('lastName', principal.lastName, { httpOnly: true })
        .cookie('principalId', principal.principalId, { httpOnly: true })
        .cookie('position', principal.position, { httpOnly: true })
        .cookie('address', principal.address, { httpOnly: true })
        .cookie('contactInfo', principal.contactInfo, { httpOnly: true })
        .cookie('contactNumber', principal.contactNumber, { httpOnly: true })
        .cookie('picture',  userData.picture, { httpOnly: true })
        .cookie('city', principal.city, {httpOnly: true})
        .cookie('userType', userType, { httpOnly: true })
        console.log('Teacher already exists in the database:', principal);
        const principalData = {
        message: 'logged in successfully', isloggedin:true,
        principalDetails: {
          firstName: principal.firstName,
          lastName: principal.lastName,
          principalId: principal.principalId,
          position: principal.position,
          address: principal.address,
          contactInfo: principal.contactInfo,
          contactNumber: principal.contactNumber,
          picture:  userData.picture,
          _id: principal._id,
          city: principal.city,
       
        }};
        res.redirect(`/principalview?type=${userType}&data=${encodeURIComponent(JSON.stringify(principalData))}`);
      }
    else {
      
        console.log('User does not exist in the database. Do not save.');
        res.status(404).json({ message: 'User does not exist' });
      }
      

      
    } catch (err) {
      console.log('Error with signing in with google');
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    });




    router.get('/login', (req, res) => {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['your', 'requested', 'scopes'],
      });


      res.redirect(authUrl);
    });

    router.get('/teacher-callback', async (req, res) => {
      const code = req.query.code;

      
      const { tokens } = await OAuth2Client.getToken(code);

      
      res.redirect(`http://localhost:3000/auth-callback?userType=teacher`);
    });
    module.exports = router;
