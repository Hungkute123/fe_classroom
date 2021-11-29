import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Grade.scss'

export const Grade = () =>{
    const { codeclass }: { codeclass: string } = useParams();
    return(
        <div className="grade">
            <div className="grade__body">
                <div className="grade__header">Cấu trúc điểm</div>
                <div className="grade__content">hihi</div>
                <Link to={`/myclassroom/${codeclass}/grade`}><div className="grade__btn">Chỉnh sửa</div></Link>
            </div>
        </div>
    )
}