/*
TODO: work on the navbar, authentication, user account types, permissions, role dependent views and such

- navbar: Could use bootstrap or something similar?
- authentication: firebase
- user account types: firebase ?
- permissions: firebase ?
- role dependent views: rely on conditional components
*/
import styles from '@/styles/Navbar.module.css'

export default function Navbar() {
    let authState = 0; // this is temporary!
    if(authState == 0) { // not authenticated
        // this is a little hacky, but it works
        var componentList = NavbarLinks.filter(p => p.name == "Log In");
    } else { // authenticated as normal user
        var componentList = NavbarLinks.filter(p => p.name != "Log In");
    }
    return(
    <div>
        <NavbarSpacer></NavbarSpacer>
        <div className={styles.navbar}>
            <ul className={styles.navbarAlign}>
                <NavbarItem name="MacroCenter" path="/"/>
                <div className={styles.navbarItemNotHome}>
                    {componentList &&
                     componentList.map(p => <NavbarItem name={p.name} path={p.path}/>)}
                </div>
            </ul>
        </div>
    </div>
    )
}

export function NavbarItem(navLink: NavbarLink) {
    return(
        <div className={styles.navbarItem}><a href={navLink.path}>{navLink.name}</a></div>
    )
}

class NavbarLink {
    public name: string;
    public path: string;

    public constructor(name: string, path: string) {
        this.name = name;
        this.path = path;
    }
}

export const NavbarLinks = [
    new NavbarLink("Cart", "/cart"),
    new NavbarLink("Log In", "/login"),
    new NavbarLink("Profile", "/profile"),
]

export const SubNavLinks = [
    new NavbarLink("Build", "/build"),
    new NavbarLink("Parts", "/parts"),
    new NavbarLink("Completed Builds", "/completed-builds"),
    new NavbarLink("Guide", "/guide"),
]

export function NavbarSpacer() {
    return(
    <div className={styles.navbarSpacer}>
    </div>)
}