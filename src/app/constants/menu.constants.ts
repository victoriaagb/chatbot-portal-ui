export const menu = {
    YOUR_BOTS: {
        ALL_BOTS: {
            displayName: 'All Bots',
            routerLink: '',
            type: 'link',
        },
        BY_TEMPLATE: {
            displayName: 'By Category',
            routerLink: '',
            type: 'link'
        },
        BY_CATEGORY: {
            displayName: 'By Template',
            routerLink: '',
            type: 'link'
        }
    },
    CREATE_NEW_BOT: {
        CREATE_BOT: {
            displayName: 'Name Your Bot',
            routerLink: 'bot-name',
            type: 'link',
            rules: []
        },
        CREATE_TOPIC: {
            displayName: 'Configure Topics',
            routerLink: 'topic-config',
            type: 'link',
          rules: ['BOT_NAME_PRESENT']
        },
        BUILD: {
          displayName: 'Build',
          routerLink: 'build-the-bot',
          type: 'button',
          rules: ['BOT_NAME_PRESENT', 'ONE_TOPIC_COMPLETE']
      },
        PUBLISH: {
            displayName: 'Publish',
            routerLink: '',
            type: 'button',
            rules: ['BUILD_COMPLETE']
        }
    }
};
