const Conversation = require("../../model/Conversation");
const { generateDataiChartResponse } = require("../../services/chatGPTServices");

const errorResponse = {
  error: {
    message: "A valid chart configuration could not be generated from the available project data.",
  },
};
const sampleResponses = [
  {
    status: "success",
    role:'assistant',
    formula: {
      operation: "aggregate",
      main_table: "26_fanchallenger_db.users.json",
      relationships: [],
      filters: [],
      group_by: [],
      calculations: [
        {
          field: "_id",
          function: "count",
          alias: "monthly_signups",
        },
      ],
      post_aggregate: {
        function: "average",
        field: "monthly_signups",
        alias: "average_monthly_signups",
      },
      sort: [],
      limit: 1,
    },
    response: {
      template:
        "<p>On average, <strong>{{average_monthly_signups}}</strong> users registered each month.</p>",
      row_template: "",
      conclusion: "",
    },
    pending_questions: [],
  },

  {
    status: "success",
    role:'assistant',
    formula: {
      operation: "group_aggregate",
      main_table: "fanchallenger_db.competitions.csv",
      relationships: [],
      filters: [],
      group_by: [
        {
          table: "fanchallenger_db.competitions.csv",
          field: "league_name",
          showcase_key: [],
        },
      ],
      calculations: [
        {
          field: "entry_fee",
          function: "sum",
          alias: "total_entry_fee",
        },
        {
          field: "no_of_managers",
          function: "sum",
          alias: "total_managers",
        },
      ],
      post_aggregate: null,
      sort: [
        {
          field: "total_entry_fee",
          direction: "desc",
        },
      ],
      limit: 5,
    },
    response: {
      template:
        "<p>Here are the top 5 competitions by total entry fee:</p>",
      row_template:
        "<p>{{league_name}}: <strong>{{total_entry_fee}}</strong> in entry fees from <strong>{{total_managers}}</strong> managers.</p>",
      conclusion: "",
    },
    pending_questions: [],
  },

  {
    status: "success",
    role:'assistant',
    formula: {
      operation: "group_aggregate",
      main_table: "26_fanchallenger_db.transactions.csv",
      relationships: [
        {
          from_table: "26_fanchallenger_db.transactions.csv",
          from_column: "user",
          to_table: "26_fanchallenger_db.users.json",
          to_column: "_id",
        },
      ],
      filters: [],
      group_by: [
        {
          table: "26_fanchallenger_db.transactions.csv",
          field: "user",
          showcase_key: ["first_name", "last_name"],
          showcase_alias: "username",
        },
      ],
      calculations: [
        {
          field: "amount",
          function: "sum",
          alias: "total_transaction_amount",
        },
      ],
      post_aggregate: null,
      sort: [
        {
          field: "total_transaction_amount",
          direction: "desc",
        },
      ],
      limit: 1,
    },
    response: {
      template:
        "<p>The user with the highest total transaction amount is <strong>{{total_transaction_amount}} by {{username}}</strong> in transactions.</p>",
      row_template: "",
      conclusion: "",
    },
    pending_questions: [],
  },

  {
    status: "success",
    role:'assistant',
    formula: {
      operation: "aggregate",
      main_table: "26_fanchallenger_db.transactions.csv",
      relationships: [
        {
          from_table: "26_fanchallenger_db.transactions.csv",
          from_column: "user",
          to_table: "26_fanchallenger_db.users.json",
          to_column: "_id",
        },
      ],
      filters: [
        {
          table: "26_fanchallenger_db.users.json",
          field: "favourite_team",
          operator: "=",
          value: "Arsenal",
        },
      ],
      group_by: [],
      calculations: [
        {
          field: "amount",
          function: "sum",
          alias: "total_deposits",
        },
        {
          field: "amount",
          function: "sum",
          alias: "total_withdrawals",
        },
      ],
      post_aggregate: null,
      sort: [],
      limit: 1,
    },
    response: {
      template:
        "<p>Arsenal supporters made <strong>{{total_deposits}}</strong> in deposits and <strong>{{total_withdrawals}}</strong> in withdrawals.</p>",
      row_template: "",
      conclusion: "",
    },
    pending_questions: [],
  },
];
module.exports = async function (req, res, next) {
  try {
    const { input, project, existingConversations} = req.body || {};
    // const conversa=await Conversation.findOne({
    //   user_id: req.user._id,
    //   project_id: project._id,
    // }).sort({ createdAt: -1 }).skip(+input).lean();
    // const conversa= sampleResponses[+input];
    // return res.status(200).json({ conversation: conversa });
    
    await Conversation.create({
      user_id: req.user._id,
      project_id: project._id,
      role: "user",
      content: input,
    });
    const project_details = {
      ...project,
      // existingConversations,
    };
    // console.log({ project_details });
    const result = await generateDataiChartResponse({ input, project_details, existingConversations });
    // if (!result || (result.error && result.error.message)) {
    //   return res.status(200).json(result?.error ? result : errorResponse);
    // }

    // if (!result.formData || !isValidConfiguration(result.formData, project_details)) {
    //   return res.status(200).json(errorResponse);
    // }
    const ai_response={
      user_id: req.user._id,
      project_id: project._id,
      role: "assistant",
      content: '',
      ...result,
    }
    const conversation = new Conversation(ai_response);
    await conversation.save();

    return res.status(200).json({ conversation });
  } catch (error) {
    next(error);
  }
};

