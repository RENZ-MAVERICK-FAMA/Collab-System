  require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react']
  });
        require("dotenv").config();     
        const GoogleStrategy = require('passport-google-oauth20').Strategy;
        const express = require("express");
        const session = require('express-session');
        const router = express.Router();
        const path = require('path');
        const cors = require("cors");
        const mongoose = require('mongoose');
        const passport = require("passport");
        const authRoute = require("./routes/auth");
        const cookieSession = require('cookie-session');
        const passportStrategy = require("./passport");
        const helmet = require('helmet');
        const cookieParser = require('cookie-parser');
        const axios = require ('axios');
        const app = express();
        const bodyParser = require('body-parser');
        const studentRoutes = require('./routes/studentRoutes');
        const ejs = require('ejs');
        const crypto = require('crypto');
        const flash = require('connect-flash');
       
        const teacherRoutes = require('./routes/teacherRoutes');
        const sectionRoutes = require('./routes/sectionRoutes');
        const gradelevelRoutes = require('./routes/gradelevelRoutes');
        const subjectRoutes= require('./routes/subjectRoutes');
        const gradeRoutes= require('./routes/gradeRoutes');
        const principalRoutes = require('./routes/principalRoutes');
       
 
        
        const server = require('http').createServer(app);
        const io = require('socket.io')(server);


        var authRouter = require('./routes/oauth');
        var reqRouter = require('./routes/request');

        const Teacher = require('./models/teacher');
        const Student = require('./models/student');
        const Section = require('./models/section');
        const Subject = require('./models/subject');
        const Principal = require('./models/principal');
        const Grade = require('./models/grades');
        const Message = require('./models/message');
      
    const gradeService = require('./services/gradeService');
      

      

    app.use(
      session({
        secret: 'dbfa6cddb8173d437ce0228dc10541a8137e7953e633f634e29ebb4993b4b887', 
        resave: false,             
        saveUninitialized: true,   
        cookie: {

          maxAge: 7 * 24 * 60 * 60 * 1000, 
          secure: false,          
          httpOnly: true,          
        },
      })
    );
   
    
  app.use(flash());
        
        module.exports = function (app) {
          app.use(
            '/oauth',
            createProxyMiddleware({
              target: 'http://localhost:5000', 
              changeOrigin: true,
            })
          );
        };
      
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser());

        mongoose.connect('mongodb+srv://gradetracker:gradetracker@gradetracker.y9b3pgt.mongodb.net/', {
        
        });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
          console.log('Connected to MongoDB');
        });
        app.use(passport.initialize());
        app.use(passport.session());
       
        
        const corsOptions = {
          origin: 'http://localhost:3000',credentials: true,
        };
        app.use(cors());
        app.use(cors({origin:true}));
        app.use(cors(corsOptions));
        app.use(express.static('C:/Users/Maverick/Desktop/collab'));


      
        

        const port = process.env.PORT || 5000;
        server.listen(port, () => console.log(`Listenting on port ${port}...`));


