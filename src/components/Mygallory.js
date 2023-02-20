import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Card, CardBody, CardTitle, Button, Input } from 'reactstrap';


export default function Mygallory() {

    const [data, setData] = useState([]);
    const [uploaded, setUploaded] = useState(false)
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("")

    console.log(file)

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API

        // FETCH PAKA AWIAT TEGDIDINI
        async function GetUserSpecificImage() {
            var response = await fetch('http://127.0.0.1:8000/imagesubmissions/mygallory', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token')
                }

            })

            if (response.status === 500) {
                alert("server error")
            }
            if (response.status === 200 || response.status === 201) {
                // AWAIT TEGDINI
                var data = await response.json()
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
        GetUserSpecificImage()
        setUploaded(false)

    }, [uploaded]);

    function handleFileChange(e) {
        console.log(e.target.files);
        setFile((e.target.files[0]));


    }
    
    async function handleUpload() {

        var uploadImagePayload = new FormData()
        uploadImagePayload.append('image_file', file)
        uploadImagePayload.append('description', description)
        
        var response = await fetch('http://127.0.0.1:8000/imagesubmissions/upload/', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem("token")
            },
            body: uploadImagePayload
        })
    
        if (response.status === 500) {
            alert("server error")
        }
        if (response.status === 200 || response.status === 201) {
            var data = await response.json()
            console.log("success", data)
            setUploaded(true)
            setFile(null)
            setDescription("")
         
    
            // setdata(data)
        }
        else {
            var data = await response.json()
            alert(JSON.stringify(data))
        }
    
    }

    return (

        <div className='row'>{data.map((item, index) => {
            return <Card key={index}
                style={{
                    width: '18rem',
                    cursor: 'pointer' 
                }}
                onClick={() => navigate(`/image-viewer/${item.id}`)}
            >
                <img
                    alt="Sample"
                    src={`http://127.0.0.1:8000/${item.image_file}`}
                />
                <CardBody>
                    <CardTitle tag="h5">
                        {item.description}
                    </CardTitle>
                </CardBody>
            </Card>
            // <img src=></img>
        })}
            {/* <div className='row'>
        <div className='col-md-8'>
        <h2>Add Image:</h2>
            <input type="file" onChange={handleFileChange} />
        </div>
        <div className='col-md-4'>
        <Button>Upload</Button>
        </div> */}
            <Card
                style={{
                    width: '18rem'
                }}

            >
                <CardBody>
                    <CardTitle tag="h5">
                        Upload Image
                    </CardTitle>
                    <input type="file" onChange={handleFileChange} />
                    <Input type='text' value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)}></Input>
                    <Button  style={{ width: "100%" }}
                    onClick={handleUpload}>
                        upload
                    </Button>
                </CardBody>
            </Card>
        </div>

    
  )

}