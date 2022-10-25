import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import { FaEye, FaRegBookmark, FaShareAlt, FaStar } from "react-icons/fa";


const NewsSummaryCard = ({news}) => {
    const { _id, title, total_view, author, details, image_url, rating }  = news;
    return (
        <Card className='mb-5'>
            <Card.Header className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                     <Image roundedCircle src={author?.img} style={{height: "60px"}}></Image>
                    <div className='ms-2'>
                        <p className='m-0'>{author?.name}</p>
                        <p className='m-0'>{author?.published_date}</p>
                    </div>
                </div>
                
                <div className=''>
                    <FaRegBookmark className='me-2'></FaRegBookmark>
                    <FaShareAlt></FaShareAlt>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Img src={image_url} alt="" />
                <Card.Text>
                    {details.length > 250 ?
                        <p>{details.slice(0, 250)+"..."} <Link to={`/news/${_id}`}>Read More</Link></p>
                        :
                        <p>{details}</p>
                    }
                </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
                <div>
                    <FaStar className='text-warning me-2'></FaStar>
                    <span>{rating?.number}</span>
                </div>
                <div>
                    <FaEye className='me-2'></FaEye>
                    <span>{total_view}</span>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default NewsSummaryCard;