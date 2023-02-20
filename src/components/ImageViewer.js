import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ListGroup, ListGroupItem, Button, Input } from 'reactstrap'


export default function ImageViewer(props) {

  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState("")
  const [posted, setPosted] = useState(false)


  const params = useParams()
  console.log(params)

  useEffect(() => {
    // Update the document title using the browser API

    // FETCH PAKA AWIAT TEGDIDINI
    async function getImage() {
      var response = await fetch(`http://127.0.0.1:8000/imagesubmissions/image-detail/${params['id']}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }

      })

      if (response.status === 500) {
        alert("server error")
      }
      if (response.status === 200 || response.status === 201) {
        var data = await response.json()
        setImageUrl(data.image_file)
        setDescription(data.description)

      }
      else {
        // AWIT TEGDIDIni
        var data = await response.json()
        alert(JSON.stringify(data))
      }
    }
    

  async function getReviews() {
    var response = await fetch(`http://127.0.0.1:8000/feedback/${params['id']}/myfeedbacks/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }

    })

    if (response.status === 500) {
      alert("server error")
    }
    if (response.status === 200 || response.status === 201) {
      var data = await response.json()
      setReviews(data)
      setPosted(false)
    }
    else {
      // AWIT TEGDIDIni
      var data = await response.json()
      alert(JSON.stringify(data))
      }
    }
    getReviews()
    getImage()

 

  }, [posted]);

  console.log(newReview)
  const token=localStorage.getItem('token')

  async function handlePost() {
    var addReviewPayload = {
        text:newReview ,

        image: params['id'] ,
    }
    var response = await fetch('http://127.0.0.1:8000/feedback/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
        body: JSON.stringify(addReviewPayload)
    })

    if (response.status === 500) {
        alert("server error")
    }
    if (response.status === 200 || response.status === 201) {
        var data = await response.json()
        console.log("success", data)
        setPosted(true)
        setNewReview("")
     

        // setdata(data)
    }
    else {
        var data = await response.json()
        alert(JSON.stringify(data))
    }

}


return (
  <div className='container'>
    <h3>{description}</h3>

    <div className='row'>
      <div className='col-md-6'>
        <img
          style={{ height: 500, width: 500 }}
          alt="Sample"
          src={`http://127.0.0.1:8000/${imageUrl}`}
        />

      </div>
      <div className='col-md-6'>
        <ListGroup>
        {reviews.map((review) =>{
          return <ListGroupItem>{review.text}</ListGroupItem>
        }) }
          
        </ListGroup>
        <div className='row'>
          <div className='col-md-10'>
            <Input placeholder='Add Your Review' type="text" value={newReview} onChange={(e) =>setNewReview(e.target.value)} ></Input>
          </div>
          <div className='col-md-2'>
        <Button onClick={handlePost}>post</Button>
        </div>

        </div>
        
        

        

      </div>

    </div>
  </div>
)
}
