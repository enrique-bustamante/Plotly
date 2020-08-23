function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
})}

init();

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text("ID: "+result.id);
    PANEL.append("h6").text("ETHNICITY: "+result.ethnicity);
    PANEL.append("h6").text("GENDER: "+result.gender);
    PANEL.append("h6").text("AGE: "+result.age);
    PANEL.append("h6").text("LOCATION: "+result.location);
    PANEL.append("h6").text("BBTYPE: "+result.bbtype);
    PANEL.append("h6").text("WFREQ: "+result.wfreq);
  });
}

function buildCharts(sample){
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    var sampleList = sampleArray[0];
    var topOtuIds = sampleList.otu_ids.slice(0,10).map(item => 'OTU '+item);
    var topSampleValues = sampleList.sample_values.slice(0,10);
    var topOtuLabels = sampleList.otu_labels.slice(0,10);
    var otuIds = sampleList.otu_ids;
    var sampleValues = sampleList.sample_values;
    var otuLabels = sampleList.otu_labels;

  // Build bar chart
  var trace1 = [{
    x: topSampleValues.reverse(),
    y: topOtuIds.reverse(),
    type: "bar",
    text: topOtuLabels,
    orientation: 'h'
  }];
  console.log(otuIds)
  Plotly.newPlot("bar", trace1);

  // Build bubble chart
  var trace3 = [{
    x: otuIds,
    y: sampleValues,
    mode: 'markers',
    marker:{
      size: sampleValues,
      color: otuIds
    },
    labels: otuLabels
  }];
  layout = {
    xaxis: {title: "OTU ID"},
    };
  Plotly.newPlot("bubble", trace3, layout)
  });

  // Build gauge chart
    d3.json("samples.json").then((data) => {
        // Extract sample data
        var samples = data.metadata;
        var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = sampleArray[0];
        // Gague labels, I put them in the wrong order so calling reverse method to flip em
        gagueValues = ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', '']
        // How much hand washing result data, since we're using half a pie chart
        // need to multiply by 20 to equal 180
        var level = result.wfreq * 20;
        // Trig to calc meter point
        var degrees = (180 - level), //190 is 180 plus a 10 degree correction for needle
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);
        var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
        // Path: may have to change to create a better triangle
        var mainPath = path1,
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX, space, pathY, pathEnd);
        // Creates base for the needle
        var data = [{
                type: 'scatter',
                x: [0],
                y: [0],
                marker: {
                    size: 14,
                    color: '850000'
                },
                showlegend: false,
                name: 'wfreq',
                text: level
            },
            {   // create the divisions within the gauge
                values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9 ],
                rotation: 90,
                text: gagueValues,
                textinfo: 'text',
                textposition: 'inside',
                marker: {
                    colors: [
                        "rgba(10, 127, 45, 0.5)",
                        "rgba(30, 127, 0, .5)",
                        "rgba(70, 127, 5, .5)",
                        "rgba(80, 127, 10, .5)",
                        "rgba(120, 154, 22, .5)",
                        "rgba(170, 202, 42, .5)",
                        "rgba(202, 209, 95, .5)",
                        "rgba(225, 200, 100, .5)",
                        "rgba(232, 226, 202, .5)",
                        "white"
                    ]
                },
                hoverinfo: 'text',
                hole: .5,
                type: 'pie',
                showlegend: false,
                title: {
                    text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                    position: 'top center'
                }
            }
        ];
        var layout = {
            shapes: [{
                type: 'path',
                path: path,
                fillcolor: '850000',
                line: {
                    color: '850000'
                }
            }],
            height: 500,
            width: 500,
            xaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            },
            yaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            },
            autosize: true,
            margin: {
                l: 20,
                r: 100,
                b: 0,
                t: 0,
                pad: 4
            }
        };
        // Render the plot to the div tag with id "gauge"
        Plotly.newPlot("gauge", data, layout, {
            displayModeBar: false
        });
    })
}


function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}
optionChanged(940);
