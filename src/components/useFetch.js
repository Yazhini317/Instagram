import React,{useState,useEffect} from 'react'

function useFetch(url) {
    const [post,setPost]=useState([])
    const [error,setError]=useState(null)
    const [isLoading,setLoading]=useState(true)
useEffect(()=>{

    fetch(url)
    .then((res)=>{
  
        if(res.ok){
    
           return res.json()
        }
        else{
            throw new Error('Data not Found')
        }
    }
  )
    .then((data)=>setPost(data))
    .catch((error)=>setError(error))
    .finally(()=>setLoading(false))
  
  },[])

  return {post,setPost,error,setError,isLoading}
}



export default useFetch