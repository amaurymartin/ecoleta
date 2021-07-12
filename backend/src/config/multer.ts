import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(req, file, callback) {
      callback(
        //TODO: sanitize filename
        null, `${crypto.randomBytes(6).toString('hex')}-${file.originalname}`
      )
    }
  })
}
