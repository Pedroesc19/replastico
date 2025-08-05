import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock(
  "react-router-dom",
  () => ({
    Link: ({ children, ...props }) => <a {...props}>{children}</a>,
    NavLink: ({ children, end, ...props }) => <a {...props}>{children}</a>,
    useNavigate: () => jest.fn(),
  }),
  { virtual: true }
);
import GuestNavbar from "../GuestNavbar";
import UserNavbar from "../UserNavbar";
import AdminNavbar from "../AdminNavbar";
import { CartContext } from "../../context/CartContext";

describe("Navbar", () => {
  const renderWithProviders = (ui, { cartItems = [] } = {}) => {
    return render(
      <CartContext.Provider value={{ cartItems }}>{ui}</CartContext.Provider>
    );
  };

  test("toggles menu visibility", () => {
    renderWithProviders(<GuestNavbar />);
    const toggle = screen.getByLabelText(/toggle navigation/i);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  test("renders role-specific links", () => {
    renderWithProviders(<GuestNavbar />);
    expect(screen.getByText("Login")).toBeInTheDocument();
    renderWithProviders(<AdminNavbar onLogout={() => {}} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  test("updates cart badge", () => {
    renderWithProviders(<UserNavbar onLogout={() => {}} />, {
      cartItems: [{}, {}],
    });
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("closes menu after link click", () => {
    renderWithProviders(<GuestNavbar />);
    const toggle = screen.getByLabelText(/toggle navigation/i);
    fireEvent.click(toggle);
    const link = screen.getByText("Nosotros");
    fireEvent.click(link);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