// function isValidConfiguration(formData, projectDetails) {
//   const datasets = projectDetails.datasets;
//   const chartTypes = new Set([
//     "bar chart",
//     "line chart",
//     "area chart",
//     "pie chart",
//     "scatter plot",
//     "bubble chart",
//     "histogram",
//     "box plot",
//     "violin plot",
//     "radar chart",
//     "matrix heatmap",
//   ]);
//   const datasetMap = new Map(datasets.map((dataset) => [
//     dataset.file_name,
//     new Map((dataset.columns?.column_data_types || []).map((column) => [column.col, column.data_type])),
//   ]));
//   const getType = (field) => field && datasetMap.get(field.table)?.get(field.col);
//   const isField = (field) => Boolean(field && field.table && field.col && getType(field));
//   const isNumber = (field) => getType(field) === "number";
//   const isCategory = (field) => ["string", "identifier"].includes(getType(field));
//   const isDate = (field) => getType(field) === "date";
//   const isEmpty = (field) => field === "" || field === null || typeof field === "undefined";

//   if (!formData || typeof formData.title !== "string" || !chartTypes.has(formData.chartType) || !isField(formData.x)) {
//     return false;
//   }

//   const related = (field) => {
//     if (isEmpty(field)) return true;
//     if (!isField(field)) return false;
//     if (field.table === formData.x.table) return true;
//     return (projectDetails.table_relationships || []).some((relationship) =>
//       (relationship.from_table === formData.x.table && relationship.to_table === field.table) ||
//       (relationship.to_table === formData.x.table && relationship.from_table === field.table)
//     );
//   };

//   if (![formData.y, formData.z, formData.group_by].every(related)) return false;
//   if (!isEmpty(formData.y) && !isField(formData.y)) return false;
//   if (!isEmpty(formData.z) && !isField(formData.z)) return false;
//   if (!isEmpty(formData.group_by) && !isField(formData.group_by)) return false;

//   const yNumber = isNumber(formData.y);
//   const xNumber = isNumber(formData.x);
//   const xCategory = isCategory(formData.x);
//   const xDate = isDate(formData.x);
//   const yCategory = isCategory(formData.y);
//   const validAggregate = ["count", "sum", "average", "max", "min", "mode"].includes(formData.aggregate);
//   const validUnit = ["", "minute", "minutes", "second", "seconds", "hour", "hours", "day", "days", "week", "weeks", "month", "months"].includes(formData.unit);

//   if (!validUnit || (!xDate && formData.unit !== "")) return false;
//   if (formData.aggregate !== "count" && !yNumber) return false;
//   if (!validAggregate) return false;

//   switch (formData.chartType) {
//     case "bar chart": return (xCategory || xDate) && (isEmpty(formData.y) || yNumber);
//     case "line chart":
//     case "area chart": return xDate && (isEmpty(formData.y) || yNumber);
//     case "pie chart": return xCategory;
//     case "scatter plot": return xNumber && yNumber;
//     case "bubble chart": return xNumber && yNumber && isNumber(formData.z);
//     case "histogram": return xNumber;
//     case "box plot":
//     case "violin plot": return xCategory && yNumber;
//     case "radar chart":
//     case "matrix heatmap": return Array.isArray(formData.x) && formData.x.length > 1 && yCategory;
//     default: return false;
//   }
// }


// {
//     "formData": {
//         "status": "success",
//         "formula": {
//             "operation": "group_aggregate",
//             "main_table": "26_fanchallenger_db.users.json",
//             "relationships": [],
//             "filters": [],
//             "group_by": [
//                 {
//                     "table": "26_fanchallenger_db.users.json",
//                     "field": "createdAt"
//                 }
//             ],
//             "calculations": [
//                 {
//                     "field": "_id",
//                     "function": "count",
//                     "alias": "monthly_signups"
//                 }
//             ],
//             "sort": [
//                 {
//                     "field": "createdAt",
//                     "direction": "asc"
//                 }
//             ],
//             "limit": 10
//         },
//         "response": {
//             "template": "Monthly user signups by month:",
//             "result": [
//                 {
//                     "createdAt": "{createdAt}",
//                     "monthly_signups": "{monthly_signups}"
//                 }
//             ]
//         },
//         "pending_questions": []
//     }

