const express = require('express')
const app = express()
require('./dbConnection/db')
require('dotenv').config()
const multer  = require('multer')
const upload = multer({ dest: 'uploadsFile/' })

const auth = require('./middlewares/auth')
const userController = require('./controllers/user')
const orderController = require('./controllers/orders')
const checklistFormController = require('./controllers/checklist')


const port = process.env.PORT

app.use(express.json())

app.post('/userLogin', userController.userLogin)
app.post('/registerUser',auth, userController.registerUser)
app.post('/updateInspectionManager',auth, userController.updateInspectionManager)


app.post('/createOrder',auth, orderController.createOrder)
app.post('/statusOfOrder',auth, orderController.statusOfOrder)
app.post('/updateStatusOfOrder',auth, orderController.updateStatusOfOrder)
app.post('/linkChecklistFormInOrder',auth, orderController.linkChecklistFormInOrder)

app.post('/createChecklistForm',auth, checklistFormController.createChecklistForm)
app.post('/fillChecklistForm',auth, checklistFormController.fillChecklistForm)
app.post('/fileUploadInChecklistForm',auth,upload.single("productFile"), checklistFormController.fileUploadInChecklistForm)



app.listen(port,()=>{
    console.log('server created successfully',port)
})
