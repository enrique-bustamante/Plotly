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
  var metadata = data.metadata;
  var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
  var result = resultArray[0];
  var trace2 = [
    {
    domain: { x: [0, 1], y: [0, 1] },
    value: result.wfreq,
    title: { text: "Belly Button Washing Frequency" },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
      axis: { range: [0, 9] },
      bar: {color:"red"},
      steps: [
        { range: [0, 1], color: "white" },
        { range: [1, 2], color: "LightGray" },
        { range: [2, 3], color: "GreenYellow" },
        { range: [3, 4], color: "LightGreen" },
        { range: [4, 5], color: "YellowGreen" },
        { range: [5, 6], color: "MediumSeaGreen" },
        { range: [6, 7], color: "ForestGreen" },
        { range: [7, 8], color: "Green" },
        { range: [8, 9], color: "DarkGreen" },
      ]
    }
    
  
  }
  ];
  
 
var layout = {
    width: 600, 
    height: 500, 
    margin: { t: 0, b: 0 } 
  };
  Plotly.newPlot('gauge', trace2, layout);
});
  
}

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}
optionChanged(940);