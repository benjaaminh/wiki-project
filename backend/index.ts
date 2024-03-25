import app from './app'; // the actual Express application
import {PORT} from './utils/config';
import {info} from './utils/logger';


app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});