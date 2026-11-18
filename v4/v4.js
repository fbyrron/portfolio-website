const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
    const setNavigationOpen = open => {
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        siteNav.classList.toggle('is-open', open);
        document.body.classList.toggle('menu-open', open);
        if (open) document.querySelector('.site-header')?.classList.remove('is-hidden');
    };

    navToggle.addEventListener('click', () => {
        setNavigationOpen(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    siteNav.addEventListener('click', event => {
        if (event.target.closest('a')) setNavigationOpen(false);
    });

    document.addEventListener('click', event => {
        if (navToggle.getAttribute('aria-expanded') === 'true'
            && !siteNav.contains(event.target)
            && !navToggle.contains(event.target)) {
            setNavigationOpen(false);
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
            setNavigationOpen(false);
            navToggle.focus();
        }
    });
}

const siteHeader = document.querySelector('.site-header');
let lastScrollPosition = window.scrollY;
let headerScrollFrame = false;

window.addEventListener('scroll', () => {
    if (headerScrollFrame) return;
    headerScrollFrame = true;
    requestAnimationFrame(() => {
        const currentScrollPosition = window.scrollY;
        const scrollDelta = currentScrollPosition - lastScrollPosition;
        const menuOpen = navToggle?.getAttribute('aria-expanded') === 'true';

        if (currentScrollPosition < 90 || menuOpen || siteHeader?.contains(document.activeElement)) {
            siteHeader?.classList.remove('is-hidden');
        } else if (scrollDelta > 8) {
            siteHeader?.classList.add('is-hidden');
        } else if (scrollDelta < -6) {
            siteHeader?.classList.remove('is-hidden');
        }

        lastScrollPosition = currentScrollPosition;
        headerScrollFrame = false;
    });
}, { passive: true });

document.addEventListener('focusin', event => {
    if (siteHeader?.contains(event.target)) siteHeader.classList.remove('is-hidden');
});

const revealItems = document.querySelectorAll('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('is-visible'));
} else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    revealItems.forEach(item => revealObserver.observe(item));
}

const portraitCarousel = document.querySelector('.hero-portrait-card');
const portraitControlGroup = document.querySelector('.portrait-controls');
const heroPortraits = [...(portraitCarousel?.querySelectorAll(':scope > img') || [])];
const portraitDots = [...(portraitControlGroup?.querySelectorAll('[data-portrait-index]') || [])];
if (heroPortraits.length > 1 && portraitCarousel) {
    let activePortraitIndex = heroPortraits.findIndex(image => image.classList.contains('is-active'));
    if (activePortraitIndex < 0) activePortraitIndex = 0;

    const showPortrait = index => {
        activePortraitIndex = (index + heroPortraits.length) % heroPortraits.length;
        const previousIndex = (activePortraitIndex - 1 + heroPortraits.length) % heroPortraits.length;
        const nextIndex = (activePortraitIndex + 1) % heroPortraits.length;

        heroPortraits.forEach((image, imageIndex) => {
            image.classList.toggle('is-active', imageIndex === activePortraitIndex);
            image.classList.toggle('is-before', imageIndex === previousIndex);
            image.classList.toggle('is-after', imageIndex === nextIndex);
            image.setAttribute('aria-hidden', String(imageIndex !== activePortraitIndex));
        });
        portraitDots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === activePortraitIndex;
            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-pressed', String(isActive));
        });
    };

    portraitControlGroup?.querySelector('[data-portrait-prev]')?.addEventListener('click', () => showPortrait(activePortraitIndex - 1));
    portraitControlGroup?.querySelector('[data-portrait-next]')?.addEventListener('click', () => showPortrait(activePortraitIndex + 1));
    portraitDots.forEach((dot, index) => dot.addEventListener('click', () => showPortrait(index)));

    let touchStart = null;
    portraitCarousel.addEventListener('pointerdown', event => {
        if (event.pointerType === 'touch') touchStart = { x: event.clientX, y: event.clientY };
    }, { passive: true });
    portraitCarousel.addEventListener('pointerup', event => {
        if (!touchStart) return;
        const deltaX = event.clientX - touchStart.x;
        const deltaY = event.clientY - touchStart.y;
        touchStart = null;
        if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
        showPortrait(activePortraitIndex + (deltaX < 0 ? 1 : -1));
    }, { passive: true });
    portraitCarousel.addEventListener('pointercancel', () => { touchStart = null; });

    showPortrait(activePortraitIndex);
    if (!reducedMotion) window.setInterval(() => showPortrait(activePortraitIndex + 1), 6500);
}

