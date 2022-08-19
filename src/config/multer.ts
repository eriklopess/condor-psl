import { randomBytes } from 'crypto';
import { diskStorage, Options } from 'multer';
import path from 'path';

export const multerConfig: Options = {
  dest: path.resolve(__dirname, '..', '..', 'uploads'),
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      randomBytes(16, (err, hash) => {
        if (err) cb(err, file.filename);
        const filename = `${hash.toString('hex')}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`;
        cb(null, filename);
      });
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const formats = [
      'image/jpeg',
      'image/jpg',
      'image/png'
    ];
    if (formats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  }

};
