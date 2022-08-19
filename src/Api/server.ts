import CustomRouter from '../Router';
import App from './App';

import CustomerController from '../Controllers/Customer';
import { Customer } from '../Interfaces/CustomerInterface';

const server = new App();

const customerController = new CustomerController();

const customerRouter = new CustomRouter<Customer>();

customerRouter.addRoute(customerController);

server.addRouter(customerRouter.router);

export default server;