document.querySelectorAll('.project-card').forEach(card => {
    const visual = card.querySelector('.project-visual');
    const detailTrigger = card.querySelector('.project-meta > div');
    const title = card.querySelector('.project-meta h2, .project-meta h3')?.textContent.trim();

    if (visual && detailTrigger) {
        detailTrigger.setAttribute('role', 'button');
        detailTrigger.setAttribute('tabindex', '0');
        detailTrigger.setAttribute('aria-haspopup', 'dialog');
        detailTrigger.setAttribute('aria-label', `Open ${title || 'project'} details`);
    }

    visual?.setAttribute('aria-haspopup', 'dialog');
});

let customCursor = null;
const detailDialog = document.querySelector('.detail-dialog');
const detailDialogContent = detailDialog?.querySelector('.detail-dialog-content');
const detailDialogClose = detailDialog?.querySelector('.detail-dialog-close');
const awardDetailImages = {
    '3rd Golden Sphere Awards': ['assets/images/awards/golden-sphere-2.jpg'],
    'Best Capstone Project': ['assets/images/awards/best-capstone-2.jpg'],
    'Magna Cum Laude': ['assets/images/awards/magna2.jpg'],
    'AMY Innovation Awards 2024 – 2nd Place': ['assets/images/awards/amy2.jpg', 'assets/images/awards/amy3.jpg'],
    'AppCon 2023': ['assets/images/awards/appcon2.jpg', 'assets/images/awards/appcon3.jpg'],
    'AWS - Pointwest Gen AI Hackathon – Finalist': ['assets/images/awards/genai2.jpg', 'assets/images/awards/genai3.jpg', 'assets/images/awards/genai4.jpg']
};
let detailDialogOpener = null;

function appendDialogLink(container, href, label) {
    const link = document.createElement('a');
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = label;
    container.append(link);
}

function openDetailDialog({ eyebrow, title, image, imageAlt, description, tags = [], links = [], extraImages = [], extraImagesLabel }, opener) {
    if (!detailDialog || !detailDialogContent || !detailDialogClose || detailDialog.open) return;

    detailDialogOpener = opener;
    opener?.focus({ preventScroll: true });
    detailDialogContent.replaceChildren();

    const label = document.createElement('p');
    label.className = 'detail-dialog-eyebrow';
    label.textContent = eyebrow;
    const heading = document.createElement('h2');
    heading.id = 'detail-dialog-title';
    heading.textContent = title;
    detailDialogContent.append(label, heading);

    if (image) {
        const preview = document.createElement('img');
        preview.className = 'detail-dialog-image';
        preview.src = image;
        preview.alt = imageAlt || title;
        detailDialogContent.append(preview);
    }

    if (extraImages.length) {
        const gallerySection = document.createElement('section');
        gallerySection.className = 'detail-dialog-gallery';
        if (extraImagesLabel) {
            const galleryHeading = document.createElement('h3');
            galleryHeading.textContent = extraImagesLabel;
            gallerySection.append(galleryHeading);
        }
        const gallery = document.createElement('div');
        gallery.className = 'detail-dialog-award-images';
        extraImages.forEach(({ src, alt }) => {
            const preview = document.createElement('img');
            preview.src = src;
            preview.alt = alt;
            gallery.append(preview);
        });
        gallerySection.append(gallery);
        detailDialogContent.append(gallerySection);
    }

    if (description) {
        const copy = document.createElement('p');
        copy.className = 'detail-dialog-description';
        copy.textContent = description;
        detailDialogContent.append(copy);
    }

    if (tags.length) {
        const tagList = document.createElement('div');
        tagList.className = 'detail-dialog-tags';
        tags.forEach(text => {
            const tag = document.createElement('span');
            tag.textContent = text;
            tagList.append(tag);
        });
        detailDialogContent.append(tagList);
    }

    if (links.length) {
        const actions = document.createElement('div');
        actions.className = 'detail-dialog-links';
        links.forEach(({ href, label: linkLabel }) => appendDialogLink(actions, href, linkLabel));
        detailDialogContent.append(actions);
    }

    detailDialog.showModal();
    if (customCursor?.showPopover) {
        if (customCursor.matches(':popover-open')) customCursor.hidePopover();
        customCursor.showPopover();
    }
    detailDialogClose.focus({ preventScroll: true });
}

