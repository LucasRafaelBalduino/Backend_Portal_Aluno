import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import work_filesConfig from './config/work_file';

import UserController from './app/controllers/UserController';

import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import TeacherControler from './app/controllers/TeacherControler';
import WorkController from './app/controllers/WorkController';
import WorkFileController from './app/controllers/workFileController';

import authMiddleware from './app/middlewares/auth';
import TurmaController from './app/controllers/TurmaController';

const routes = new Router();
const upload = multer(multerConfig);
const work_upload = multer(work_filesConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/teachers', TeacherControler.index);

routes.post('/turmas', TurmaController.store);
routes.get('/turmas', TurmaController.index);

routes.post('/works', WorkController.store);

routes.post('/files', upload.single('file'), FileController.store);
routes.post(
  '/work_files',
  work_upload.single('file'),
  WorkFileController.store
);

export default routes;
