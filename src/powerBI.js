import React, { useEffect } from 'react';
import * as pbi from 'powerbi-client';

const PowerBIDashboard = () => {
  useEffect(() => {
    const embedDashboard = () => {
      const embedContainer = document.getElementById('embed-container');

      const config = {
        type: 'dashboard',
        id: 'dc125bbf-23a3-492d-983b-43f635d2d423?experience=power-bi', // Replace with your actual dashboard ID
        embedUrl: 'https://app.powerbi.com/dashboardEmbed?dashboardId=YOUR_DASHBOARD_ID', // Replace with your actual embed URL
        accessToken: 'YOUR_ACCESS_TOKEN', // 
        tokenType: pbi.models.TokenType.Embed,
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: false
        }
      };

      const dashboard = pbi.embed(embedContainer, config);
    };

    embedDashboard();
  }, []);

  return (
    <div>
      <div id="embed-container" style={{ height: '600px' }}></div>
    </div>
  );
};

export default PowerBIDashboard;
