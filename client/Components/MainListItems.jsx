import React, { useState, useRef } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import MapIcon from '@material-ui/icons/Map';

export const MainListItems = (props) => {

  return (
    <div>
      <ListItem button onClick={() => history.push('/dashboard/Biopage')}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Bio" />
      </ListItem>
      <ListItem button onClick={() => history.push('/dashboard/MapPage')}>
        <ListItemIcon>
          <MapIcon />
        </ListItemIcon>
        <ListItemText primary="Journey Map" />
      </ListItem>
    </div>
  );
};
