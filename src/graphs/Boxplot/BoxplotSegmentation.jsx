import React from 'react'
import Boxplot from './Boxplot'
import './BoxplotSegmentation.scss'

function getScalarValues(data, method, scalar){
    let values = []
    data.map((subject) => {
        let v = parseFloat(subject[method][0][scalar].toFixed(6))
        values.push(v)        
    })

    return values
}

function BoxplotSegmentation(props) {

    return (
        <div className='boxplot-container'>
            <span className='boxplot-title'>Segmentation Boxplots</span>

            <div className='boxplot-row'>
                <Boxplot title="FA" roqs={getScalarValues(props.data, "roqs_based", "FA")} cnn={getScalarValues(props.data, "cnn_based", "FA")} width="375"/>
                <Boxplot title="MD" roqs={getScalarValues(props.data, "roqs_based", "MD")} cnn={getScalarValues(props.data, "cnn_based", "MD")} width="375"/>
                <Boxplot title="RD" roqs={getScalarValues(props.data, "roqs_based", "RD")} cnn={getScalarValues(props.data, "cnn_based", "RD")} width="375"/>
                <Boxplot title="AD" roqs={getScalarValues(props.data, "roqs_based", "AD")} cnn={getScalarValues(props.data, "cnn_based", "AD")} width="375"/>

            </div>

        </div>
    )
}

export default BoxplotSegmentation