// API Routes
        app.use("/api", studentRoutes);
        app.use("/api", teacherRoutes);
        app.use("/api", gradeRoutes);
        app.use("/api", subjectRoutes);
        app.use("/api", sectionRoutes);
        app.use("/api", gradelevelRoutes);
        app.use("/api", principalRoutes);
        app.use('/oauth',authRouter);
        app.use('/request',reqRouter);
        app.use('/auth', authRoute  );
      app.set('view engine', 'ejs');


      // routes
      app.get('/subject', async (req, res) => {

        
        res.render('subject.ejs',{messages: req.flash()});
      });
      app.get('/allsubjects',async(req,res)=>{

      const subjects = await Subject.find();
        res.render('allsubjects',{subjects});

      });
      app.get('/allstudents',async(req,res)=>{

        const students = await Student.find();
          res.render('allstudents',{students});
  
        });
      app.get('/gradelevel', async (req, res) => {

        const sections = await Section.find();
        console.log(sections);
        res.render('gradelevel.ejs', { sections});
      });
      app.get('/sections', async (req, res) => {

        const students = await Student.find();
        const teachers = await Teacher.find();
        
        res.render('section.ejs', { students,teachers,messages: req.flash()});
      });
    
      app.get('/allsections', async (req, res) => {
        try {
        
          const sections = await Section.find();
      
         
          res.render('allsections', { sections }); 
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      });

      app.get('/grade', async (req, res) => {

        const students = await Student.find().populate('subject');
        const teacher = await Teacher.find();
        const subjects = await Subject.find();
    

        res.render('grade.ejs', { students,teacher,subjects});
      });

      app.get('/allteachers', async (req, res) => {
        try {
          const teachers = await Teacher.find();
          res.render('allteachers', { teachers });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      });
      
      app.get('/register', async (req, res) => {

        const subject = await Subject.find();
        const sections = await Section.find();
        
        res.render('register.ejs', { subject,sections,messages: req.flash()});
      });
      app.get('/teacher', async (req, res) => {

      
        
        res.render('teacher.ejs',{messages: req.flash()});
      });
      app.get('/principal', async (req, res) => {


      
        
        res.render('principal.ejs',{messages: req.flash()});
      });
      const authenticateUser = (req, res, next) => {
        if (!req.session || !req.session.userType) {
         
          if (req.url === '/principalview') {
            if (req.cookies.isloggedin) {
            
              res.redirect('/principalview');
            } else {
             
              res.redirect('http://localhost:3000'); 
            }
          } else {
           
            next();
          }
        } else {
          
          next();
        }
      };


      // Homepages Route
        app.get('/studentview', async (req, res) => {
          try {

            // const userType = req.session.user.userType;
            const data = req.query.data;
            const studentData = JSON.parse(decodeURIComponent(data));
            
            const quote = ejs.renderFile('./views/quote.ejs');
            const email = studentData.studentDetails.Gmail;
            const password = studentData.studentDetails.password;
            const city = studentData.studentDetails.city;

        let params = new URLSearchParams({
    access_key:'4e19e0d1757984a7fc0437a010ef5de9',
    query: city,
    units: 'f'

        });
        const weatherResponse = await fetch(`http://api.weatherstack.com/current?${params}`);
        const weatherData = await weatherResponse.json();
          
            const grade = await Grade.find({ student: studentData.studentDetails._id }).populate('subject');
          
        
            res.render('studentview',{ studentData, grade ,weather:weatherData.current,location: weatherData.location,quote }); 
      
        
          } catch (error) {
            console.error('Error parsing student data:', error);
            res.status(500).send('Internal Server Error');
          }
        });


        
    app.get('/teacherview', async (req, res) => {
      try {
        const userType = req.session.user.userType;
        const data = req.query.data;
        const teacherData = JSON.parse(decodeURIComponent(data));
        const city = teacherData.teacherDetails.city;
      
        let params = new URLSearchParams({
          access_key:'4e19e0d1757984a7fc0437a010ef5de9',
          query: city,
          units: 'f'
          
              });
              //  const weatherResponse = await fetch(`http://api.weatherstack.com/current?${params}`);
              //  const weatherData = await weatherResponse.json();
          
        const section = await Section.find({ teacher: teacherData.teacherDetails._id })
          .populate({
            path: 'students',
            populate: { path: 'subject' }
          });

          if (Array.isArray(section) && section.length > 0 && section[0].students) {
          const studentIds = section[0].students.map(student => student._id.toString());
            const existingGrades = await Grade.find({ student: { $in: studentIds } }).populate('subject');
        console.log(existingGrades);
        // res.json({ teacherData, section, existingGrades,weather:weatherData.current,location: weatherData.location});
        res.render('teacherview',{ teacherData, section, existingGrades});
          } else {
          
            console.log('No students or sections found.');
            // res.json( { teacherData,section,userType,weather:weatherData.current,location: weatherData.location});
            res.render('teacherview',{ teacherData, section});
          }

      
      } catch (error) {
        console.error('Error parsing student data:', error);
        res.status(500).send('Internal Server Error');
      }
    });


    app.get('/principalview', authenticateUser, async (req, res) => {
      try {
        console.log(req.session);
        console.log(req.cookies);
        // const userType = req.session.user.userType;
        
        const data = req.query.data;
        const principalData = JSON.parse(decodeURIComponent(data));
        const city = principalData.principalDetails.city;
        
          
        let params = new URLSearchParams({
          access_key:'4e19e0d1757984a7fc0437a010ef5de9',
          query: city,
          units: 'f'
          
              });
              //  const weatherResponse = await fetch(`http://api.weatherstack.com/current?${params}`);
              //  const weatherData = await weatherResponse.json();
      
        const teachers = await Teacher.find();
      
        const sections = await Section.find().populate({
          path: 'students',
          populate: { path: 'subject' }
        });

      

      
        const studentIds = sections.reduce((ids, section) => {
          if (section.students) {
            ids.push(...section.students.map(student => student._id.toString()));
          }
          return ids;
        }, []);

        const existingGrades = await Grade.find({ student: { $in: studentIds } }).populate('subject');
     

        res.render('principalview' ,{ principalData, teachers, sections, existingGrades /*,weather:weatherData.current,location: weatherData.location*/ });
      

      } catch (error) {
        console.error('Error fetching data for principal view:', error);
        res.status(500).send('Internal Server Error');
      }
    });

      

// logout Routes
      
      app.post('/student-logout', (req, res) => {
      
              res.clearCookie('userType');
              res.clearCookie('isloggedin')
              res.clearCookie('firstName')
              res.clearCookie('lastName')
              res.clearCookie('lrn')
              res.clearCookie('parentsName')
              res.clearCookie('address')
              res.clearCookie('Gmail')
              res.clearCookie('birthdate')
              res.clearCookie('picture') 
              res.clearCookie('subject')
              res.clearCookie('_id') 
              req.session.destroy((err) => {
                if (err) {
                    console.error('Error destroying session:', err);
                } 
            });
    
              
      });
      app.post('/teacher-logout', (req, res) => {
      
        res.clearCookie('userType');
        res.clearCookie('isloggedin')
        res.clearCookie('firstName')
        res.clearCookie('lastName')
        res.clearCookie('teacherID')
        res.clearCookie('position')
        res.clearCookie('address')
        res.clearCookie('contactInfo')
        res.clearCookie('contactNumber')
        res.clearCookie('picture') 
        res.clearCookie('_id') 
      
        req.session.destroy((err) => {
          if (err) {
              console.error('Error destroying session:', err);
          } 
      });

        
    });

    app.post('/principal-logout', (req, res) => {
      
      res.clearCookie('userType');
      res.clearCookie('isloggedin')
      res.clearCookie('firstName')
      res.clearCookie('lastName')
      res.clearCookie('principalId')
      res.clearCookie('position')
      res.clearCookie('address')
      res.clearCookie('contactInfo')
      res.clearCookie('contactNumber')
      res.clearCookie('picture') 
      res.clearCookie('_id') 
      req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        } 
    });
         
    });

    // Updating grade by objects
    
    app.post('/updateGrades', async (req, res) => {
      try {
        const { grades } = req.body;

  if (!grades || Object.keys(grades).length === 0) {
    return res.status(400).json({ success: false, message: 'No grades provided' });
  }

  const studentId = Object.keys(grades)[0];

  if (!studentId) {
    return res.status(400).json({ success: false, message: 'No student ID provided' });
  }

  const subjectName = Object.keys(grades[studentId])[0];

  if (!subjectName) {
    return res.status(400).json({ success: false, message: 'No subject name provided' });
  }
        const subject = await Subject.findOne({ subjectname: subjectName });

        if (!subject) {
          return res.status(400).json({ success: false, message: 'Subject not found' });
        }

      
        const existingGrade = await Grade.findOne({
          student: studentId,
          subject: subject._id
        });

        
        const {
          quarter1,
          quarter2,
          quarter3,
          quarter4
        } = grades[studentId][subjectName];

        const newGrade = {
          student: studentId,
          subject: subject._id,
          quarter1,
          quarter2,
          quarter3,
          quarter4
        };

        let savedGrade;

        if (existingGrade) {
          
          savedGrade = await Grade.findOneAndUpdate(
            { _id: existingGrade._id },
            { $set: newGrade },
            { new: true } 
          );
        } else {
          
          const savedGrade = await gradeService.createGrade(newGrade);
        }

        console.log('Grades updated successfully:', savedGrade);
        res.json({ success: true });
      } catch (error) {
        console.error('Error updating grades:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    });


// chat routes
    app.get('/student-send-message', async (req, res) => {
      try {
        const studentId = req.query.studentId;
    
        
        const student = await Student.findById(studentId);
    
        if (!student) {
        
          return res.status(404).send('Student not found');
        }
    
        res.render('student-chat.ejs', { student });
      } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(500).send('Internal Server Error');
      }
    });
    app.get('/teacher-send-message', async (req, res) => {
      try {
        const teacherId = req.query.teacherId;
    
        
        const teacher = await Teacher.findById(teacherId);
    
        if (!teacher) {
        
          return res.status(404).send('teacher not found');
        }
    
        res.render('teacher-chat.ejs', { teacher });
      } catch (error) {
        console.error('Error fetching teacher details:', error);
        res.status(500).send('Internal Server Error');
      }
    });


    app.get('/principal-send-message', async (req, res) => {
      try {
        const principalId = req.query.principalId;
    
        
        const principal = await Principal.findById(principalId);
    
        if (!principal) {
        
          return res.status(404).send('principal not found');
        }
    
        res.render('principal-chat.ejs', { principal });
      } catch (error) {
        console.error('Error fetching principal details:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    app.get('/dictionary',(req,res)=>{


res.render('dictionary');
    });

    
    io.on('connection', (socket) => {
      console.log('A user connected');
    
      Message.find().exec()
        .then((messages) => {
          socket.emit('chat history', messages);
        })
        .catch((err) => {
          console.error('Error retrieving chat history:', err);
        });
    
      socket.on('chat', (data) => {
        console.log('Received chat data:', data);
        const newMessage = new Message({ user: data.username, message: data.text });
        newMessage.save()
          .then(() => {
            // Use socket.broadcast.emit to send the message to all other users
            socket.broadcast.emit('chat', data);
          })
          .catch((err) => {
            console.error('Error saving chat message:', err);
          });
      });
    
      socket.on('newuser', (username) => {
        socket.broadcast.emit('update', `${username} joined the conversation`);
      });
    
      socket.on('exituser', (username) => {
        socket.broadcast.emit('update', `${username} left the conversation`);
      });
    
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });