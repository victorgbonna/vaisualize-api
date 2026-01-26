// console.log({env:process.env})

module.exports = {
  mongoURI: process.env.MONGO_URI || '',
  APP_SECRET_KEY: process.env.APP_SECRET_KEY || 'keyboard',
  MAIL_EMAIL: process.env.MAIL_EMAIL,
  MAIL_PASS: process.env.MAIL_PASS,
  PAYSTACK_AUTHORIZATION_TOKEN: process.env.PAYSTACK_AUTHORIZATION_TOKEN,
  MAILCHIMP_AUDIENCE_ID:process.env.MAILCHIMP_AUDIENCE_ID,
  MAILCHIMP_API_KEY:process.env.MAILCHIMP_API_KEY,
  FRONTEND_BASE_URL:process.env.FRONTEND_BASE_URL || 'http://localhost:3000',
  LIST_CHARTS:{
    'area chart':
      {
        x:{
          colType:['date_column']
        },
        y:{
          colType:['numerical_column'],
          isOptional:true
        },
        group_by:{
          colType:['categorical_column'],
          isOptional:true
        },
        unit:{
          isOptional:true
        },
        aggregate:{
          isOptional:false
        }
      }
     ,
    'line chart':
      {
        x:{
          colType:['date_column']
        },
        y:{
          colType:['numerical_column'],
          isOptional:true
        },
        group_by:{
          colType:['categorical_column'],
          isOptional:true
        },
        unit:{
          isOptional:true
        },
        aggregate:{
          isOptional:false
        }
      },
    'histogram':
      {
        x:{
          colType:['numerical_column']
        },
        y:{
          colType:['numerical_column'],
          isOptional:true
        },
        // group_by:{
        //   colType:['categorical_column'],
        //   isOptional:true
        // },
        aggregate:{
          isOptional:false
        }
      }, 
    'box plot':
      {
        x:{
          colType:['categorical_column']
        },
        y:{
          colType:['numerical_column'],
          isOptional:false
        },
        // unit:{
        //   isOptional:true
        // }
      }, 
    'violin plot':
      {
        x:{
          colType:['categorical_column']
        },
        y:{
          colType:['numerical_column'],
          isOptional:false
        },
        // unit:{
        //   isOptional:true
        // }
      },
    'scatter plot':
      {
        x:{
          colType:['numerical_column']
        },
        y:{
          colType:['numerical_column']
        },
        group_by:{
          isOptional:true,
          colType:['categorical_column'],

        }
      }, 
    'bubble chart':
      {
        x:{
          colType:['numerical_column']
      },
        y:{
          colType:['numerical_column']
        },
        group_by:{
          isOptional:true,
          colType:['categorical_column'],
        },
        z:{
          colType:['numerical_column']
        }
      },
    'bar chart':
      {
        x:{
          colType:['categorical_column', 'date_column']
        },
        y:{
          colType:['numerical_column'],
          isOptional:true
        },
        group_by:{
          isOptional:true,
          colType:['categorical_column'],

        },
        aggregate:{
          isOptional:false
        }
      },
    'pie chart':
      {
        x:{
          colType:['categorical_column']
        },
        aggregate:{
          isOptional:false
        }
      },
    'radar chart':
      {
        x:{
          isArray:true,
          length:4,
          colType:[ 'numerical_column']
        },
        y:{
          colType:['categorical_column']
        },
      },
    'matrix heatmap':{
      x:{
          isArray:true,
          max_length: 6,
          colType:[ 'numerical_column']
        },
        y:{
          colType:['categorical_column']
        },
    }
    
  },
  // 'Bearer sk_test_a1afb90a2216f7ce7d58e51d586ae5792d86ef90'
};
