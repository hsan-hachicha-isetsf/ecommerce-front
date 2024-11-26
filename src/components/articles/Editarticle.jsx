
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { Link,useNavigate,useParams } from 'react-router-dom'


const Editarticle = () => {
const[article,setArticle]=useState({})
const[scategories,setScategories]=useState([])
const navigate=useNavigate()
const{id}=useParams()

const loadscategories=async()=>{
  try {
    const res=await axios.get("http://localhost:3001/api/scategories")
    setScategories(res.data)
  } catch (error) {
    console.log(error)
  }
}
const loadarticle=async(id)=>{
  try {
    const res=await axios.get(`http://localhost:3001/api/articles/${id}`)
    setArticle(res.data)
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  loadscategories()
  loadarticle(id)
},[])
const handleUpdate=async(e)=>{
  try {
    e.preventDefault()
    await axios.put(`http://localhost:3001/api/articles/${id}`,article)
    .then(res=>{
      navigate("/articles")
    })


  } catch (error) {
    console.log(error)
  }
}
  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

      <h1>Insertion article</h1>
      <Form>
      <Row className='mb-2'>
      <Form.Group as={Col} mb="6" >
        <Form.Label>Référence</Form.Label>
        <Form.Control type="text" placeholder="Référence" 
        value={article.reference}
        onChange={(e)=>setArticle({...article,reference:e.target.value})}
        />
      </Form.Group>
      <Form.Group as={Col} mb="6" >
        <Form.Label>Désignation</Form.Label>
        <Form.Control type="text" placeholder="Désignation" 
        value={article.designation}
        onChange={(e)=>setArticle({...article,designation:e.target.value})}
      
        />
      </Form.Group>
      </Row>
      <Row className='mb-2'>
      <Form.Group as={Col} mb="6" >
        <Form.Label>Marque</Form.Label>
        <Form.Control type="text" placeholder="Marque" 
        value={article.marque}
        onChange={(e)=>setArticle({...article,marque:e.target.value})}
      
        />
      </Form.Group>
      <Form.Group as={Col} mb="6" >
        <Form.Label>Stock</Form.Label>
        <Form.Control type="text" placeholder="Stock" 
        value={article.qtestock}
        onChange={(e)=>setArticle({...article,qtestock:e.target.value})}
      
        />
      </Form.Group>
      </Row>
      <Row className='mb-2'>
      <Form.Group as={Col} mb="6" >
        <Form.Label>Prix</Form.Label>
        <Form.Control type="text" placeholder="Prix" 
        value={article.prix}
        onChange={(e)=>setArticle({...article,prix:e.target.value})}
      
        />
      </Form.Group>

      <Form.Group as={Col} mb="6" >
        <Form.Label>Image</Form.Label>
        <Form.Control type="text" placeholder="Image" 
        value={article.imageart}
        onChange={(e)=>setArticle({...article,imageart:e.target.value})}
      
        />
      </Form.Group>
      </Row>
      <Row className='mb-2'>
      <Form.Group as={Col} mb="6" >
        <Form.Label>Sous Catégorie</Form.Label>
        <Form.Control type="select"
        placeholder="S/Catégorie" 
        as="select" 
        value={article.scategorieID}
        onChange={(e)=>setArticle({...article,scategorieID:e.target.value})}
          
        >
             {
          scategories.map((scat,index)=>
          
          <option value={scat._id}>{scat.nomscategorie}</option>
          )
        }
          </Form.Control>
      </Form.Group>
    </Row>
      <button className='btn btn-success btn-sm' onClick={(e)=>handleUpdate(e)}>Enregistrer</button>
      &nbsp;
      <Link to="/articles"> <button className='btn btn-danger btn-sm'>Annuler</button></Link>
    </Form>
    </div>
  )
}

export default Editarticle
