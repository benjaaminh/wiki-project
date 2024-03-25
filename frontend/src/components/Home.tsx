import { useState } from 'react';

import { User } from '../types';

interface Props {
    user: User
}
const Home = ({user} : Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


 return(
    <div>helo</div>
 );


};
export default Home;
