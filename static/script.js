function showAuthPanel(mode) {
    const loginPanel = document.getElementById('loginPanel');
    const registerPanel = document.getElementById('registerPanel');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');

    if (!loginPanel || !registerPanel || !loginTab || !registerTab) {
        return;
    }

    const isLogin = mode === 'login';
    loginPanel.classList.toggle('active', isLogin);
    registerPanel.classList.toggle('active', !isLogin);
    loginTab.classList.toggle('active', isLogin);
    registerTab.classList.toggle('active', !isLogin);
}

function openAuth(mode) {
    const modal = document.getElementById('authModal');

    if (!modal) {
        return;
    }

    showAuthPanel(mode || 'login');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeAuth() {
    const modal = document.getElementById('authModal');

    if (!modal) {
        return;
    }

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.addEventListener('click', (event) => {
    const modal = document.getElementById('authModal');

    if (modal && event.target === modal) {
        closeAuth();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeAuth();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const authOpenMode = document.body.getAttribute('data-auth-open');
    const homeButtons = document.querySelectorAll('[data-home-target]');
    const homePanels = document.querySelectorAll('[data-home-panel]');
    const reportSearch = document.getElementById('reportSearch');
    const reportItems = document.querySelectorAll('[data-report-name]');
    const reportSearchEmpty = document.getElementById('reportSearchEmpty');

    const setHomePanel = (targetId) => {
        if (!targetId) {
            return;
        }

        homeButtons.forEach((button) => {
            const isActive = button.getAttribute('data-home-target') === targetId;
            button.classList.toggle('active', isActive);
            button.classList.toggle('button-ghost', !isActive);
        });

        homePanels.forEach((panel) => {
            const isActive = panel.id === targetId;
            panel.hidden = !isActive;
            panel.classList.toggle('active', isActive);
        });
    };

    homeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            setHomePanel(button.getAttribute('data-home-target'));
        });
    });

    if (homeButtons.length > 0) {
        setHomePanel(homeButtons[0].getAttribute('data-home-target'));
    }

    if (authOpenMode) {
        openAuth(authOpenMode);
    }

    if (reportSearch) {
        reportSearch.addEventListener('input', () => {
            const query = reportSearch.value.trim().toLowerCase();
            let visibleCount = 0;

            reportItems.forEach((item) => {
                const matches = item.getAttribute('data-report-name').includes(query);
                item.hidden = !matches;
                if (matches) {
                    visibleCount += 1;
                }
            });

            if (reportSearchEmpty) {
                reportSearchEmpty.hidden = visibleCount !== 0;
            }
        });
    }

    document.querySelectorAll('[data-progress]').forEach((bar) => {
        const value = Number(bar.getAttribute('data-progress'));
        if (!Number.isNaN(value)) {
            requestAnimationFrame(() => {
                bar.style.width = `${value}%`;
            });
        }
    });
});