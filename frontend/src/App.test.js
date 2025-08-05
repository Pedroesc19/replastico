import { render } from "@testing-library/react";
import Button from "./components/ui/Button";

test("renders button", () => {
  render(<Button>Click</Button>);
});
