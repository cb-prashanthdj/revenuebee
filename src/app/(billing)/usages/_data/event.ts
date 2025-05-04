
enum LanguagePair {
    EN_FR = "EN-FR",
    EN_ES = "EN-ES",
    FR_EN = "FR-EN",
    // Add more pairs as needed
  }
  
  enum Region {
    UK = "UK",
    US = "US",
    EU = "EU",
    // Add more regions as needed
  }
  
  export interface EventData { 
    eventId: string;
    subscriptionId: string;
    modelName: string;
    translationDate: string;
    characters: number;
    languagePair: LanguagePair;
    region: Region;
  }


  export const EventsData = [
    {
        eventId: "3wHnhVy6YoMs",
        subscriptionId: "AzZXC6UTLqe9INCI",
        modelName: "GPT-3.5",
        translationDate: new Date("2023-08-28T14:30:00").toLocaleString("en-GB", {
          timeZone: "Europe/London",
          dateStyle: "medium",
          timeStyle: "short",
        }),
        characters: 250,
        languagePair: LanguagePair.EN_FR,
        region: Region.UK,
        usageStamps: [
          new Date("2023-08-28T14:45:00").toISOString(),
         
        ],
        failureReasons: ["Invalid subscription"],
        properties: {
          model: "gpt-3.5",
          language_pair: "EN_FR",
          billing: "standard",
        },
      },
      {
        eventId: "2hJnYZv7YoMs",
        subscriptionId: "QzTJK2WLJbe8KMCI",
        modelName: "GPT-4",
        translationDate: new Date("2023-09-01T10:15:00").toLocaleString("en-GB", {
          timeZone: "Europe/London",
          dateStyle: "medium",
          timeStyle: "short",
        }),
        characters: 500,
        languagePair: LanguagePair.FR_EN,
        region: Region.EU,
        usageStamps: [
          new Date("2023-09-01T10:30:00").toISOString(),
         
        ],
        failureReasons: ["Invalid subscription"],
        properties: {
          model: "gpt-4",
          language_pair: "FR_EN",
          billing: "premium",
        },
      },
      {
        eventId: "4kHmBYy8OoLs",
        subscriptionId: "BnXRC9UMKpe9JNCI",
        modelName: "GPT-3.5",
        translationDate: new Date("2023-09-05T08:45:00").toLocaleString("en-GB", {
          timeZone: "Europe/London",
          dateStyle: "medium",
          timeStyle: "short",
        }),
        characters: 320,
        languagePair: LanguagePair.EN_ES,
        region: Region.US,
        usageStamps: [
          new Date("2023-09-05T09:00:00").toISOString(),
          
        ],
        failureReasons: [ "Incorrect language pair"],
        properties: {
          model: "gpt-3.5",
          language_pair: "EN_ES",
          billing: "standard",
        },
      },
      {
        eventId: "5mIlCYz9XpMs",
        subscriptionId: "DnZWD4VLJqe0LNCI",
        modelName: "GPT-4",
        translationDate: new Date("2023-09-10T14:30:00").toLocaleString("en-GB", {
          timeZone: "Europe/London",
          dateStyle: "medium",
          timeStyle: "short",
        }),
        characters: 400,
        languagePair: LanguagePair.EN_FR,
        region: Region.UK,
        usageStamps: [
          new Date("2023-09-10T14:45:00").toISOString(),
          
        ],
        failureReasons: ["Network error"],
        properties: {
          model: "gpt-4",
          language_pair: "EN_FR",
          billing: "enterprise",
        },
      },
      {
        eventId: "6nJlDYx0ZqMs",
        subscriptionId: "FnZYF5WLKue1MNCI",
        modelName: "GPT-3.5",
        translationDate: new Date("2023-09-15T11:00:00").toLocaleString("en-GB", {
          timeZone: "Europe/London",
          dateStyle: "medium",
          timeStyle: "short",
        }),
        characters: 150,
        languagePair: LanguagePair.FR_EN,
        region: Region.EU,
        usageStamps: [
          new Date("2023-09-15T11:15:00").toISOString(),
          
        ],
        failureReasons: [],
        properties: {
          model: "gpt-3.5",
          language_pair: "FR_EN",
          billing: "standard",
        },
      },
      {
        eventId: "7oKmEYz1WoNs",
        subscriptionId: "GnZZG6XLLve2ONCI",
        modelName: "GPT-4",
        translationDate: new Date("2023-09-20T13:45:00").toLocaleString("en-GB", {
          timeZone: "Europe/London",
          dateStyle: "medium",
          timeStyle: "short",
        }),
        characters: 275,
        languagePair: LanguagePair.EN_ES,
        region: Region.US,
        usageStamps: [
          new Date("2023-09-20T14:00:00").toISOString(),
          
        ],
        failureReasons: ["Exceeded API quota"],
        properties: {
          model: "gpt-4",
          language_pair: "EN_ES",
          billing: "premium",
        },
      },
      // Additional 20 entries:
  {
    eventId: "4uQsKYz7WoTs",
    subscriptionId: "OnZZN2DMRwe8UNCI",
    modelName: "GPT-3.5",
    translationDate: new Date("2023-10-20T09:45:00").toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    }),
    characters: 180,
    languagePair: LanguagePair.EN_ES,
    region: Region.US,
  },
  {
    eventId: "5vRtLYz8VoUs",
    subscriptionId: "PnZZO3ENRxe9VOCI",
    modelName: "GPT-4",
    translationDate: new Date("2023-10-25T15:00:00").toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    }),
    characters: 450,
    languagePair: LanguagePair.FR_EN,
    region: Region.EU,
  },
  {
    eventId: "6wSuMYz9ToVs",
    subscriptionId: "QnZZP4FORze0WNCI",
    modelName: "GPT-3.5",
    translationDate: new Date("2023-10-30T11:30:00").toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    }),
    characters: 120,
    languagePair: LanguagePair.EN_FR,
    region: Region.UK,
  },
  {
    eventId: "7xTvNYz0WoWs",
    subscriptionId: "RnZZQ5GORze1XNCI",
    modelName: "GPT-4",
    translationDate: new Date("2023-11-05T13:20:00").toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    }),
    characters: 300,
    languagePair: LanguagePair.FR_EN,
    region: Region.EU,
  },
  {
    eventId: "8yUwOYz1VoXs",
    subscriptionId: "SnZZR6HORze2YNCI",
    modelName: "GPT-3.5",
    translationDate: new Date("2023-11-10T16:10:00").toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    }),
    characters: 200,
    languagePair: LanguagePair.EN_ES,
    region: Region.US,
  },
  {
    eventId: "9zVxPYz2WoYs",
    subscriptionId: "TnZZS7IORze3ZNCI",
    modelName: "GPT-4",
    translationDate: new Date("2023-11-15T14:25:00").toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    }),
    characters: 275,
    languagePair: LanguagePair.EN_FR,
    region: Region.UK,
  },
  {
    eventId: "1aWxQYz3VoZs",
    subscriptionId: "UnZZT8JORze4ANCI",
    modelName: "GPT-3.5",
    translationDate: new Date("2023-11-20T12:50:00").toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    }),
    characters: 400,
    languagePair: LanguagePair.FR_EN,
    region: Region.EU,
  },
  {
    eventId: "2bXyRYz4WoAs",
    subscriptionId: "VnZZU9KORze5BNCI",
    modelName: "GPT-4",
    translationDate: new Date("2023-11-25T10:15:00").toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    }),
    characters: 350,
    languagePair: LanguagePair.EN_ES,
    region: Region.US,
  },
  {
    eventId: "3cYzSYz5VoBs",
    subscriptionId: "WnZZV0LORze6CNCI",
    modelName: "GPT-3.5",
    translationDate: new Date("2023-11-30T14:45:00").toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    }),
    characters: 500,
    languagePair: LanguagePair.EN_FR,
    region: Region.UK,
  },
  ];
  

  export const processedEvents = [
    {
      event_id: "3wHnhVy6YoMs",
      subscription_id: "AzZXC6UTLqe9lNCI",
      model_name: "Qwen 2.5",
      model_size: "7B",
      timestamp: "15-Nov-24 14:30",
      characters: 250,
      language_pair: "EN-FR",
      region: "UK"
    },
    {
      event_id: "3wHnhVy6YoMs",
      subscription_id: "AzZXC6UTLqe9lNCI",
      model_name: "Qwen 3",
      model_size: "5B",
      timestamp: "15-Aug-22 14:30",
      characters: 250,
      language_pair: "EN-FR",
      region: "UK"
    },
    {
      event_id: "3wHnhVy6YoMs",
      subscription_id: "AzZXC6UTLqe9lNCI",
      model_name: "Qwen 3.5",
      model_size: "5B",
      timestamp: "15-Aug-22 14:30",
      characters: 250,
      language_pair: "EN-FR",
      region: "UK"
    },
    {
      event_id: "3wHnhVy6YoMs",
      subscription_id: "AzZXC6UTLqe9lNCI",
      model_name: "Qwen 2.5",
      model_size: "7B",
      timestamp: "15-Aug-22 14:30",
      characters: 250,
      language_pair: "EN-FR",
      region: "UK"
    },
    {
      event_id: "3wHnhVy6YoMs",
      subscription_id: "AzZXC6UTLqe9lNCI",
      model_name: "Qwen 3",
      model_size: "5B",
      timestamp: "15-Aug-22 14:30",
      characters: 250,
      language_pair: "EN-FR",
      region: "UK"
    },
    {
      event_id: "3wHnhVy6YoMs",
      subscription_id: "AzZXC6UTLqe9lNCI",
      model_name: "Qwen 3.5",
      model_size: "8B",
      timestamp: "15-Aug-22 14:30",
      characters: 250,
      language_pair: "EN-FR",
      region: "UK"
    },
    {
      event_id: "3wHnhVy6YoMs",
      subscription_id: "AzZXC6UTLqe9lNCI",
      model_name: "Qwen 4",
      model_size: "8B",
      timestamp: "15-Aug-22 14:30",
      characters: 250,
      language_pair: "EN-FR",
      region: "UK"
    },
    {
      event_id: "3wHnhVy6YoMs",
      subscription_id: "AzZXC6UTLqe9lNCI",
      model_name: "Qwen 2.5",
      model_size: "7B",
      timestamp: "15-Aug-22 14:30",
      characters: 250,
      language_pair: "EN-FR",
      region: "UK"
    },
    {
      event_id: "3wHnhVy6YoMs",
      subscription_id: "AzZXC6UTLqe9lNCI",
      model_name: "Qwen 3.5",
      model_size: "8B",
      timestamp: "15-Aug-22 14:30",
      characters: 250,
      language_pair: "EN-FR",
      region: "UK"
    },
    {
      event_id: "3wHnhVy6YoMs",
      subscription_id: "AzZXC6UTLqe9lNCI",
      model_name: "Qwen 3",
      model_size: "7B",
      timestamp: "15-Aug-22 14:30",
      characters: 250,
      language_pair: "EN-FR",
      region: "UK"
    },
    {
      event_id: "3wHnhVy6YoMs",
      subscription_id: "AzZXC6UTLqe9lNCI",
      model_name: "Qwen 2.5",
      model_size: "6B",
      timestamp: "15-Aug-22 14:30",
      characters: 250,
      language_pair: "EN-FR",
      region: "UK"
    },
    {
      event_id: "3wHnhVy6YoMs",
      subscription_id: "AzZXC6UTLqe9lNCI",
      model_name: "Qwen 3",
      model_size: "5B",
      timestamp: "15-Aug-22 14:30",
      characters: 250,
      language_pair: "EN-FR",
      region: "UK"
    },
    {
      event_id: "3wHnhVy6YoMs",
      subscription_id: "AzZXC6UTLqe9lNCI",
      model_name: "Qwen 2.5",
      model_size: "7B",
      timestamp: "15-Aug-22 14:30",
      characters: 250,
      language_pair: "EN-FR",
      region: "UK"
    },
    {
      event_id: "3wHnhVy6YoMs",
      subscription_id: "AzZXC6UTLqe9lNCI",
      model_name: "Qwen 3",
      model_size: "9B",
      timestamp: "15-Aug-22 14:30",
      characters: 250,
      language_pair: "EN-FR",
      region: "UK"
    }
  ];



  export const errorLogData = [
    {
      event_id: "A1B2C3D4E5",
      failure_reason: "Invalid subscription ID",
      subscription_id: "SUB1234",
      usage_timestamp: "07-Nov-2024 9:15:00",
      attributes: {
        model: "gpt-4",
        language_pair: "EN-FR"
      }
    },
    {
      event_id: "F6G7H8I9J0",
      failure_reason: "Malformed data",
      subscription_id: "SUB5678",
      usage_timestamp: "17-Jun-2024 06:49:32",
      attributes: {
        model: "gpt-3.5-turbo",
        language_pair: "DE-EN"
      }
    },
    {
      event_id: "K1L2M3N4O5",
      failure_reason: "Subs ID not found",
      subscription_id: "-",
      usage_timestamp: "17-Jun-2024 06:49:32",
      attributes: {
        model: "gpt-4",
        language_pair: "DE-EN"
      }
    },
    {
      event_id: "P6Q7R8S9T0",
      failure_reason: "Timestamps not allowed",
      subscription_id: "SUB2345",
      usage_timestamp: "17-Jun-2024 06:49:32",
      attributes: {
        model: "gpt-4",
        language_pair: "DE-EN"
      }
    },
    {
      event_id: "U1V2W3X4Y5",
      failure_reason: "Malformed data",
      subscription_id: "SUB5678",
      usage_timestamp: "17-Jun-2024 06:49:32",
      attributes: {
        model: "gpt-3.5-turbo",
        language_pair: "DE-EN"
      }
    },
    {
      event_id: "Z6A7B8C9D0",
      failure_reason: "Subs ID not found",
      subscription_id: "-",
      usage_timestamp: "17-Jun-2024 06:49:32",
      attributes: {
        model: "gpt-4",
        language_pair: "DE-EN"
      }
    },
    {
      event_id: "E1F2G3H4I5",
      failure_reason: "Subs not active",
      subscription_id: "SUB3456",
      usage_timestamp: "17-Jun-2024 06:49:32",
      attributes: {
        model: "gpt-3.5-turbo",
        language_pair: "DE-EN"
      }
    },
    {
      event_id: "J6K7L8M9N0",
      failure_reason: "Malformed data",
      subscription_id: "SUB1234",
      usage_timestamp: "17-Jun-2024 06:49:32",
      attributes: {
        model: "gpt-3.5-turbo",
        language_pair: "DE-EN"
      }
    },
    {
      event_id: "O1P2Q3R4S5",
      failure_reason: "Timestamps not allowed",
      subscription_id: "SUB3456",
      usage_timestamp: "17-Jun-2024 06:49:32",
      attributes: {
        model: "gpt-3.5-turbo",
        language_pair: "DE-EN"
      }
    },
    {
      event_id: "T6U7V8W9X0",
      failure_reason: "Malformed data",
      subscription_id: "SUB4567",
      usage_timestamp: "17-Jun-2024 06:49:32",
      attributes: {
        model: "gpt-4",
        language_pair: "DE-EN"
      }
    },
    {
      event_id: "Y1Z2A3B4C5",
      failure_reason: "Subs ID not found",
      subscription_id: "-",
      usage_timestamp: "17-Jun-2024 06:49:32",
      attributes: {
        model: "gpt-3.5-turbo",
        language_pair: "DE-EN"
      }
    },
    {
      event_id: "D6E7F8G9H0",
      failure_reason: "Malformed data",
      subscription_id: "SUB1234",
      usage_timestamp: "17-Jun-2024 06:49:32",
      attributes: {
        model: "gpt-4",
        language_pair: "DE-EN"
      }
    },
    {
      event_id: "I1J2K3L4M5",
      failure_reason: "Subs not active",
      subscription_id: "SUB5678",
      usage_timestamp: "17-Jun-2024 06:49:32",
      attributes: {
        model: "gpt-3.5-turbo",
        language_pair: "DE-EN"
      }
    },
    {
      event_id: "N6O7P8Q9R0",
      failure_reason: "Malformed data",
      subscription_id: "SUB4567",
      usage_timestamp: "17-Jun-2024 06:49:32",
      attributes: {
        model: "gpt-4",
        language_pair: "DE-EN"
      }
    },
    {
      event_id: "S1T2U3V4W5",
      failure_reason: "Subs not active",
      subscription_id: "SUB3456",
      usage_timestamp: "17-Jun-2024 06:49:32",
      attributes: {
        model: "gpt-3.5-turbo",
        language_pair: "DE-EN"
      }
    },
    {
      event_id: "X6Y7Z8A9B0",
      failure_reason: "Subs ID not found",
      subscription_id: "-",
      usage_timestamp: "17-Jun-2024 06:49:32",
      attributes: {
        model: "gpt-3.5-turbo",
        language_pair: "DE-EN"
      }
    }
  ];
  
