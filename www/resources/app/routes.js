var routes = [
    {
        path: '/',
        componentUrl: './resources/pages/home.html?v=2.1',
        name: 'home',
    },
    {
        path: '/panel-left/',
        panel: {
            componentUrl: './resources/pages/panel-left.html?v=1.9',
        },
        name: 'panel-left'
    },
    {
        path: '/commands/',
        componentUrl: './resources/pages/commands.html?v=1.1',
        name: 'commands'
    },
    {
        path: '/commands-list/',
        componentUrl: './resources/pages/commands-list.html?v=1.2',
        name: 'commands-list'
    },
    {
        path: '/imsi-statistics/',
        componentUrl: './resources/pages/imsi-statistics.html?v=1.2',
        name: 'imsi-statistics'
    },
    {
        path: '/commands-history/',
        componentUrl: './resources/pages/commands-history.html?v=1.2',
        name: 'commands-history'
    },
    {
        path: '/sim-status/',
        componentUrl: './resources/pages/sim-status.html?v=1.4',
        name: 'sim-status'
    },
    {
        path: '/set-status/',
        componentUrl: './resources/pages/set-status.html?v=2.5',
        name: 'set-status'
    },
    {
        path: '/edit-command/',
        componentUrl: './resources/pages/edit-command.html?v=2.7',
        name: 'edit-command'
    },
    {
        path: '/add-command/',
        componentUrl: './resources/pages/add-command.html?v=3.4',
        name: 'add-command'
    },

    {
        path: '/settings/',
        componentUrl: './resources/pages/settings.html?v=1.7',
        name: 'settings'
    },



    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];
