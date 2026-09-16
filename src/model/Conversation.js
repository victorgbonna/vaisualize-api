const mongoose = require("mongoose");

const { Schema } = mongoose;


const RelationshipSchema = new Schema(
  {
    from_table: {
      type: String,
      required: true,
    },
    from_column: {
      type: String,
      required: true,
    },
    to_table: {
      type: String,
      required: true,
    },
    to_column: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const FilterSchema = new Schema(
  {
    table: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    operator: {
      type: String,
      required: true,
    },
    value: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { _id: false }
);

const GroupBySchema = new Schema(
  {
    table: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const CalculationSchema = new Schema(
  {
    field: {
      type: String,
      required: true,
    },
    function: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
    },
  },
  { _id: false }
);

const SortSchema = new Schema(
  {
    field: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      enum: ["asc", "desc"],
      required: true,
    },
  },
  { _id: false }
);

const FormulaSchema = new Schema(
  {
    operation: {
      type: String,
      enum: ["aggregate", "group_aggregate", "filter"],
      required: true,
    },

    main_table: {
      type: String,
      required: true,
    },

    relationships: {
      type: [RelationshipSchema],
      default: [],
    },

    filters: {
      type: [FilterSchema],
      default: [],
    },

    group_by: {
      type: [GroupBySchema],
      default: [],
    },

    calculations: {
      type: [CalculationSchema],
      default: [],
    },

    sort: {
      type: [SortSchema],
      default: [],
    },

    limit: {
      type: Number,
      default: 10,
    },
  },
  { _id: false }
);




const ResultSchema = new Schema(
  {},
  {
    _id: false,
    strict: false,
  }
);

const ResponseSchema = new Schema(
  {
    template: {
      type: String,
      default: "",
    },

    result: {
      type: [ResultSchema],
      default: [],
    },
  },
  { _id: false }
);

const ConversationSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    project_id: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },

    content: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "success",
        "clarification_required",
        "unsupported",
        "error",
      ],
      default: "success",
    },

    formula: {
      type: FormulaSchema,
      default: null,
    },

    response: {
      type: ResponseSchema,
      default: null,
    },

    pending_questions: {
      type: [String],
      default: [],
    },

    clarification: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


ConversationSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
   const messageCount = await mongoose.models.Conversation.countDocuments({
  user_id: this.user_id,
  project_id: this.project_id,
    });
    this.messageIndex = messageCount;
    next();
  } catch (error) {
    next(error);
  }
});

const Conversation = mongoose.model(
  "Conversation",
  ConversationSchema
);

module.exports = Conversation;

