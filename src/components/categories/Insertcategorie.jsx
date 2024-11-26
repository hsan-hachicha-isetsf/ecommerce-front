import axios from 'axios'

import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
import { Link,useNavigate } from 'react-router-dom'


const Insertcategorie = () => {
  const[categorie,setCategorie]=useState({})
  const[files,setFiles]=useState([])
const navigate=useNavigate()

  const handleSave=async(e)=>{
    e.preventDefault()
    await axios.post("http://localhost:3001/api/categories",categorie)
    .then(res=>{
      navigate("/categories")
    })
  }

  const server=()=>{
    process: (fieldName, file, metadata, load, error, progress, abort) => {
      // Simule un "upload" et place le fichier dans le dossier public/uploads
      const reader = new FileReader();
      reader.onload = () => {
        const uploadedFiles = files.concat({ file, src: reader.result });
        setFiles(uploadedFiles);
        load(file.name); // Appel pour indiquer que le fichier est chargé
      };
      reader.onerror = error;
      reader.readAsDataURL(file); // Simule l'upload en lecture locale

      // Progression simulée
      progress(true, 100, 100);

      // Fonction d'annulation (inutile ici)
      return {
        abort: () => {
          abort();
        },
      };
    }
  }
 const  handleInit=() =>{
    console.log('FilePond instance has initialised');
}
  return (
    <div>
      <center><h1>Insertion catégorie</h1></center>
      
      <Form>
      <Form.Group className="mb-3">
        <Form.Label>Nom catégorie</Form.Label>
        <Form.Control type="text" placeholder="Nom catégorie" 
        value={categorie.nomcategorie}
        
        onChange={(e)=>setCategorie({...categorie,nomcategorie:e.target.value})}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image catégorie</Form.Label>
        <Form.Control type="text" placeholder="Image catégorie" 
        value={categorie.imagecategorie}
        
        onChange={(e)=>setCategorie({...categorie,imagecategorie:e.target.value})}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image catégorie</Form.Label>
        <FilePond
                   files={files}
                   acceptedFileTypes="image/*"
                   onupdatefiles={setFiles}
                   allowMultiple={true}
                   server={serverOptions()}
                   name="file"
                      
          />

      </Form.Group>
      <div>
        <button className='btn btn-success' onClick={(e)=>handleSave(e)}><i class="fa-regular fa-floppy-disk" ></i> Enregistrer</button>
        &nbsp;
        <Link to="/categories"><button className='btn btn-danger'><i class="fa-solid fa-right-from-bracket"></i> Annuler</button></Link>
      </div>
    </Form>
    </div>
  )
}

export default Insertcategorie
