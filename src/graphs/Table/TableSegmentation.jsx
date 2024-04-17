import React, {useState} from 'react'
import Plot from 'react-plotly.js'
import InfoTool from '../../components/InfoTool/InfoTool'
import './TableSegmentation.scss'

import { TbEyeFilled, TbEyeOff } from 'react-icons/tb'

function getMeanValues(subjects, method, scalar){
    let value = 0

    subjects.map((subject) => {
        return(
            value += subject[method][0][scalar]
        )
    })

    value /= (subjects.length);
    return value.toFixed(6)
}

function TableSegmentation(props) {

    let [view, setView] = useState("hide")
    let [size, setSize] = useState(130)
    let [iconEye, setIconEye] = useState(<TbEyeFilled />)

    function changeShowSegmentation(type) {
        let value = document.querySelector("#showView2D").value
    }

    function teste(){
        if(view == "hide"){
            setView("show")
            setIconEye(<TbEyeOff />)
        } else{
            setView("hide")
            setIconEye(<TbEyeFilled />)
        }
    }

    let headers = []

    let subjects = props.data
    if(view === "show"){
        headers = ["Method", "FA", "FA StdDev","MD", "MD StdDev", "RD", "RD StdDev", "AD", "AD StdDev"]
    } else if(view === "hide"){
        headers = ["Method", "FA", "MD", "RD", "AD"]
    }

    let cols = [["ROQS", "CNN-Based"]]

    for(let i = 1; i !== headers.length; i++){
        let v1 = getMeanValues(subjects, "roqs_based", headers[i])
        let v2 = getMeanValues(subjects, "cnn_based", headers[i])
        cols.push([v1, v2])
    }

    /* Ajustes da tabela */
    
    let layout = {width: "50%", height: size, margin: {t: 10, b: 0, l: 10, r: 10}, paper_bgcolor: props.bg_color}

    if(props.type === "2D"){

        let data = [{
            type: "table",
            header: {
                values: headers,
                align: ["center"],
                line: {width: 1, color: 'black'},
                fill: {color: "grey"},
                font: {family: "Arial", size: 14, color: "white"}
            },
            cells: {
                values: cols,
                height: 30,
                align: ["center", "center"],
                line: {width: 1, color: 'black'},
                font: {family: "Arial", size: 12, color: "black"}    
            }
        }]

        return(

            <div className='table-field'>
                    
                <div className='table-row'>
                    <span className={`table-title ${props.color}`}>Segmentation Data <InfoTool text="Comparison of the mean values ​​obtained by segmentation in each method."/></span>
                    <button className='btn-export'>Export</button>
                </div>
    
                <Plot data={data} layout={layout}/>
            
                <div className='options-row'>  
            
                    <div className='select-group'>
                        <label className={props.color}>Std. Dev: </label>

                        <button onClick={teste} className="btn-icon">{iconEye}</button>

                    </div>
            
                </div>
    
            </div>
        )
    }

}

export default TableSegmentation