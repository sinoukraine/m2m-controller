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



    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];
