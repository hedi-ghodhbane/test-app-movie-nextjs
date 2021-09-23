import { IMAGE_BASE_URL } from "../config/tmdb"
const placholderImage =
  "https://www.shobgulo.com/wp-content/uploads/woocommerce-placeholder-450x450.png";


export const   loader = (props:any)=>{
     if(props.src.indexOf('https')!=-1) return props.src;
    return !props.src ? placholderImage:  IMAGE_BASE_URL+props.src; 
}