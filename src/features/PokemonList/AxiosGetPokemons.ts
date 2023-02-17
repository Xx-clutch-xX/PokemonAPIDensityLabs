import axios from "axios"

function axiosGetPokemons(url:string){
    return new Promise((resolve:any)=>{
        axios.get(url)
        .then((res)=>{
            resolve({data:res})
        }).catch((err)=>{
            resolve({data:err.response})
        })
    })
}

export default axiosGetPokemons