const actualProjectScreenshots = {
    'Ecommunity.ph': ['assets/images/projects/ecommunity.jpg'],
    'iNUvation Voting System': ['assets/images/projects/inuvation1.jpg', 'assets/images/projects/inuvation2.jpg'],
    'HydroGrowth': ['assets/images/projects/hydrogrowth.jpg'],
    'Medicine Vending Machine': ['assets/images/projects/medicine-vending1.jpg', 'assets/images/projects/medicine-vending2.jpg'],
    'Bldg126': ['assets/images/projects/bldg126.jpg'],
    'Merchandise POS': ['assets/images/projects/merchandise-pos1.jpg', 'assets/images/projects/merchandise-pos2.jpg', 'assets/images/projects/merchandise-pos3.jpg'],
    'LoanLedger': ['../assets/images/projects/loan-ledger.png'],
    'SprintTrackerNest': ['assets/sprinttrackernest-actual.png']
};

const projectPopupLinks = {
    'Ecommunity.ph': [
        { href: 'https://ecommunity.ph', label: 'https://ecommunity.ph ↗︎' },
        { href: 'https://www.youtube.com/watch?v=MZWhS6y7qc0', label: 'Video presentation ↗︎' }
    ],
    'HydroGrowth': [{ href: 'assets/hydrogrowth-showcase.webp', label: 'Open full-size preview ↗︎' }],
    'Medicine Vending Machine': [{ href: 'assets/medicine-vending-kiosk.webp', label: 'Open full-size preview ↗︎' }],
    'Timesheet Automation (XM)': [{ href: 'assets/xm-run-summary.webp', label: 'Open full-size preview ↗︎' }],
    'LoanLedger': [{ href: 'https://loanledger-one.vercel.app/', label: 'Open live app ↗︎' }],
    'SprintTrackerNest': [{ href: 'SprintTrackerNest-Setup-Guide.html', label: 'Open setup guide ↗︎' }]
};

function getActualScreenshots(title) {
    return (actualProjectScreenshots[title] || []).map((src, index) => ({
        src,
        alt: `${title} actual screenshot ${index + 1}`
    }));
}

function openProjectDialog(card, visual, opener = visual) {
    const title = card.querySelector('.project-meta h2, .project-meta h3')?.textContent.trim();
    const image = visual.querySelector('img');
    const shortDescription = card.querySelector('.project-meta > div > p:not(.project-tech)')?.textContent.trim();
    const description = projectDescriptions[title] || shortDescription;
    const technologyText = card.querySelector('.project-tech')?.textContent
        || card.querySelector('[data-popup-technologies]')?.dataset.popupTechnologies
        || card.querySelector('.project-meta > span:not(.project-links)')?.textContent;
    const technologies = technologyText?.split('·').map(text => text.trim()) || [];
    const category = visual.querySelector('.project-index')?.textContent.replace(/^\d+\s*\/\s*/, '').trim();
    const links = [
        ...[...card.querySelectorAll('.project-links a')].map(link => ({ href: link.href, label: link.textContent.trim() })),
        ...(projectPopupLinks[title] || [])
    ];
    const target = new URL(visual.href, window.location.href);

    if (!links.length && target.href !== window.location.href && !target.pathname.endsWith('.html')) {
        const isImage = /\.(avif|gif|jpe?g|png|webp)$/i.test(target.pathname);
        links.push({ href: target.href, label: isImage ? 'Open full-size preview ↗︎' : 'Open project ↗︎' });
    } else if (!links.length && target.pathname.endsWith('.html')) {
        links.push({ href: target.href, label: 'View in project collection ↗︎' });
    }

    openDetailDialog({
        eyebrow: category || 'Selected work',
        title: title || 'Project details',
        image: image?.src,
        imageAlt: image?.alt,
        description,
        tags: technologies,
        links,
        extraImages: getActualScreenshots(title),
        extraImagesLabel: 'Actual screenshots:'
    }, opener);
}

