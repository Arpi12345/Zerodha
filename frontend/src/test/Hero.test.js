jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));
import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'; // ✅ valid for v5.17.0
import Hero from "../landing_page/home/Hero";

// src/test/Hero.test.js

// 1️⃣ Mock react-router-dom BEFORE importing Hero



describe("Hero component", () => {
  test("renders hero image", () => {
    render(<Hero />);
    const heroImage = screen.getByAltText("Hero Image");
    expect(heroImage).toBeInTheDocument();
    expect(heroImage.src).toContain("homeHero.png");
  });

test("renders signup button", () => {
    render(< Hero />);
const signupButton = screen.getByRole("button", { name: /sign up now/i });

    expect(signupButton).toBeInTheDocument();
    expect(signupButton).toHaveClass("btn btn-primary");
  });






});