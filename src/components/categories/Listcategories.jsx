import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Listcategories = () => {
  const[categories,setCategories]=useState([])

  const fetchcategories=async()=>{
    const res=await axios.get("http://localhost:3001/api/categories")
    setCategories(res.data)
    console.log(res.data)
    
  }
useEffect(()=>{
  fetchcategories()
},[])
  const handleDelete=async(id)=>{
    if(window.confirm("etes vous sure de vouloir supprimer")){
    await axios.delete(`http://localhost:3001/api/categories/${id}`)
    .then(res=>{
      fetchcategories()
    })
  }
  }
  return (
    <div>
      <Link to="/categories/add"> <button className='btn btn-success btn-sm'><i class="fa-solid fa-square-plus"></i> Ajouter</button></Link>
      <h1>Liste des catégories</h1>
      
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Nom catégorie</th>
            <th>Image catégorie</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            categories.map((cat,index)=>
            <tr key={index}>
              <td>{cat.nomcategorie}</td>
              <td><img src={cat.imagecategorie} height={80} width={80}/></td>
              <td><button className='btn btn-warning btn-sm'><i class="fa-solid fa-pen-to-square"></i> Update</button></td>
              <td><button className='btn btn-danger btn-sm' onClick={()=>handleDelete(cat._id)}><i class="fa-solid fa-trash"></i> Delete</button></td>

            </tr>
            
            
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Listcategories