const projectDescriptions = {
    'Ecommunity.ph': 'A mobile-based solid-waste management system designed for the Baliwag community. It brings collection schedules, waste-segregation guidance, junkshop transactions, and educational content together in one app. Built with Flutter, Dart, and Firebase.',
    'iNUvation Voting System': 'A campus voting platform with a web experience for voters and a desktop administration app for election management. It includes live tallying and was used by about 400 students. The project combined React, Flutter, Firebase, C#, and HTML.',
    'HydroGrowth': 'A connected hydroponics project that brings sensor readings into a mobile interface. It monitors pH, temperature, nutrient levels, and water level so growers can see system conditions as they change. Built with Java, Firebase, and hardware sensors.',
    'Medicine Vending Machine': 'A tablet-style kiosk concept that lets people browse medicines and place an order. The workflow connects online payment with automatic dispensing hardware, bringing the customer-facing interface and physical machine into one experience. Built with Flutter, Firebase, and PayMongo.',
    'XM Timesheet Automation': 'A browser-automation workflow that takes spreadsheet-based timesheet entries through a run with visible progress and reviewable results. A typical run was reduced from about 30 minutes to about 2 minutes. The displayed run uses synthetic sample data.',
    'Bldg126': 'A minimalist website for a creative company producing visual work and graphic design for content creators. The project focused on presenting the studio and its work through a clear, lightweight web experience built with HTML and CSS.',
    'Merchandise POS': 'A point-of-sale app for day-to-day merchandise operations, combining sales and inventory with QR scanning, GCash, expenses, credits, and reporting. Built as a Flutter app backed by Firebase.',
    'LoanLedger': 'A loan and debt tracker with authentication and Firestore-backed records. It pairs a focused lending dashboard with serverless email notifications, using React, TypeScript, Firebase, and Cloud Functions.',
    'SprintTrackerNest': 'A VS Code extension that keeps Jira sprint context close to the development workflow. It surfaces sprint health, business days remaining, team progress, and ticket status using the Jira REST API.',
    'Bill Splitter': 'A web tool for entering a receipt and splitting group costs by individual item, shared portions, or percentages. It is built with Java and Spring Boot, with REST APIs connecting the interface and application logic.',
    'Location-Based Alarm': 'A mobile alarm experience built around geofencing. People can choose a location on a map, use background location monitoring, receive notifications when they reach the area, and review local alarm history.',
    'LPL References': 'A developer tool for exploring Infor Landmark Pattern Language workspaces. It indexes workspace symbols, shows inline reference counts, and helps navigate directly to usages through the VS Code API.',
    'Music Note to Sound': 'An audio utility that reads musical note sequences, calculates their frequencies, and synthesizes audible tones. The project uses TypeScript and Node.js, with Vitest for automated tests.',
    'Prompt Playground': 'An interactive learning site for prompt engineering and AI concepts. It combines guided materials and practical challenges in a browser-based experience built with HTML, CSS, JavaScript, and Bootstrap.',
    'Birthday Invitation Site': 'A live, fairy-themed birthday invitation website with event details, RSVP, and sharing. The invitation itself is the project preview; the deployed site is available to explore.',
    'Timesheet Automation (XM)': 'A browser-automation workflow that takes spreadsheet-based timesheet entries through a run with visible progress and reviewable results. A typical run was reduced from about 30 minutes to about 2 minutes. The displayed run uses synthetic sample data.'
};

document.querySelectorAll('.project-visual').forEach(visual => {
    visual.addEventListener('click', event => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        openProjectDialog(visual.closest('.project-card'), visual);
    });
});

document.querySelectorAll('.project-meta > div[role="button"]').forEach(trigger => {
    const openFromMeta = () => {
        const card = trigger.closest('.project-card');
        const visual = card?.querySelector('.project-visual');
        if (card && visual) openProjectDialog(card, visual, trigger);
    };

    trigger.addEventListener('click', openFromMeta);
    trigger.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        openFromMeta();
    });
});

