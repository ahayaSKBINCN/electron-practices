import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { act, isElement } from "react-dom/test-utils";
import App from "../renderer/App"

let container: HTMLDivElement | null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
})

afterAll(() => {
  if(container){
    ReactDOM.createPortal(Fragment,container,"ahaya");
    ReactDOM.unmountComponentAtNode(container);
  }
  document.body.removeChild(container as HTMLDivElement);
  container = null;
})


it("can render an application", () => {
  act(() => {
    ReactDOM.render(<App/>, container);
  });

  const pathname = location.pathname;
  // todo assets if the pathname === dashboard.path
  expect(location.pathname).toBe("/admin/dashboard/dashboard");

  const button = container?.querySelector("button") as HTMLButtonElement;
  expect(button).toBeDefined();

  act(() => {
    if ( isElement(button) )
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  })
})






