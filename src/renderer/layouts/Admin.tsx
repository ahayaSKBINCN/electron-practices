import routes from '../route';
import { makeStyles } from '@material-ui/core';
import React, { createRef } from 'react';
import styles from '../assets/jss/layouts/admin.styles';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
// import PerfectScrollbar from 'perfect-scrollbar';
import { bgImg, logo } from '../assets/images';

import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/SiderBar/SiderBar';
import Footer from '../components/Footer/Footer';
import FixedPlugin from '../components/FixedPlugin/FixedPlugin';
import ErrorBoundary from "../components/ErrorBoundary";
// let ps: any;

const AdminRoutes = routes.filter((route) => route.layout === '/admin');
const switchRoutes = (
  <Switch>
    {AdminRoutes.map((props) => {
      const { layout, path, component } = props;
      return (
        <Route path={layout + path} component={component} key={layout + path}/>
      );
    })}
    <Redirect from="/admin" to="/admin/InfinitelyScrollBar"/>
  </Switch>
);
const useStyle = makeStyles(styles);
export default function AdminLayout(props: any) {
  const location = useLocation();
  const { theme } = props;
  const clazz = useStyle(theme);
  const mainPanel = createRef<HTMLDivElement>();
  const [ img, $img ] = React.useState(bgImg);
  const [ color, $color ] = React.useState('blue');
  const [ fixedClasses, $fixedClasses ] = React.useState('dropdown');
  const [ mobileOpen, $mobileOpen ] = React.useState(false);
  const handleImageClick = function handleImageClick(image: any) {
    $img(image);
  };
  const handleColorClick = function handleColorClick(target: any) {
    $color(target);
  };
  const handleFixedClick = function handleFixedClick() {
    if ( fixedClasses === 'dropdown' ) {
      $fixedClasses('dropdown show');
    } else {
      $fixedClasses('dropdown');
    }
  };
  const handleDrawerToggle = function handleDrawerToggle() {
    $mobileOpen( !mobileOpen);
  };
  const getRoute = function getRoute() {
    return window.location.pathname !== '/admin/maps';
  };
  // const resizeFunction = function () {
  //   if (window.innerWidth >= 960) {
  //     $mobileOpen(false);
  //   }
  // };
  // useEffect(
  //   function () {
  //     if (navigator.platform.indexOf('Win') > -1) {
  //       ps = new PerfectScrollbar(mainPanel.current as Element, {
  //         suppressScrollX: true,
  //         suppressScrollY: false,
  //       });
  //
  //       document.body.style.overflow = 'hidden';
  //     }
  //     window.addEventListener('resize', resizeFunction);
  //     // Specify how to clean up after this effect:
  //     return function cleanup() {
  //       if (navigator.platform.indexOf('Win') > -1) {
  //         ps.destroy();
  //       }
  //       window.removeEventListener('resize', resizeFunction);
  //     };
  //   },
  //   [mainPanel]
  // );
  // if (
  //   location.pathname !== '/common/login' &&
  //   !sessionStorage.getItem('token')
  // ) {
  //   return <Redirect to="/common/login" />;
  // }

  return (
    <div className={clazz.wrapper}>
      <Sidebar
        routes={AdminRoutes}
        logoText="Creative Tim"
        logo={logo}
        image={img}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...props}
      />
      <div className={clazz.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...props}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={clazz.content}>
            <div className={clazz.container}>
              <ErrorBoundary>
                {switchRoutes}
              </ErrorBoundary>
            </div>
          </div>
        ) : (
          <div className={clazz.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer/> : null}
        <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color as any}
          bgImage={img}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        />
      </div>
    </div>
  );
}
