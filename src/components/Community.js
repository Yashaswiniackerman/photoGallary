import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"
import { Card, CardBody, CardTitle, CardText, CardSubtitle, Button} from 'reactstrap';


export default function Community() {

    const [data, setData] = useState([]);
    const navigate = useNavigate()

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API

    // FETCH PAKA AWIAT TEGDIDINI
    async function getAllImages(){
        var response = await fetch('http://127.0.0.1:8000/imagesubmissions/getall/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            
        })

        if (response.status === 500) {
            alert("server error")
        }
        if (response.status === 200 || response.status === 201) {
            // AWAIT TEGDINI
            var data =await response.json()
            // console.log(data)
            data.map((item) => console.log(item.description))
            setData(data)
        }
        else {
            // AWIT TEGDIDIni
            var data = await response.json()
            alert(JSON.stringify(data))
        }
    }
    getAllImages()
    
  },[]);

  return (

    <div className='row'>{data.map((item, index) =>{
    return <Card key={index}
    style={{
      width: '18rem',
      cursor: 'pointer' 
    }}
    onClick={() => navigate(`/image-viewer/${item.id}`)}
  >
    <img
      alt="Sample"
      src={item.image_file}
    />
    <CardBody>
      <CardTitle tag="h5">
        {item.description}
      </CardTitle>
      
    </CardBody>
  </Card>
    // <img src=></img>
    })}</div>
  )
}