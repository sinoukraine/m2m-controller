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
        componentUrl: './resources/pages/commands-list.html?v=1.1',
        name: 'commands-list'
    },



    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];
