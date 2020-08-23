# Plotly

### Purpose

The purpose of this project was to create a website that displayed charts that
changed based on the input selected. The site will display the bacteria found
in each participant's belly button. These bacteria are being studied as a
means to create synthetic meat.


### Methods

There were a few main elements utilized to create the site: The dropdown menu
to select the subject ID, the barchart showing the top 10 bacteria, the gauge
displaying the washing frequency, and the bubble chart showing the size and
counts of all the bacteria.

The dropdown was created using HTML and Javascript. The selector itself was
created in HTML to run a Javascript function upon changing the dropdown menu. The names from
samples.json were used to fill the dropdown box as options.

The barchart was created using HTML by setting up a "bar" div section, then
running the formulas in Javascript, then plotting the chart with Plotly. The
other two charts were created utilizing the same technologies.

The metadata tables utilized HTML and Javascript. An id was set for a div
section in HTML named "sample-metadata". The information was parsed from the
samples.json file depending on the input selected in the drop down.

### Future Considerations

I would like to see analysis between bacteria types and washing frequency. I
would like to see if there may be a correlation and maybe add an additional
scatter or bubble chart to see the relationship. I'd like to see if there are
a connection between Ethnicity, as well as other factors,  and bacteria
types.
