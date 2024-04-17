import React from 'react'
import Plot from 'react-plotly.js'

function Boxplot(props) {

    let y0 = props.roqs
    let y1 = props.cnn

    let data = [{
            y: y0,
            type: "box",
            name: "ROQS",
            marker: {color: "#636EFA"}
        }, {
            y: y1,
            type: "box",
            name: "CNN",
            marker: {color: "#E65C40"}
        },
    ]
    
    let layout = {
                title: props.title, height: 420, width: props.width, margin: {t: 40, l: 50, r: 10}, legend: { orientation: "h" },
                plot_bgcolor: '#E5ECF6',
                yaxis: {
                    gridcolor: 'rgb(255, 255, 255)',
                    zerolinecolor: 'rgb(255, 255, 255)',
                }
                }

    return (
        <Plot data={data} layout={layout}/>
    )
}

export default Boxplot