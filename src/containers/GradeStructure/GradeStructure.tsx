import React from 'react';
import { GradeForm } from '../../components';
import './GradeStructure.scss'
export const GradeStructure = () =>{
    return(
        <div className="grade-structure">
            <div className="grade-structure__header">
                <div className="grade-structure__header__title">Cấu trúc điểm</div>
                <h2>Nhập cấu trúc điểm của lớp học của bạn</h2>
            </div>
            <GradeForm></GradeForm>
        </div>
    )
}