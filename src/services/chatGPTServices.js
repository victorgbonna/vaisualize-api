const OpenAI = require("openai");
const consolelog = require("../utils/consolelog");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const generateVisualizationPlan = async (payload) =>{
    try {
    const systemPrompt = `
    
    You are a data visualization assistant.
    Given information about a dataset — including columns, description, goal, indices, sample rows, categorical columns, numerical columns, date columns, and unique columns — your job is to return a JSON object with an array called "visualizations".
    
    I need you to create an object named visuals_obj that contains two keys only: visuals and metrics. Both being arrays
    
    Each item in "visuals" must be an object with the following properties:

    * plot_type: The best-fitting visualization type (e.g., "bar chart", "line chart", "scatter plot", "histogram", "pie chart", "box plot", "heatmap", "area chart", "bubble chart", "violin plot", "radar chart", "matrix heatmap", etc.). For more than one suggestion, include up to 2 types, separated by just a comma(no space) in order of preference.
    * title: A short, descriptive title for the visualization.
    * description: A concise explanation of what the visualization shows.
    * x: The single column used for the X-axis. This but must be part of the 'Column' field, given to you
    * y: The single column used for the Y-axis. This field is optional but if provided, it must be part of the 'Column' field, given to you.
    * group_by (optional): Only include when grouping by a categorical variable adds meaning.
    * aggregate (optional): Specify aggregation type (e.g., "sum", "average", "count") only when required — usually for bar charts or similar visuals that summarize data.
    * unit (optional): Include this property only when date/time columns should be converted into "minutes", "seconds", "hours", "days", "weeks", or "months".
    * why: A short explanation of why this visualization is appropriate.

    Additional rules:

    * Do not include any text outside the JSON array.
    * Do not use numeric limits like “Top 10” or “Top 5” — instead use adjectives like “most”, “highest”, “dominant”, “frequent”, “largest”, or “smallest”.
    * Only include "group_by" if they’re useful or add distinct meaning. Avoid repetition.
    * When visualizing correlations amongst a categorical column on vertical axis labelled as y(e.g player name or type) - this should just be 1 categorical column and at most 6 numerical columns on horizontal axis labelled as x(e.g speed, strength, sugar level) - this should return an array of numerical columns , use "matrix heatmap".
    * For Radar Plots, same structure should be the same as matrix heatmap, but at most 5 numerical columns and the y column should be in the 'unique column' provided".
    * Be flexible: do not use a chart in more than 2 (two) places.
    *  omit heatmap for now, just matrix heatmap only, if it qualifies for such.  

    "metrics" → represents summarized numerical insights, where each item includes:

    label: the name or title of the metric (e.g., Average Revenue, Cleansheets Kept, Average Response Time)

    aggregate: the type of aggregation or function applied (the value of this should be amongst -> sum, average, count, max, min, mode), nothing else than those

    column: the column in the 'columns' the aggregation is performed on. 
    The metric array should contain at most 8 items.

    Return them only. No markdown, no commentary.

    `.trim();

    const userPrompt = `
    Here is the dataset info:
    Columns: ${JSON.stringify(payload.columns)}
    Description: ${payload.description}
    Goal: ${payload.goal}
    Sample rows: ${JSON.stringify(payload.sample_data)}
    Categorical columns: ${JSON.stringify(payload.categorical_columns)}
    Numerical columns: ${JSON.stringify(payload.numerical_columns)}
    Date columns: ${JSON.stringify(payload.date_columns)}
    Unique columns: ${JSON.stringify(payload.unique_columns)}
    `.trim();
    
    const response = await openai.responses.create({
        model: "gpt-5",
        input: [
            {
                role: "developer",
                content: systemPrompt
            },
            {
                role: "user",
                content: userPrompt
            },
        ]
    });
    // consolelog({response: response?.output_text)})
    return response?.output_text? JSON.parse(response.output_text): [];
    }  catch (error) {
        console.log({error})
        console.error("Error generating visualization plan:", error);
        throw error;
    }
}

    // Index Column: ${JSON.stringify(payload.indices)}
module.exports= {generateVisualizationPlan}