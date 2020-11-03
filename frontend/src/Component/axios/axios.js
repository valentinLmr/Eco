import axios from 'axios'
import data from '../../data';


        const fetchData = async () => {
           const data = await axios.get('/api/products');
        }

        export default data
        