// }

// indicate unit when there is a date column to work with, tEmplate not having the placeholder


// {
//     "formData": {
//         "status": "success",
//         "formula": {
//             "operation": "group_aggregate",
//             "main_table": "26_fanchallenger_db.users.json",
//             "relationships": [],
//             "filters": [],
//             "group_by": [
//                 {
//                     "table": "26_fanchallenger_db.users.json",
//                     "field": "createdAt",
//                     "unit": "month"
//                 }
//             ],
//             "calculations": [
//                 {
//                     "field": "_id",
//                     "function": "count",
//                     "alias": "monthly_registrations",
//                     "endTag": "registrations"
//                 }
//             ],
//             "post_aggregate": {
//                 "function": "average",
//                 "field": "monthly_registrations",
//                 "alias": "average_monthly_registrations",
//                 "endTag": "registrations/month"
//             },
//             "sort": [],
//             "limit": null
//         },
//         "response": {
//             "template": "<p>The average number of user registrations per month is {average_monthly_registrations}.</p>",
//             "result": [
//                 {
//                     "average_monthly_registrations": "{average_monthly_registrations}"
//                 }
//             ]
//         },
//         "pending_questions": []
//     }
// }

// {
//     "formData": {
//         "status": "success",
//         "formula": {
//             "operation": "group_aggregate",
//             "main_table": "fanchallenger_db.competitions.csv",
//             "relationships": [],
//             "filters": [],
//             "group_by": [
//                 {
//                     "table": "fanchallenger_db.competitions.csv",
//                     "field": "league_name"
//                 }
//             ],
//             "calculations": [
//                 {
//                     "field": "entry_fee",
//                     "function": "sum"
//                 },
//                 {
//                     "field": "no_of_managers",
//                     "function": "sum"
//                 }
//             ],
//             "post_aggregate": null,
//             "sort": [
//                 {
//                     "field": "sum_entry_fee",
//                     "direction": "desc"
//                 },
//                 {
//                     "field": "sum_no_of_managers",
//                     "direction": "desc"
//                 }
//             ],
//             "limit": 5
//         },
//         "response": {
//             "template": "Top competitions by potential revenue, showing each competition’s entry fee and number of managers.",
//             "result": [
//                 {
//                     "league_name": "{league_name}",
//                     "sum_entry_fee": "{sum_entry_fee}",
//                     "sum_no_of_managers": "{sum_no_of_managers}"
//                 }
//             ]
//         },
//         "pending_questions": []
//     }
// }

// {
//     "status": "success",
//     "formula": {
//         "operation": "group_aggregate",
//         "main_table": "26_fanchallenger_db.transactions.csv",
//         "relationships": [
//             {
//                 "from_table": "26_fanchallenger_db.transactions.csv",
//                 "from_column": "user",
//                 "to_table": "26_fanchallenger_db.users.json",
//                 "to_column": "_id"
//             }
//         ],
//         "filters": [],
//         "group_by": [
//           {
//             "table": "transactions",
//             "field": "user",
//             "showcase_key": ["firstName", "lastName"]
//           }
//         ],
//         "calculations": [
//             {
//                 "field": "amount",
//                 "function": "sum",
//                 "alias": "sum_amount"
//             }
//         ],
//         "post_aggregate": null,
//         "sort": [
//             {
//                 "field": "sum_amount",
//                 "direction": "desc"
//             }
//         ],
//         "limit": 1
//     },
//     "response": {
//         "template": "<p>The user who transacted the highest total amount is {first_name} {last_name} (User ID: {_id}), with a total of {sum_amount}.</p>",
//         "result": [
//             {
//                 "_id": "{_id}",
//                 "first_name": "{first_name}",
//                 "last_name": "{last_name}",
//                 "sum_amount": "{sum_amount}"
//             }
//         ]
//     },
//     "pending_questions": []
// }


