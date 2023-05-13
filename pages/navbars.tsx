/*
TODO: work on the navbar, authentication, user account types, permissions, role dependent views and such

- navbar: Could use bootstrap or something similar?
- authentication: firebase
- user account types: firebase ?
- permissions: firebase ?
- role dependent views: rely on conditional components
*/
import styles from '@/styles/Navbar.module.css'
import { auth } from "../firebase/config"
import { useEffect, useState } from 'react';
import { getEmployeeSet } from "../utils/database";
import Link from 'next/link';

/* TODO: If username in employees, add a tab called employee-hub */
export default function Navbar() {
    const [componentList, setComponentList] = useState<NavbarLink[]>([]);
    const [reload, setReload] = useState<boolean>(false);
    async function checkEmployee() {
        let employees = await getEmployeeSet();
        if(employees.has(auth.currentUser?.email)) {
            let link = new NavbarLink("Employee Hub", "/employee");
            componentList.push(link);
            setComponentList(componentList);
            setReload(true);
        }
    } 
    useEffect(() => {
            // this is a little hacky, but it works
        var list = NavbarLinks.filter(p => p.name == "Sign In");
        setComponentList(list);
        auth.onAuthStateChanged(() => {
            if(auth.currentUser) {
                var list = NavbarLinks.filter(p => p.name != "Sign In");
                setComponentList(list);
                if(!reload) checkEmployee();
            }
        });
    }, [reload]);
    
    return(
    <div>
        <NavbarSpacer></NavbarSpacer>
        <div className={styles.navbar}>
            <ul className={styles.navbarAlign}>
                <NavbarItem key="home" name="MacroCenter" path="/"/>
                <div className={styles.navbarItemNotHome}>
                    {componentList &&
                     componentList.map(p => <NavbarItem name={p.name} path={p.path} key={p.name}/>)}
                </div>
                <Link href="/viewCartPage">
              <button className={styles.viewCartButton}>
                  View Cart
              </button>
            </Link>
            </ul>
        </div>
    </div>
    )
}

export function NavbarItem(navLink: NavbarLink, key: string) {
    return(
        <li key={key} className={styles.navbarItem}><a href={navLink.path}>{navLink.name}</a></li>
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
    new NavbarLink("Sign In", "/signin"),
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