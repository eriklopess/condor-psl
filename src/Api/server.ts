import multer from 'multer';

import CustomRouter from '../Router';
import App from './App';
import { multerConfig } from '../config/multer';

import CustomerController from '../Controllers/Customer';
import BannerController from '../Controllers/Banner';
import { Customer } from '../Interfaces/CustomerInterface';
import { Banner } from './../Interfaces/BannerInterface';

const server = new App();

const customerController = new CustomerController();
const bannerController = new BannerController();

const customerRouter = new CustomRouter<Customer>();
const bannerRouter = new CustomRouter<Banner>();

customerRouter.addRoute(customerController);
bannerRouter.addRoute(bannerController);
bannerRouter.router.post('/banners/upload/:id', multer(multerConfig).single('file'), bannerController.uploadImage);
bannerRouter.router.post('/banners/disable/:id', bannerController.disableStatus);

server.addRouter(customerRouter.router);
server.addRouter(bannerRouter.router);

export default server;
