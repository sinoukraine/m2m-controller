var routes = [
    {
        path: '/',
        componentUrl: './resources/pages/home.html?v=3.5',
        name: 'home',
    },
    {
        path: '/panel-left/',
        panel: {
            componentUrl: './resources/pages/panel-left.html?v=2.1',
        },
        name: 'panel-left'
    },
    {
        path: '/commands/',
        componentUrl: './resources/pages/commands.html?v=2.1',
        name: 'commands'
    },
    {
        path: '/dashboard/',
        componentUrl: './resources/pages/dashboard.html?v=1.6',
        name: 'dashboard'
    },
    {
        path: '/commands-manage/',
        componentUrl: './resources/pages/commands-manage.html?v=1.4',
        name: 'commands-manage'
    },
    {
        path: '/commands-list/',
        componentUrl: './resources/pages/commands-list.html?v=1.4',
        name: 'commands-list'
    },
    {
        path: '/imsi-statistics/',
        componentUrl: './resources/pages/imsi-statistics.html?v=1.3',
        name: 'imsi-statistics'
    },
    {
        path: '/commands-history/',
        componentUrl: './resources/pages/commands-history.html?v=1.7',
        name: 'commands-history'
    },
    {
        path: '/sim-status/',
        componentUrl: './resources/pages/sim-status.html?v=2.7',
        name: 'sim-status'
    },
    {
        path: '/set-status/',
        componentUrl: './resources/pages/set-status.html?v=2.6',
        name: 'set-status'
    },
    {
        path: '/edit-command/',
        componentUrl: './resources/pages/edit-command.html?v=2.7',
        name: 'edit-command'
    },
    {
        path: '/add-command/',
        componentUrl: './resources/pages/add-command.html?v=3.5',
        name: 'add-command'
    },

    {
        path: '/settings/',
        componentUrl: './resources/pages/settings.html?v=1.8',
        name: 'settings'
    },
	{
        path: '/my-sim-name/',
        componentUrl: './resources/pages/my-sim-name.html?v=1.9',
        name: 'my-sim-name'
    },
	{
        path: '/my-sim-remark/',
        componentUrl: './resources/pages/my-sim-remark.html?v=1.8',
        name: 'my-sim-remark'
    },
	{
        path: '/my-sim-threshold/',
        componentUrl: './resources/pages/my-sim-threshold.html?v=1.8',
        name: 'my-sim-threshold'
    },

    {
        path: '/report/',
        componentUrl: './resources/pages/report.html?v=2.3',
        name: 'report'
    },
	{
        path: '/my-sim-expired/',
        componentUrl: './resources/pages/my-sim-expired.html?v=1.8',
        name: 'my-sim-expired'
    },
	{
        path: '/sessions/',
        componentUrl: './resources/pages/sessions.html?v=2.2',
        name: 'sessions'
    },
	{
        path: '/cells/',
        componentUrl: './resources/pages/cells.html?v=2.0',
        name: 'cells'
    },
	{
        path: '/hlr/',
        componentUrl: './resources/pages/hlr.html?v=2.2',
        name: 'hlr'
    },



    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];
