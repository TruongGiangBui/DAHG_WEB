const homeRouter = require('./home');
const searchRouter = require('./search');
const filmRouter = require('./films');
const apiRouter = require('./apis')
const userRouter = require('./user')
const loginRouter = require('./login')
const signupRouter = require('./signup')
const historyRouter = require('./history')
const managefilmRouter=require('./managefilm')
const updatefilmRouter = require('./updatefilm')
const uploadfilmRouter = require('./uploadfilm')
const manageaccountRouter=require('./manageaccount')
function route(app) {
  app.use('/user/apis', userRouter)
  app.use('/user', loginRouter)
  app.use('/user', signupRouter)
  app.use('/user', historyRouter)
  app.use('/user', managefilmRouter)
  app.use('/user', uploadfilmRouter)
  app.use('/user', updatefilmRouter)
  app.use('/user',manageaccountRouter)
  app.use('/apis',apiRouter)
  app.use('/films', filmRouter);
  app.use('/', searchRouter);
  app.use('/', homeRouter);
}
module.exports = route;