function openRecognitionDialog(card) {
    const heading = card.querySelector('h3');
    const mainImage = card.querySelector('img');
    const isCredential = card.classList.contains('credential-card');
    const title = heading?.textContent.trim() || 'Recognition';
    const description = isCredential
        ? card.querySelector(':scope > div:last-child > p')?.textContent.trim()
        : ({
            '3rd Golden Sphere Awards': 'Recognized at the 3rd Golden Sphere Awards for student leadership, including the Executive Director’s List (Rank 5) and Excellent Effort Award. The recognition also includes nominations for Commitment to Service and Outstanding Special Interest Organization, reflecting contributions to the student technology community.',
            'Best Capstone Project': 'Selected as the Best Capstone Project among the graduating BSIT groups at National University – Bulacan.',
            'Magna Cum Laude': 'Graduated with Latin honors in the Bachelor of Science in Information Technology program at National University – Baliwag.',
            'AMY Innovation Awards 2024 – 2nd Place': 'Awarded second place in the 2024 Alfredo M. Yao (AMY) Innovation Awards, organized by the Philippine Chamber of Commerce and Industry. The competition recognizes innovative ideas and solutions developed by student teams.',
            'Ecothon': 'Placed among the Top 11 finalists in an ASEAN-wide sustainability hackathon focused on eco-entrepreneurship and responsible consumption.',
            'AppCon 2023': 'Reached the Top 20 out of 222 participants in the AppCon 2023 Invitational Application Development Contest, organized by OTIS Philippines.',
            'AWS–Pointwest Gen AI Hackathon': 'Selected as a finalist in the AWS–Pointwest Gen AI Hackathon, a competition challenging teams to build generative AI solutions for real-world organizational needs using AWS cloud technologies.',
            'AWS - Pointwest Gen AI Hackathon – Finalist': 'Selected as a finalist in the AWS–Pointwest Gen AI Hackathon, a competition challenging teams to build generative AI solutions for real-world organizational needs using AWS cloud technologies.',
            'University Academic Excellence Benefit': 'Awarded the University Academic Excellence Benefit (UAEB), a scholarship covering 100% of tuition and miscellaneous fees.'
        })[title] || card.querySelector('p')?.textContent.trim();
    const issuer = isCredential ? card.querySelector('.credential-top span')?.textContent.trim() : null;
    const verifyLink = isCredential ? card.querySelector('a[href]') : null;
    const secondaryImages = (awardDetailImages[title] || []).map(src => ({ src, alt: `${title} additional recognition photo` }));

    openDetailDialog({
        eyebrow: issuer || card.querySelector('.card-eyebrow')?.textContent.trim() || 'Recognition',
        title,
        image: mainImage?.src,
        imageAlt: mainImage?.alt,
        description,
        tags: isCredential ? [] : ['Award & recognition'],
        extraImages: secondaryImages,
        links: verifyLink ? [{ href: verifyLink.href, label: `Verify on ${new URL(verifyLink.href).hostname} ↗︎` }] : []
    }, card);
}

document.querySelectorAll('.recognition-card[role="button"], .credential-card[role="button"]').forEach(card => {
    card.addEventListener('click', event => {
        if (event.target.closest('a')) return;
        openRecognitionDialog(card);
    });
    card.addEventListener('keydown', event => {
        if (event.target !== card || (event.key !== 'Enter' && event.key !== ' ')) return;
        event.preventDefault();
        openRecognitionDialog(card);
    });
});

if (detailDialog) {
    detailDialogClose?.addEventListener('click', () => detailDialog.close());
    detailDialog.addEventListener('click', event => {
        if (event.target === detailDialog) detailDialog.close();
    });
    detailDialog.addEventListener('close', () => {
        const opener = detailDialogOpener;
        detailDialogOpener = null;
        requestAnimationFrame(() => {
            if (opener?.isConnected) opener.focus({ preventScroll: true });
        });
    });
}

const workRail = document.querySelector('#work-rail');
const railProgress = document.querySelector('.rail-progress > span');
const previousProject = document.querySelector('.rail-previous');
const nextProject = document.querySelector('.rail-next');

