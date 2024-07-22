"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Container, Navbar, Nav, NavDropdown} from "react-bootstrap";

const NavBar = () => {

    const router = useRouter;
    const pathname = usePathname();
    return (
        <Navbar bg="primary" variant="dark" sticky="top" expand="sm" collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} href="/">
                    NextJS 13.4 Image Gallery
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link href="/static" active={pathname === "/static"}>Static</Nav.Link>
                        <Nav.Link href="/dynamic" active={pathname === "/dynamic"}>Dynamic</Nav.Link>
                        <Nav.Link href="/isr" active={pathname === "/isr"}>ISR</Nav.Link>
                        <NavDropdown title="Topics" id="topics-dropdown">
                            <NavDropdown.Item as={Link} href="/topics/health">Health
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} href="/topics/fitness">Fitness
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} href="/topics/coding">Coding
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;