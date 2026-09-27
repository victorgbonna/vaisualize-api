const Conversation = require("../../model/Conversation");

module.exports = async function getProjectConversations(req, res, next) {
  try {
    const conversations = await Conversation.find({ project_id: req.project._id })
      .sort({ createdAt: 1 })
      // .limit(8)
      // .populate('project', '_id title')
      .lean();

      // const chats = conversations.reverse().map((conversation) => ({
      //   id: conversation._id.toString(),
      //   role: conversation.role,
      //   content: conversation.content,
      // }));

    return res.status(200).json({
      status: "success",
      message: "Conversations gotten",
      chats: conversations,
    });
  } catch (error) {
    next(error);
  }
};

const a = {
    "user_id": "6975f791d7db33b9e3466605",
    "messageIndex": 5,
    "project_id": "6ab7da814b10518b09afc97e",
    "role": "assistant",
    "content": "",
    "status": "success",
    "formula": {
        "operation": "group_aggregate",
        "main_table": "treatment_visits.csv",
        "relationships": [
            {
                "from_table": "treatment_visits.csv",
                "from_column": "site_id",
                "to_table": "sites.csv",
                "to_column": "site_id"
            }
        ],
        "filters": [],
        "group_by": [
            {
                "table": "treatment_visits.csv",
                "field": "site_id",
                "showcase_key": [
                    "site_name"
                ],
                "showcase_alias": "site"
            },
            {
                "table": "treatment_visits.csv",
                "field": "patient_id",
                "showcase_key": []
            }
        ],
        "calculations": [
            {
                "field": "visit_id",
                "function": "count",
                "alias": "patient_visit_count"
            }
        ],
        "sort": [],
        "post_aggregate": {
            "field": "patient_visit_count",
            "function": "average",
            "alias": "average_visits_per_patient"
        },
        "limit": null
    },
    "response": {
        "template": "<p>Here is the average number of treatment visits per patient at each site:</p>",
        "row_template": "<p><strong>{{site}}</strong>: <strong>{{average_visits_per_patient}}</strong> visits per patient on average.</p>",
        "conclusion": ""
    },
    "pending_questions": [],
    "clarification": "",
    "stage": "formula",
    "_id": "6ab80c394e8ca2ab620ba5d4",
    "createdAt": "2026-09-26T18:17:29.699Z",
    "updatedAt": "2026-09-26T18:17:29.699Z",
    "__v": 0
}