if (workRail && railProgress && previousProject && nextProject) {
    const updateWorkRail = () => {
        const maxScroll = workRail.scrollWidth - workRail.clientWidth;
        const progress = maxScroll > 0 ? workRail.scrollLeft / maxScroll : 0;
        railProgress.style.width = `${Math.max(8, progress * 100)}%`;
        previousProject.disabled = workRail.scrollLeft <= 2;
        nextProject.disabled = workRail.scrollLeft >= maxScroll - 2;
    };

    previousProject.addEventListener('click', () => workRail.scrollBy({ left: -workRail.clientWidth * 0.82, behavior: reducedMotion ? 'auto' : 'smooth' }));
    nextProject.addEventListener('click', () => workRail.scrollBy({ left: workRail.clientWidth * 0.82, behavior: reducedMotion ? 'auto' : 'smooth' }));
    workRail.addEventListener('scroll', updateWorkRail, { passive: true });
    window.addEventListener('resize', updateWorkRail, { passive: true });
    updateWorkRail();
}

const contactAction = document.querySelector('[data-contact-action]');
if (contactAction) {
    let contactIsOpening = false;
    let mailAppTookFocus = false;
    const contactLabel = contactAction.firstChild;

    const resetContactAction = () => {
        if (!contactIsOpening || !mailAppTookFocus) return;
        contactIsOpening = false;
        mailAppTookFocus = false;
        contactAction.removeAttribute('aria-disabled');
        if (contactLabel?.nodeType === Node.TEXT_NODE) contactLabel.textContent = 'Start a conversation ';
    };

    contactAction.addEventListener('click', event => {
        if (contactIsOpening) {
            event.preventDefault();
            return;
        }

        contactIsOpening = true;
        contactAction.setAttribute('aria-disabled', 'true');
        contactAction.setAttribute('aria-live', 'polite');
        if (contactLabel?.nodeType === Node.TEXT_NODE) contactLabel.textContent = 'Opening your email app… ';
    });

    window.addEventListener('blur', () => {
        if (contactIsOpening) mailAppTookFocus = true;
    });
    window.addEventListener('pagehide', () => {
        if (contactIsOpening) mailAppTookFocus = true;
    });
    window.addEventListener('focus', resetContactAction);
    window.addEventListener('pageshow', resetContactAction);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' && contactIsOpening) {
            mailAppTookFocus = true;
        } else if (document.visibilityState === 'visible') {
            resetContactAction();
        }
    });
}

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (finePointer) {
    customCursor = document.createElement('span');
    customCursor.className = 'custom-cursor';
    customCursor.setAttribute('aria-hidden', 'true');
    if (typeof customCursor.showPopover === 'function') customCursor.setAttribute('popover', 'manual');
    document.body.append(customCursor);
    customCursor.showPopover?.();

    const glow = document.querySelector('.cursor-glow');
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let glowX = pointerX;
    let glowY = pointerY;
    let frameRequested = false;

    const updatePointer = () => {
        customCursor.style.transform = `translate3d(${pointerX}px,${pointerY}px,0) translate(-50%,-50%)`;
        glowX += (pointerX - glowX) * 0.12;
        glowY += (pointerY - glowY) * 0.12;
        if (glow) glow.style.transform = `translate3d(${glowX}px,${glowY}px,0) translate(-50%,-50%)`;
        frameRequested = false;
        if (Math.abs(pointerX - glowX) > 0.5 || Math.abs(pointerY - glowY) > 0.5) {
            frameRequested = true;
            requestAnimationFrame(updatePointer);
        }
    };

    document.addEventListener('pointermove', event => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        document.body.classList.add('pointer-active');
        if (!frameRequested) {
            frameRequested = true;
            requestAnimationFrame(updatePointer);
        }
    }, { passive: true });

    document.addEventListener('pointerleave', () => document.body.classList.remove('pointer-active'));
    document.addEventListener('pointerover', event => {
        customCursor.classList.toggle('is-hovering', Boolean(event.target.closest('a,button,[data-spotlight]')));
    });

    document.querySelectorAll('[data-spotlight]').forEach(surface => {
        surface.addEventListener('pointermove', event => {
            const rect = surface.getBoundingClientRect();
            surface.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
            surface.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
        }, { passive: true });
    });
}