// {
//     "status": "success",
//     "formula": {
//         "operation": "group_aggregate",
//         "main_table": "26_fanchallenger_db.transactions.csv",
//         "relationships": [
//             {
//                 "from_table": "26_fanchallenger_db.transactions.csv",
//                 "from_column": "user",
//                 "to_table": "26_fanchallenger_db.users.json",
//                 "to_column": "_id"
//             }
//         ],
//         "filters": [
//             {
//                 "table": "26_fanchallenger_db.users.json",
//                 "field": "favourite_team",
//                 "operator": "=",
//                 "value": "Arsenal"
//             },
//             {
//                 "table": "26_fanchallenger_db.transactions.csv",
//                 "field": "type",
//                 "operator": "in",
//                 "value": [
//                     "deposit",
//                     "withdrawal"
//                 ]
//             }
//         ],
//         "group_by": [
//             {
//                 "table": "26_fanchallenger_db.transactions.csv",
//                 "field": "type"
//             }
//         ],
//         "calculations": [
//             {
//                 "field": "amount",
//                 "function": "sum"
//             }
//         ],
//         "post_aggregate": null,
//         "sort": [],
//         "limit": null
//     },
//     "response": {
//         "template": "<p>Here are the total deposit and withdrawal amounts made by users who support Arsenal.</p>",
//         "result": [
//             {
//                 "type": "",
//                 "sum_amount": ""
//             }
//         ]
//     },
//     "pending_questions": []
// }

// {
//     "status": "success",
//     "formula": {
//         "operation": "group_aggregate",
//         "main_table": "26_fanchallenger_db.transactions.csv",
//         "relationships": [
//             {
//                 "from_table": "26_fanchallenger_db.transactions.csv",
//                 "from_column": "user",
//                 "to_table": "26_fanchallenger_db.users.json",
//                 "to_column": "_id"
//             }
//         ],
//         "filters": [],
//         "group_by": [
//             {
//                 "table": "26_fanchallenger_db.transactions.csv",
//                 "field": "user",
//                 "showcase_key": [
//                     "first_name",
//                     "last_name"
//                 ]
//             }
//         ],
//         "calculations": [
//             {
//                 "field": "amount",
//                 "function": "sum",
//                 "alias": "sum_amount"
//             }
//         ],
//         "post_aggregate": null,
//         "sort": [
//             {
//                 "field": "sum_amount",
//                 "direction": "desc"
//             }
//         ],
//         "limit": 1
//     },
//     "response": {
//         "template": "<p>Here is the user with the highest total transaction amount.</p>",
//         "result": [
//             {
//                 "user": "",
//                 "sum_amount": ""
//             }
//         ]
//     },
//     "pending_questions": []
// }

// {
//     "status": "success",
//     "formula": {
//         "operation": "group_aggregate",
//         "main_table": "fanchallenger_db.competitions.csv",
//         "relationships": [],
//         "filters": [],
//         "group_by": [
//             {
//                 "table": "fanchallenger_db.competitions.csv",
//                 "field": "league_name"
//             }
//         ],
//         "calculations": [
//             {
//                 "field": "entry_fee",
//                 "function": "sum"
//             },
//             {
//                 "field": "no_of_managers",
//                 "function": "sum"
//             }
//         ],
//         "post_aggregate": null,
//         "sort": [
//             {
//                 "field": "sum_entry_fee",
//                 "direction": "desc"
//             },
//             {
//                 "field": "sum_no_of_managers",
//                 "direction": "desc"
//             }
//         ],
//         "limit": 5
//     },
//     "response": {
//         "template": "<p>Here are the top competitions ranked by entry fee (descending), with number of managers used as a tiebreaker.</p>",
//         "result": [
//             {
//                 "league_name": "",
//                 "sum_entry_fee": "",
//                 "sum_no_of_managers": ""
//             }
//         ]
//     },
//     "pending_questions": []
// }

// {
//     "status": "success",
//     "formula": {
//         "operation": "group_aggregate",
//         "main_table": "26_fanchallenger_db.users.json",
//         "relationships": [],
//         "filters": [],
//         "group_by": [
//             {
//                 "table": "26_fanchallenger_db.users.json",
//                 "field": "createdAt",
//                 "unit": "month"
//             }
//         ],
//         "calculations": [
//             {
//                 "field": "_id",
//                 "function": "count",
//                 "alias": "monthly_registrations",
//                 "endTag": "registrations"
//             }
//         ],
//         "post_aggregate": {
//             "function": "average",
//             "field": "monthly_registrations",
//             "alias": "average_monthly_registrations",
//             "endTag": "registrations"
//         },
//         "sort": [],
//         "limit": null
//     },
//     "response": {
//         "template": "<p>Here is the average number of user registrations per month, calculated by counting registrations in each calendar month and then averaging those monthly counts.</p>",
//         "result": [
//             {
//                 "average_monthly_registrations": ""
//             }
//         ]
//     },
//     "pending_questions": []
// }