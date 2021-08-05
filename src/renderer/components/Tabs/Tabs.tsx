import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
// material-ui components
import { makeStyles, Tabs, Tab } from '@material-ui/core';
// core components
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import CardHeader from '../Card/CardHeader';
import styles from '../../assets/jss/components/customTabs.styles';

const useStyles = makeStyles(styles);

interface CustomTabsProps {
  headerColor?:
    | 'warning'
    | 'primary'
    | 'danger'
    | 'success'
    | 'info'
    | 'rose'
    | 'gray';
  title?: string;
  tabs: { tabName: string; tabIcon: any; tabContent: React.ReactNode }[];
  plainTabs?: boolean;
}

export default function CustomTabs(props: CustomTabsProps) {
  const [ value, setValue ] = React.useState(0);
  const handleChange = (_: unknown, val: number) => {
    setValue(val);
  };
  const classes = useStyles({});
  const {
    headerColor = 'primary',
    plainTabs,
    tabs = [],
    title = '',
  } = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
  });
  return (
    <Card plain={plainTabs}>
      <CardHeader color={headerColor} plain={plainTabs}>
        {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone,
            scrollButtons: classes.displayNone,
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((prop) => {
            let icon = {};
            if ( prop.tabIcon ) {
              icon = {
                icon: <prop.tabIcon/>,
              };
            }
            return (
              <Tab
                classes={{
                  root: classes.tabRootButton,
                  selected: classes.tabSelected,
                  wrapper: classes.tabWrapper,
                }}
                key={`${prop.tabName}-header`}
                label={prop.tabName}
                {...icon}
              />
            );
          })}
        </Tabs>
      </CardHeader>
      <CardBody>
        {tabs.map((prop, key) => {
          if ( key === value ) {
            return <div key={`${prop.tabName}-body`}>{prop.tabContent}</div>;
          }
          return null;
        })}
      </CardBody>
    </Card>
  );
}
