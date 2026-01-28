const PLATFORM_DATA = [
            { id: 1, platform: 'Instagram', handle: '@creative_studio', icon: 'instagram', color: 'text-pink-600', bg: 'bg-pink-100', followers: '125,400', followersChange: 2.5, posts: '1,240', reach: '850,000', reachChange: 12.0, engagement: '4.8%' },
            { id: 2, platform: 'Twitter', handle: '@c_studio_official', icon: 'twitter', color: 'text-sky-500', bg: 'bg-sky-100', followers: '84,300', followersChange: -0.4, posts: '12,800', reach: '1.2M', reachChange: 5.3, engagement: '2.1%' },
            { id: 3, platform: 'YouTube', handle: 'Creative Studio TV', icon: 'youtube', color: 'text-red-600', bg: 'bg-red-100', followers: '450,000', followersChange: 8.1, posts: '340', reach: '5.6M', reachChange: 15.4, engagement: '12.5%' },
            { id: 4, platform: 'LinkedIn', handle: 'Creative Studio Inc.', icon: 'linkedin', color: 'text-blue-700', bg: 'bg-blue-100', followers: '42,000', followersChange: 1.2, posts: '156', reach: '120,000', reachChange: 3.2, engagement: '6.7%' }
        ];

        const RECENT_ACTIVITY = [
            { id: 1, type: 'comment', user: 'Alex Morgan', platform: 'Instagram', text: 'Love this new design! 😍', time: '2m ago' },
            { id: 2, type: 'share', user: 'Sarah Jenkins', platform: 'Twitter', text: 'Retweeted your post about UX trends.', time: '15m ago' },
            { id: 3, type: 'like', user: 'TechDaily', platform: 'LinkedIn', text: 'Liked your quarterly report.', time: '1h ago' },
            { id: 4, type: 'new_follower', user: 'DesignHub', platform: 'YouTube', text: 'Started following your channel.', time: '3h ago' },
        ];

        // --- State Management ---
        const state = {
            activeTab: 'dashboard',
            loading: true,
            user: {
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane@studio.com',
                avatarSeed: 'Felix'
            },
            darkMode: localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
        };

        // --- Core Functions ---

        function init() {
            applyTheme();
            renderSidebar();
            renderUser();
            
            // Simulate loading
            setTimeout(() => {
                state.loading = false;
                renderContent();
            }, 1500);

            renderContent(); // Render initial loading state
        }

        function toggleTheme() {
            state.darkMode = !state.darkMode;
            localStorage.setItem('theme', state.darkMode ? 'dark' : 'light');
            applyTheme();
        }

        function applyTheme() {
            const html = document.documentElement;
            const themeBtn = document.getElementById('theme-btn');
            
            if (state.darkMode) {
                html.classList.add('dark');
                themeBtn.innerHTML = `<i data-lucide="sun" class="w-6 h-6"></i>`;
            } else {
                html.classList.remove('dark');
                themeBtn.innerHTML = `<i data-lucide="moon" class="w-6 h-6"></i>`;
            }
            lucide.createIcons();
        }

        function toggleSidebar(show) {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('mobile-overlay');
            if (show) {
                sidebar.classList.remove('-translate-x-full');
                overlay.classList.remove('hidden');
            } else {
                sidebar.classList.add('-translate-x-full');
                overlay.classList.add('hidden');
            }
        }

        function switchTab(tab) {
            state.activeTab = tab;
            renderSidebar();
            renderContent();
            toggleSidebar(false);
        }

        function showToast(message) {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg toast-enter text-slate-800 dark:text-white';
            toast.innerHTML = `
                <div class="p-2 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <i data-lucide="check" class="w-4 h-4"></i>
                </div>
                <p class="font-medium text-sm">${message}</p>
            `;
            container.appendChild(toast);
            lucide.createIcons();

            setTimeout(() => {
                toast.classList.replace('toast-enter', 'toast-exit');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        // --- Render Helpers ---

        function getIcon(name, size = 24, classes = '') {
            // Note: In vanilla JS with Lucide CDN, we usually use <i> tags and call createIcons. 
            // This helper is for string injection.
            return `<i data-lucide="${name}" width="${size}" height="${size}" class="${classes}"></i>`;
        }

        function renderSidebar() {
            const nav = document.getElementById('nav-items');
            const items = [
                { id: 'dashboard', label: 'Overview', icon: 'layout-dashboard' },
                { id: 'analytics', label: 'Analytics', icon: 'bar-chart-3' },
                { id: 'audience', label: 'Audience', icon: 'users' },
                { type: 'separator', label: 'System' },
                { id: 'settings', label: 'Settings', icon: 'settings' }
            ];

            nav.innerHTML = items.map(item => {
                if (item.type === 'separator') {
                    return `<div class="pt-8 pb-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">${item.label}</div>`;
                }
                const isActive = state.activeTab === item.id;
                const activeClasses = isActive 
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50 hover:pl-6 dark:text-slate-400 dark:hover:bg-slate-800/50';
                
                return `
                    <button onclick="switchTab('${item.id}')" class="flex items-center w-full gap-4 px-4 py-4 text-base font-medium transition-all duration-200 rounded-xl group ${activeClasses}">
                        <i data-lucide="${item.icon}" class="w-[22px] h-[22px] transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}"></i>
                        <span>${item.label}</span>
                    </button>
                `;
            }).join('');
            lucide.createIcons();
        }

        function renderUser() {
            document.getElementById('user-avatar').src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${state.user.avatarSeed}`;
            document.getElementById('user-name-display').textContent = `${state.user.firstName} ${state.user.lastName}`;
            document.getElementById('user-email-display').textContent = state.user.email;
        }

        function renderContent() {
            const container = document.getElementById('content-container');
            container.innerHTML = '';
            
            if (state.activeTab === 'dashboard') container.innerHTML = renderDashboardView();
            else if (state.activeTab === 'analytics') container.innerHTML = renderAnalyticsView();
            else if (state.activeTab === 'audience') container.innerHTML = renderAudienceView();
            else if (state.activeTab === 'settings') container.innerHTML = renderSettingsView();

            lucide.createIcons();
        }

        // --- View HTML Generators ---

        function renderDashboardView() {
            if (state.loading) return renderLoadingSkeleton();

            return `
                <div class="space-y-8 animate-fade-in">
                    <div class="space-y-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <h1 class="text-3xl font-bold text-slate-800 dark:text-white">Social Overview</h1>
                                <p class="text-lg text-slate-500 dark:text-slate-400 mt-1">Welcome back! Here's what's happening across your accounts today.</p>
                            </div>
                            <button class="px-4 py-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors">
                                Download Report
                            </button>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                            ${PLATFORM_DATA.map(data => `
                                <div onclick="openPlatformModal(${data.id})" class="flex flex-col p-6 bg-white border border-slate-100 rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-slate-900 dark:border-slate-800 group cursor-pointer">
                                    <div class="flex items-center justify-between mb-6">
                                        <div class="flex items-center gap-4">
                                            <div class="p-3 rounded-full ${data.bg} ${data.color} bg-opacity-20 dark:bg-opacity-10 transition-transform duration-300 group-hover:scale-110">
                                                <i data-lucide="${data.icon}" class="w-7 h-7"></i>
                                            </div>
                                            <div>
                                                <h3 class="text-lg font-bold text-slate-800 dark:text-white">${data.platform}</h3>
                                                <p class="text-sm text-slate-500 dark:text-slate-400">${data.handle}</p>
                                            </div>
                                        </div>
                                        <button class="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full">
                                            <i data-lucide="more-horizontal" class="w-6 h-6"></i>
                                        </button>
                                    </div>
                                    <div class="grid grid-cols-3 gap-4 mb-6">
                                        <div class="text-center p-3 bg-slate-50 rounded-lg dark:bg-slate-800/50 group-hover:bg-emerald-50/50 dark:group-hover:bg-emerald-900/10 transition-colors">
                                            <p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Followers</p>
                                            <p class="font-bold text-slate-800 dark:text-white text-xl">${data.followers}</p>
                                            <span class="text-xs font-semibold ${data.followersChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}">
                                                ${data.followersChange > 0 ? '+' : ''}${data.followersChange}%
                                            </span>
                                        </div>
                                        <div class="text-center p-3 bg-slate-50 rounded-lg dark:bg-slate-800/50 group-hover:bg-emerald-50/50 dark:group-hover:bg-emerald-900/10 transition-colors">
                                            <p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Posts</p>
                                            <p class="font-bold text-slate-800 dark:text-white text-xl">${data.posts}</p>
                                            <span class="text-xs text-slate-400">Total</span>
                                        </div>
                                        <div class="text-center p-3 bg-slate-50 rounded-lg dark:bg-slate-800/50 group-hover:bg-emerald-50/50 dark:group-hover:bg-emerald-900/10 transition-colors">
                                            <p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Reach</p>
                                            <p class="font-bold text-slate-800 dark:text-white text-xl">${data.reach}</p>
                                            <span class="text-xs font-semibold ${data.reachChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}">
                                                ${data.reachChange > 0 ? '+' : ''}${data.reachChange}%
                                            </span>
                                        </div>
                                    </div>
                                    <div class="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <div class="flex justify-between items-center">
                                            <span class="text-sm font-medium text-slate-500 dark:text-slate-400">Engagement Rate</span>
                                            <span class="text-base font-bold text-emerald-600 dark:text-emerald-400">${data.engagement}</span>
                                        </div>
                                        <div class="w-full h-2.5 bg-slate-100 rounded-full mt-2 dark:bg-slate-800 overflow-hidden">
                                            <div class="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out group-hover:bg-emerald-400" style="width: ${data.engagement.replace('%', '') * 5}%"></div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div class="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 hover:shadow-md transition-shadow">
                            <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-6">Recent Activity</h3>
                            <div class="space-y-4">
                                ${RECENT_ACTIVITY.map(activity => `
                                    <div class="flex items-start gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-all duration-200 group cursor-default">
                                        <div class="p-3 rounded-full shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                                            activity.type === 'like' ? 'bg-pink-100 text-pink-500 dark:bg-pink-500/10 dark:text-pink-400' :
                                            activity.type === 'share' ? 'bg-blue-100 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400' :
                                            activity.type === 'comment' ? 'bg-emerald-100 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                            'bg-teal-100 text-teal-500 dark:bg-teal-500/10 dark:text-teal-400'
                                        }">
                                            <i data-lucide="${
                                                activity.type === 'like' ? 'heart' : 
                                                activity.type === 'share' ? 'share-2' : 
                                                activity.type === 'comment' ? 'message-circle' : 'users'
                                            }" class="w-5 h-5"></i>
                                        </div>
                                        <div class="flex-1">
                                            <p class="text-base text-slate-800 dark:text-slate-200">
                                                <span class="font-bold">${activity.user}</span> ${activity.text}
                                            </p>
                                            <div class="flex items-center gap-2 mt-2">
                                                <span class="text-sm font-medium text-slate-500 dark:text-slate-400">${activity.platform}</span>
                                                <span class="text-sm text-slate-300 dark:text-slate-600">•</span>
                                                <span class="text-sm text-slate-500 dark:text-slate-400">${activity.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="bg-emerald-600 rounded-xl shadow-lg p-8 text-white relative overflow-hidden transition-transform hover:scale-[1.01] duration-300">
                            <div class="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 rounded-full bg-white opacity-10 blur-2xl"></div>
                            <div class="absolute bottom-0 left-0 -ml-8 -mb-8 w-40 h-40 rounded-full bg-white opacity-10 blur-2xl"></div>
                            <h3 class="font-bold text-xl mb-3 relative z-10">Pro Tips</h3>
                            <p class="text-emerald-50 text-base mb-8 relative z-10 leading-relaxed">
                                Consistency is key! Users who post 3x a week see a 40% increase in engagement.
                            </p>
                            <button class="w-full py-3 bg-white text-emerald-600 font-bold rounded-xl shadow-sm hover:bg-emerald-50 hover:scale-[1.02] active:scale-95 transition-all duration-200 relative z-10 flex items-center justify-center gap-2">
                                <i data-lucide="arrow-up-right" class="w-5 h-5"></i>
                                Schedule New Post
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderAnalyticsView() {
            if (state.loading) return renderLoadingSkeleton();
            
            const stats = [
                { label: "Total Followers", value: "701,700", trend: "up", trendValue: "12.5%", icon: "users", color: "text-blue-600" },
                { label: "Total Posts", value: "14,536", trend: "up", trendValue: "2.1%", icon: "share-2", color: "text-purple-600" },
                { label: "Avg. Engagement", value: "6.5%", trend: "down", trendValue: "0.4%", icon: "heart", color: "text-pink-600" },
                { label: "Growth (30d)", value: "+12.5%", trend: "up", trendValue: "4.2%", icon: "trending-up", color: "text-emerald-600" }
            ];

            return `
                <div class="space-y-8 animate-fade-in">
                    <div>
                        <h1 class="text-3xl font-bold text-slate-800 dark:text-white">Detailed Analytics</h1>
                        <p class="text-lg text-slate-500 dark:text-slate-400 mt-1">Deep dive into your performance metrics over the last 30 days.</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        ${stats.map(stat => {
                            const isPos = stat.trend === 'up';
                            return `
                                <div class="relative overflow-hidden p-6 bg-white border border-slate-100 rounded-xl shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default group">
                                    <div class="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-5 dark:opacity-5 transition-transform group-hover:scale-150 ${stat.color.replace('text-', 'bg-').replace('600', '500')}"></div>
                                    <div class="flex justify-between items-start mb-4 relative z-10">
                                        <div class="p-3 rounded-xl transition-colors duration-300 ${stat.color.replace('text-', 'bg-').replace('600', '50')} ${stat.color} dark:bg-slate-800 dark:text-slate-300">
                                            <i data-lucide="${stat.icon}" class="w-6 h-6"></i>
                                        </div>
                                        <span class="flex items-center text-sm font-bold ${isPos ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                                            <i data-lucide="${isPos ? 'arrow-up-right' : 'arrow-down-right'}" class="w-4 h-4 mr-1"></i>
                                            ${stat.trendValue}
                                        </span>
                                    </div>
                                    <div class="relative z-10">
                                        <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">${stat.label}</h3>
                                        <p class="text-3xl font-bold text-slate-800 dark:text-white mt-1">${stat.value}</p>
                                    </div>
                                    <div class="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-4 overflow-hidden">
                                        <div class="h-full rounded-full ${isPos ? 'bg-green-500' : 'bg-red-500'} w-2/3 opacity-70"></div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <div class="flex justify-between items-center mb-8">
                                <h3 class="text-xl font-bold text-slate-800 dark:text-white">Growth Trends</h3>
                                <select class="bg-slate-50 dark:bg-slate-800 border-none text-sm font-medium rounded-lg px-3 py-2 text-slate-600 dark:text-slate-300 outline-none hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                    <option>Last 30 Days</option>
                                    <option>Last 90 Days</option>
                                </select>
                            </div>
                            <div class="h-72 flex items-end justify-between gap-3 px-2">
                                ${[60, 75, 50, 95].map(h => `
                                    <div class="w-full h-full bg-emerald-50 dark:bg-emerald-500/5 rounded-t-lg relative group flex items-end cursor-pointer">
                                        <div class="w-full bg-emerald-500 rounded-t-lg transition-all duration-500 ease-out group-hover:bg-emerald-400 relative" style="height: ${h}%">
                                             <div class="opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 dark:bg-slate-700 text-white text-sm font-semibold py-1.5 px-3 rounded-lg pointer-events-none transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 shadow-xl whitespace-nowrap z-10">
                                                ${h * 100} Followers
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="flex justify-between mt-6 text-sm font-medium text-slate-400 dark:text-slate-500">
                                <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
                            </div>
                        </div>

                        <div class="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                             <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-8">Engagement Source</h3>
                             <div class="h-72 flex items-center justify-center relative group">
                                <svg viewBox="0 0 100 100" class="w-56 h-56 -rotate-90 transform transition-transform duration-700 group-hover:scale-105">
                                    <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="8" fill="transparent" class="text-emerald-50 dark:text-slate-800" />
                                    <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="8" fill="transparent" stroke-dasharray="213.5 251.2" stroke-linecap="round" class="text-emerald-500 transition-all duration-1000 ease-out group-hover:text-emerald-400" />
                                </svg>
                                <div class="absolute inset-0 flex flex-col items-center justify-center">
                                    <span class="block text-4xl font-bold text-emerald-600 dark:text-emerald-400 transition-transform group-hover:scale-110 duration-300">85%</span>
                                    <span class="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Mobile Traffic</span>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4 mt-8">
                                <div class="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div class="w-4 h-4 rounded-full bg-emerald-500 shadow-sm"></div>
                                    <span class="text-base font-medium text-slate-600 dark:text-slate-300">Mobile App</span>
                                </div>
                                <div class="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div class="w-4 h-4 rounded-full bg-emerald-100 dark:bg-slate-800 shadow-sm"></div>
                                    <span class="text-base font-medium text-slate-600 dark:text-slate-300">Desktop Web</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderAudienceView() {
            const locations = [
                { country: 'United States', pct: 45, color: 'bg-blue-500' },
                { country: 'United Kingdom', pct: 22, color: 'bg-blue-400' },
                { country: 'Canada', pct: 15, color: 'bg-blue-300' },
                { country: 'Germany', pct: 8, color: 'bg-blue-200' }
            ];
            
            return `
                <div class="space-y-8 animate-fade-in">
                    <div>
                        <h1 class="text-3xl font-bold text-slate-800 dark:text-white">Audience Insights</h1>
                        <p class="text-lg text-slate-500 dark:text-slate-400 mt-1">Understand who follows you and where they are from.</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <div class="flex items-center gap-3 mb-6">
                                <div class="p-3 bg-blue-100 text-blue-600 rounded-xl dark:bg-blue-500/10 dark:text-blue-400"><i data-lucide="globe" class="w-6 h-6"></i></div>
                                <h3 class="text-lg font-bold text-slate-800 dark:text-white">Top Locations</h3>
                            </div>
                            <div class="space-y-5">
                                ${locations.map(loc => `
                                    <div>
                                        <div class="flex justify-between text-sm font-medium mb-2">
                                            <span class="text-slate-700 dark:text-slate-300">${loc.country}</span>
                                            <span class="font-bold text-slate-900 dark:text-white">${loc.pct}%</span>
                                        </div>
                                        <div class="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div class="h-full rounded-full ${loc.color}" style="width: ${loc.pct}%"></div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <div class="flex items-center gap-3 mb-6">
                                <div class="p-3 bg-pink-100 text-pink-600 rounded-xl dark:bg-pink-500/10 dark:text-pink-400"><i data-lucide="users" class="w-6 h-6"></i></div>
                                <h3 class="text-lg font-bold text-slate-800 dark:text-white">Age Distribution</h3>
                            </div>
                            <div class="flex items-end justify-between h-56 px-2 gap-3">
                                ${[{ label: '18-24', height: '60%' }, { label: '25-34', height: '85%' }, { label: '35-44', height: '45%' }, { label: '45+', height: '20%' }].map(age => `
                                    <div class="w-full h-full flex flex-col justify-end items-center gap-2">
                                        <div class="w-full flex-1 bg-pink-50 dark:bg-pink-500/5 rounded-t-xl relative group overflow-hidden">
                                            <div class="absolute bottom-0 w-full bg-pink-500 rounded-t-xl transition-all duration-300 group-hover:bg-pink-400" style="height: ${age.height}"></div>
                                        </div>
                                        <span class="text-sm font-medium text-slate-500 dark:text-slate-400">${age.label}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <div class="flex items-center gap-3 mb-6">
                                <div class="p-3 bg-emerald-100 text-emerald-600 rounded-xl dark:bg-emerald-500/10 dark:text-emerald-400"><i data-lucide="user" class="w-6 h-6"></i></div>
                                <h3 class="text-lg font-bold text-slate-800 dark:text-white">Gender Split</h3>
                            </div>
                             <div class="flex flex-col items-center justify-center h-56 space-y-6">
                                <div class="flex items-center justify-between w-full">
                                    <span class="text-base font-medium text-slate-600 dark:text-slate-300">Female</span>
                                    <span class="text-xl font-bold text-slate-900 dark:text-white">58%</span>
                                </div>
                                <div class="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
                                    <div class="h-full bg-emerald-400 w-[58%] shadow-sm"></div>
                                    <div class="h-full bg-slate-300 dark:bg-slate-700 flex-1"></div>
                                </div>
                                <div class="flex items-center justify-between w-full">
                                    <span class="text-base font-medium text-slate-600 dark:text-slate-300">Male</span>
                                    <span class="text-xl font-bold text-slate-900 dark:text-white">42%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderSettingsView() {
            return `
                <div class="max-w-2xl space-y-8 animate-fade-in">
                    <div>
                        <h1 class="text-3xl font-bold text-slate-800 dark:text-white">Settings</h1>
                        <p class="text-lg text-slate-500 dark:text-slate-400 mt-1">Manage your account preferences and notifications.</p>
                    </div>
                    
                    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div class="p-6 border-b border-slate-100 dark:border-slate-800">
                            <h3 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                                <i data-lucide="user" class="w-6 h-6 text-emerald-500"></i>
                                Profile Information
                            </h3>
                        </div>
                        <div class="p-8 space-y-6">
                            <div class="grid grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">First Name</label>
                                    <input type="text" id="input-fn" value="${state.user.firstName}" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" />
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Last Name</label>
                                    <input type="text" id="input-ln" value="${state.user.lastName}" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" />
                                </div>
                            </div>
                            <div class="space-y-2">
                                <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                                <input type="email" id="input-email" value="${state.user.email}" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" />
                            </div>
                            <div class="pt-4">
                                <button onclick="saveProfile()" class="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 hover:shadow-lg transform active:scale-95 transition-all duration-200 flex items-center gap-2">
                                    <i data-lucide="save" class="w-5 h-5"></i>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        function renderLoadingSkeleton() {
            return `
                 <div class="space-y-8">
                     <div class="h-8 bg-slate-200 dark:bg-slate-800 w-1/3 rounded-lg animate-pulse"></div>
                     <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        ${[1,2,3,4].map(() => `<div class="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>`).join('')}
                     </div>
                 </div>
            `;
        }

        // --- Interactive Actions ---

        function openPlatformModal(id) {
            const platform = PLATFORM_DATA.find(p => p.id === id);
            if (!platform) return;

            const modalContainer = document.getElementById('modal-container');
            modalContainer.classList.remove('hidden');
            
            modalContainer.innerHTML = `
                <div class="fixed inset-0 flex items-center justify-center p-4">
                    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onclick="closeModal()"></div>
                    <div class="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-enter border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] z-50">
                        <div class="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                            <div class="flex items-center gap-4">
                                <div class="p-3 rounded-full ${platform.bg} ${platform.color} bg-opacity-20 dark:bg-opacity-10">
                                    <i data-lucide="${platform.icon}" class="w-7 h-7"></i>
                                </div>
                                <div>
                                    <h2 class="text-2xl font-bold text-slate-800 dark:text-white">${platform.platform} Overview</h2>
                                    <p class="text-sm text-slate-500 dark:text-slate-400">${platform.handle}</p>
                                </div>
                            </div>
                            <button onclick="closeModal()" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                                <i data-lucide="x" class="w-6 h-6"></i>
                            </button>
                        </div>
                        
                        <div class="p-6 overflow-y-auto custom-scrollbar">
                            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                <div class="p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl flex flex-col items-center text-center">
                                    <span class="text-sm font-medium text-slate-500">Followers</span>
                                    <span class="text-2xl font-bold text-slate-800 dark:text-white mt-1">${platform.followers}</span>
                                </div>
                                <div class="p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl flex flex-col items-center text-center">
                                    <span class="text-sm font-medium text-slate-500">Posts</span>
                                    <span class="text-2xl font-bold text-slate-800 dark:text-white mt-1">${platform.posts}</span>
                                </div>
                                <div class="p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl flex flex-col items-center text-center">
                                    <span class="text-sm font-medium text-slate-500">Engagement</span>
                                    <span class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">${platform.engagement}</span>
                                </div>
                                <div class="p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl flex flex-col items-center text-center">
                                    <span class="text-sm font-medium text-slate-500">Growth</span>
                                    <span class="text-2xl font-bold text-slate-800 dark:text-white mt-1 flex items-center gap-1">
                                        ${platform.followersChange}% 
                                        <i data-lucide="${platform.followersChange >= 0 ? 'arrow-up-right' : 'arrow-down-right'}" class="w-4 h-4 ${platform.followersChange >= 0 ? 'text-green-500' : 'text-red-500'}"></i>
                                    </span>
                                </div>
                            </div>
                            
                            <h3 class="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                <i data-lucide="thumbs-up" class="w-4 h-4 text-emerald-500"></i> Top Performing Posts
                            </h3>
                            <div class="space-y-3 mb-6">
                                ${[1,2].map(() => `
                                    <div class="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 bg-white dark:bg-slate-800/20">
                                        <div class="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg shrink-0"></div>
                                        <div class="flex-1">
                                            <p class="text-sm font-medium text-slate-800 dark:text-slate-200">Big announcement coming next week!</p>
                                            <div class="flex gap-3 mt-2 text-xs text-slate-500">
                                                <span class="flex items-center gap-1"><i data-lucide="heart" class="w-3 h-3"></i> 2.4k</span>
                                                <span class="flex items-center gap-1"><i data-lucide="message-circle" class="w-3 h-3"></i> 145</span>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3 shrink-0">
                            <button onclick="closeModal()" class="px-5 py-2.5 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">Close</button>
                            <button onclick="closeModal(); switchTab('analytics')" class="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 hover:shadow-md transition-all active:scale-95">View Full Analytics</button>
                        </div>
                    </div>
                </div>
            `;
            lucide.createIcons();
            
            // Add ESC listener
            document.addEventListener('keydown', handleEsc);
        }

        function closeModal() {
            document.getElementById('modal-container').classList.add('hidden');
            document.removeEventListener('keydown', handleEsc);
        }

        function handleEsc(e) {
            if (e.key === 'Escape') closeModal();
        }

        function saveProfile() {
            const fn = document.getElementById('input-fn').value;
            const ln = document.getElementById('input-ln').value;
            const email = document.getElementById('input-email').value;

            state.user = {
                firstName: fn,
                lastName: ln,
                email: email,
                avatarSeed: fn
            };

            renderUser();
            showToast('Profile updated successfully!');
        }

        // --- Start App ---
        init();