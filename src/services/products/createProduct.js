import axios from 'axios'; 
export const createProduct = ({name,price}) =>{
   return axios
    .post('http://localhost:1234/products/create',{name,price})
    .then(response =>{
      console.log(response);
      const {data} = response;
      return data;
    });
}