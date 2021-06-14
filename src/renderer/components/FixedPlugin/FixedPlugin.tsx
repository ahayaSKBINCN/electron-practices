/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
// nodejs library that concatenates classes
import classnames from "classnames";
import Settings from '@material-ui/icons/Settings'

import { imagine1, imagine2, imagine3, imagine4 } from "../../assets/images";


import Button from "../CustomButtons/Button";

interface FixedPluginProperties {
  [key: string]: any;

  bgImage: string | undefined;
  handleFixedClick: () => void;
  rtlActive?: boolean;
  bgColor: "purple" | "blue" | "green" | "orange" | "red";
  handleColorClick: Function;
  handleImageClick: Function;
}

FixedPlugin.defaultProps = {
  rtlActive: false
}

export default function FixedPlugin(props: FixedPluginProperties) {
  // const [ classes, setClasses ] = React.useState<"dropdown show" | "dropdown">("dropdown show");
  // const [ bg_checked, setBg_checked ] = React.useState(true);
  const [ bgImage, setBgImage ] = React.useState(props.bgImage);
  const handleClick = () => {
    props.handleFixedClick();
  };
  return (
    <div
      className={classnames("fixed-plugin", {
        "rtl-fixed-plugin": props.rtlActive
      })}
    >
      <div id="fixedPluginClasses" className={props.fixedClasses}>
        <div onClick={handleClick}>
          <Settings/>
        </div>
        <ul className="dropdown-menu">
          <li className="header-title">SIDEBAR FILTERS</li>
          <li className="adjustments-line">
            <a className="switch-trigger">
              <div>
                <span
                  className={
                    props.bgColor === "purple"
                      ? "badge filter badge-purple active"
                      : "badge filter badge-purple"
                  }
                  data-color="purple"
                  onClick={() => {
                    props.handleColorClick("purple");
                  }}
                />
                <span
                  className={
                    props.bgColor === "blue"
                      ? "badge filter badge-blue active"
                      : "badge filter badge-blue"
                  }
                  data-color="blue"
                  onClick={() => {
                    props.handleColorClick("blue");
                  }}
                />
                <span
                  className={
                    props.bgColor === "green"
                      ? "badge filter badge-green active"
                      : "badge filter badge-green"
                  }
                  data-color="green"
                  onClick={() => {
                    props.handleColorClick("green");
                  }}
                />
                <span
                  className={
                    props.bgColor === "red"
                      ? "badge filter badge-red active"
                      : "badge filter badge-red"
                  }
                  data-color="red"
                  onClick={() => {
                    props.handleColorClick("red");
                  }}
                />
                <span
                  className={
                    props.bgColor === "orange"
                      ? "badge filter badge-orange active"
                      : "badge filter badge-orange"
                  }
                  data-color="orange"
                  onClick={() => {
                    props.handleColorClick("orange");
                  }}
                />
              </div>
            </a>
          </li>
          <li className="header-title">Images</li>
          <li className={bgImage === imagine1 ? "active" : ""}>
            <a
              className="img-holder switch-trigger"
              onClick={() => {
                setBgImage(imagine1);
                props.handleImageClick(imagine1);
              }}
            >
              <img src={imagine1} alt="..."/>
            </a>
          </li>
          <li className={bgImage === imagine2 ? "active" : ""}>
            <a
              className="img-holder switch-trigger"
              onClick={() => {
                setBgImage(imagine2);
                props.handleImageClick(imagine2);
              }}
            >
              <img src={imagine2} alt="..."/>
            </a>
          </li>
          <li className={bgImage === imagine3 ? "active" : ""}>
            <a
              className="img-holder switch-trigger"
              onClick={() => {
                setBgImage(imagine3);
                props.handleImageClick(imagine3);
              }}
            >
              <img src={imagine3} alt="..."/>
            </a>
          </li>
          <li className={bgImage === imagine4 ? "active" : ""}>
            <a
              className="img-holder switch-trigger"
              onClick={() => {
                setBgImage(imagine4);
                props.handleImageClick(imagine4);
              }}
            >
              <img src={imagine4} alt="..."/>
            </a>
          </li>

          <li className="button-container">
            <div className="button-container">
              <Button
                color="success"
                href="https://www.creative-tim.com/product/material-dashboard-react?ref=mdr-fixed-plugin"
                target="_blank"
                fullWidth
              >
                Download free!
              </Button>
            </div>
          </li>
          <li className="button-container">
            <div className="button-container">
              <Button
                color="warning"
                href="https://www.creative-tim.com/product/material-dashboard-pro-react?ref=mdr-fixed-plugin"
                target="_blank"
                fullWidth
              >
                Get PRO version
              </Button>
            </div>
          </li>
          <li className="button-container">
            <Button
              color="info"
              fullWidth
              href="https://demos.creative-tim.com/material-dashboard-react/#/documentation/tutorial?ref=mdr-fixed-plugin"
              target="_blank"
            >
              Documentation
            </Button>
          </li>
          <li className="adjustments-line"/>
        </ul>
      </div>
    </div>
  );
}



