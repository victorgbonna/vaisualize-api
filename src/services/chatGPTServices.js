const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const generateVisualizationPlan = async (payload) =>{
    try {
    const systemPrompt = `
        You are a data visualization assistant.  
        Given the information about a dataset (columns, description, goal, indices, sample rows, etc.), your job is to output a JSON with an array “visualizations” where each item has:
        - plot_type (e.g., bar chart, line chart, scatter plot, histogram, pie chart, box plot, heatmap, area chart, bubble chart, violin plot, radar chart, etc. for more than one suggestion, separate with comma(not more than 2) in order of preference)
        - title (a short, descriptive title for the visualization)
        - description (a brief explanation of what the visualization shows)
        - x
        - y (or array of y’s)
        - optionally z or group_by
        - why (a short explanation)
        Return valid JSON only, no extra text. Try to suggest visualizations that best align with the user's goal and the nature of the data. Also, try to maximize as much chart variety as possible.
    `.trim();

    const userPrompt = `
    Here is the dataset info:
    Columns: ${JSON.stringify(payload.columns)}
    Description: ${payload.description}
    Goal: ${payload.goal}
    Indices: ${JSON.stringify(payload.indices)}
    Sample rows: ${JSON.stringify(payload.sample_data)}
    Categorical columns: ${JSON.stringify(payload.categorical_columns)}
    Numerical columns: ${JSON.stringify(payload.numerical_columns)}
    Date columns: ${JSON.stringify(payload.date_columns)}
    Unique columns: ${JSON.stringify(payload.unique_columns)}
    `.trim();
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
        ],
        temperature: 0.0,
        max_tokens: 500
    });

    return response.choices[0].message.content;
    }  catch (error) {
        console.log({error})
        console.error("Error generating visualization plan:", error);
        throw error;
    }
}


module.exports= {generateVisualizationPlan}