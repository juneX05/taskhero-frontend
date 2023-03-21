import * as helpers from "./assets/js/utils/helpers.js";

const SIDEBAR_CLASS = "sidebar";
const SIDEBAR_OPEN_CLASS = "is-sidebar-open";
const SIDEBAR_TOGGLE_BTN_CLASS = "sidebar-toggle";
const SIDEBAR_CLOSE_BTN_CLASS = "sidebar-close";
const SIDEBAR_NAV_WRAPPER = "nav-wrapper";
const SIDEBAR_NAV_LINK_CLASS = "nav-link";
const SIDEBAR_NAV_PARENT_CLASS = "nav-parent";

const BODY = document.body;

const SIDEBAR = document.querySelector(`.${SIDEBAR_CLASS}`);

// Declaring the toggle buttons for sidebar
const toggleBtns = document.querySelectorAll(
    `.${SIDEBAR_TOGGLE_BTN_CLASS}`
);

export const uiCloseSidebar = () => {
    BODY.classList.remove(SIDEBAR_OPEN_CLASS);
}

const uiOpenSidebar = () => {
    if(!BODY.classList.contains(SIDEBAR_OPEN_CLASS))
        BODY.classList.add(SIDEBAR_OPEN_CLASS);
}

const uiToggleSidebar = () => {
    BODY.classList.toggle(SIDEBAR_OPEN_CLASS);
}

export const uiInitSidebar = () => {

    // Closing the sidebar at the breakponts smaller than "XL"
    if (!$breakpoint.xlAndUp) uiCloseSidebar();

    // checking the existing of the left sidebar
    // if (!SIDEBAR) return;

    console.log(toggleBtns);
    // Declaring the close buttons for sidebar
    const closeBtns = document.querySelectorAll(`.${SIDEBAR_CLOSE_BTN_CLASS}`);

    // Closing the sidebar when breakpoint changed
    window.addEventListener("change:breakpoint", () => {
        // if (BODY.classList.contains(SIDEBAR_OPEN_CLASS))
        //   uiCloseSidebar();
        if (!$breakpoint.xlAndUp) {
            console.log('closing')
            uiCloseSidebar()
        } else {
            console.log('opening')
            uiOpenSidebar()
        }
    });

    toggleBtns.forEach((node) =>
        node.addEventListener("click", () => uiToggleSidebar())
    );

    closeBtns.forEach((node) =>
        node.addEventListener("click", () => uiCloseSidebar())
    );
}

export const uiInitSidebarNav = () => {
    // Select the navigation links
    const navLinks = document.querySelectorAll(`.${SIDEBAR_NAV_LINK_CLASS}`);
    const navParents = document.querySelectorAll(
        `.${SIDEBAR_NAV_PARENT_CLASS}`
    );

    // checking the existing of the navigation links
    if (!(navLinks.length > 0)) return;

    // Declaring default opened parent active navigation link
    let openOnInit = null;

    // Add index for parent navigation links
    if (navParents) {
        navParents.forEach((node, i) => {
            node.dataset.navParentIndex = i;
        });
    }

    navLinks.forEach((node) => {
        // checking if the HTML element is link
        if (!node.href) return;

        // checking if navigation link have parent
        const parent = node.parentNode.closest(`.${SIDEBAR_NAV_PARENT_CLASS}`);

        // get active and default classes for navigation links from "data-active-class" and "data-default-class"
        const activeClass = node.dataset.activeClass.split(" ");
        const defaultClass = node.dataset.defaultClass.split(" ");

        // cleaning the "href" value of the navigation link
        const href = node.href.split("?")[0].split("#")[0];

        // comparing current link with location
        const isActive = href === helpers.getCurrentLocation();

        if (isActive) {
            node.classList.add(...activeClass);
            setTimeout(() => node.scrollIntoView({ block: "center" }));
            if (parent) {
                openOnInit = parseInt(parent.dataset.navParentIndex);
            }
        } else {
            node.classList.add(...defaultClass);
        }

        node.addEventListener("click", () => {
            if (!$breakpoint.xlAndUp) {
                return uiCloseSidebar()
            }
        })
    });

    new Accordion(`.${SIDEBAR_NAV_WRAPPER}`, {
        onlyChildNodes: false,
        duration: 200,
        openOnInit: [openOnInit],
    });
}