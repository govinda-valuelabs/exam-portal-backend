import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import * as config from '../config/config.js';
import UserModel from '../model/user.model.js';